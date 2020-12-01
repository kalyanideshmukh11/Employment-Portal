const Interview = require('../models/interview');
const paginate = require('jw-paginate');

module.exports.interviewService = function (msg, callback) {
  console.log('In jobs service path', msg.path);
  switch (msg.path) {
    case 'add_interview':
      addInterview(msg, callback);
      break;
    case 'get_all_interviews':
      getAllInterviews(msg, callback);
    case 'searchByInterview':
      searchByCompanyInterview(msg, callback);
      break;
    case 'getStudentReviews':
      getStudentReviews(msg, callback);
      break;
  }
};

async function addInterview(msg, callback) {
  let err = {};
  let response = {};
  console.log('In add Interview topic service. Msg: ', msg);
  console.log(msg.body);
  await Interview.create(msg.body)
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

async function getAllInterviews(msg, callback) {
  let err = {};
  let response = {};
  console.log('get All Interviews: ', msg);
  try {
    let interview = await Interview.findById(msg.body.sql_company_id);
    if (interview) {
      response.status = 200;
      response.data = JSON.stringify(interview);
      return callback(null, response);
    } else {
      response.status = 200;
      response.data = 'NO_RECORD';
      return callback(null, response);
    }
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = 'Error in Data';
    return callback(err, null);
  }
}

async function searchByCompanyInterview(msg, callback) {
  console.log('In search by interview for a company: ');
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body);
  var final_result = {};
  const page = parseInt(msg.page) || 1;
  await Interview.aggregate(
    [
      {
        $match: { sql_company_id: { $in: ids } },
      },
      {
        $group: {
          _id: '$sql_company_id',
          interviews: { $sum: 1 },
          rating: { $avg: '$difficulty' },
        },
      },
    ],
    function (err, results) {
      console.log('Results:', results);
      for (var each of results) {
        msg.body[each._id].interviews = each.interviews;
        msg.body[each._id].rating = each.rating;
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

async function getStudentReviews(msg, callback) {
  let err = {}, response = {};
  console.log('get Student Interviews: ', msg);
  await Interview.find({sql_student_id: msg.userId}, (result, error) => {
    if(error){
      err.message = error
      err.status = 500
      return callback(null, error);
    } else if(result){
      response.status = 200
      response.message = 'STUDENT_INTERVIEWS'
      response.data = JSON.stringify(result)
      return callback(null, response)
    }
  })


}
