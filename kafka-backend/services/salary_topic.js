'use strict';

const Salary = require('../models/salary');

const redisClient = require('../config/redisConfig');
const paginate = require('jw-paginate');

exports.salaryService = function (msg, callback) {
  console.log('In salaryService - path:', msg.path);
  switch (msg.path) {
    case 'insertSalaryDetails':
      insertSalaryDetails(msg, callback);
      break;
    case 'getSalaryDetails':
      getSalaryDetails(msg, callback);
      break;
    case 'searchBySalary':
      searchBySalary(msg, callback);
      break;
    case 'getStudentSalaries':
      getStudentSalaries(msg, callback);
  }
};

async function insertSalaryDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In post salary  topic service. Msg: ', msg);
  console.log(msg.body);
  await Salary.create(msg.body)
    .then((data) => {
      response.status = 200;
      response.message = 'Inserted Successfully';
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getSalaryDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In getSalaryDetails service. Msg: ', msg);
  console.log(msg.body);

  redisClient.get('allSalary', function (err, data) {
    if (err) {
      console.log('error');
      response.status = 400;
    }
    // else if (data) {
    //     console.log("fetching from redis cache");
    //     console.log(data);
    //     response.data = (JSON.parse(data));
    //     console.log(response);
    //     return callback( null, response)
    // }
    else {
      console.log('fetching from mongoDb');
      Salary.find({ company: msg.body }, function (err, doc) {
        if (err || !doc) {
          response.status = 400;
        } else {
          redisClient.setex('allSalary', 36000, JSON.stringify(doc));
          response.status = 200;
          response.data = doc;
          //console.log(response)
          return callback(null, response);
        }
      });
    }
  });
}

async function searchBySalary(msg, callback) {
  console.log('In search by salary for a company: ');
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body);
  var final_result = {};
  const page = parseInt(msg.page) || 1;
  await Salary.aggregate(
    [
      {
        $match: { sql_company_id: { $in: ids } },
      },
      {
        $group: {
          _id: '$sql_company_id',
          salaries: { $sum: 1 },
        },
      },
    ],
    function (err, results) {
      console.log('Results:', results);
      for (var each of results) {
        msg.body[each._id].salaries = each.salaries;
      }
      console.log('msg.body:', msg.body);
      const pager = paginate(ids.length, page, 1);
      const pageOfItems = Object.keys(msg.body)
        .slice(pager.startIndex, pager.endIndex + 1)
        .map((key) => msg.body[key]);
      final_result = { pager: pager, items: pageOfItems };
    }
  );

  callback(null, final_result);
  // .find({ sql_company_id: { $in: ids } }, function (err, result) {
  //   console.log("reviews list:", result);
  //   callback(null, result);
  // });
}

async function getStudentSalaries(msg, callback) {
  let err = {}, response = {};
  console.log('get Student Interviews: ', msg);
  await Salary.find({sql_student_id: msg.userId}, (result, error) => {
    if(error){
      err.message = error
      err.status = 500
      return callback(null, error);
    } else if(result){
      response.status = 200
      response.message = 'ABOUT_ME'
      response.data = JSON.stringify(result)
      return callback(null, response)
    }
  })


}