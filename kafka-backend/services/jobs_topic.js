const Jobs = require('../models/jobs');
const paginate = require('jw-paginate');

module.exports.jobsService = function (msg, callback) {
  console.log('In jobs service path', msg.path);
  switch (msg.path) {
    case 'insertJobDetails':
      insertJobDetails(msg, callback);
      break;
    case 'getAllJobs':
      getAllCompanyJobs(msg, callback);
      break;
    case 'searchJob':
      searchJobTitle(msg, callback);
    case 'getExploreJobs':
      getExploreJobs(msg, callback);
  }
};

async function insertJobDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In post job details topic service. Msg: ', msg);
  console.log(msg.body);
  await Jobs.create(msg.body)
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

async function getAllCompanyJobs(msg, callback) {
  let err = {};
  let response = {};
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body);
  await Jobs.find({ companyName: { $regex: msg.body, $options: 'i' } })
    .then((data) => {
      response.status = 200;
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function searchJobTitle(msg, callback) {
  let err = {};
  let response = {};

  console.log('In get job search details topic. Msg: ', msg);
  console.log(msg.page);
  const page = parseInt(msg.page) || 1;

  await Jobs.find({ title: { $regex: msg.body.job_title, $options: 'i' } })
    .then((items) => {
      console.log('length:', items.length);
      response.status = 200;
      // response.data = data;
      const pager = paginate(items.length, page, 2);
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      response.data = { pager: pager, items: pageOfItems };
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getExploreJobs(msg, callback) {
  let err = {};
  let response = {};

  console.log('In get job topic. Msg: ', msg);
  console.log(msg.state);
  await Jobs.find({state: msg.state}, (error, result) => {
    if(error){
      err.message = error
      err.status = 500
      return callback(null, error);
    } else if (result){
      response.status = 200
      response.message = 'EXPLORE_JOBS'
      response.data = (result)
      return callback(null, response)
    }
  })
}