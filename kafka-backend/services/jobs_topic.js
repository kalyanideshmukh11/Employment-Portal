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
    case 'getJobApplicants':
      getJobApplicantsDetails(msg, callback);
      break;
    case 'updateApplicantStatus':
      updateApplicantStatus(msg, callback);
      break;
    case 'searchJob':
      searchJobTitle(msg, callback);
    case 'getJobsStatistics':
      getJobsStatistics(msg, callback);
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

async function getJobApplicantsDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body);
  await Jobs.find({ _id: msg.body }, { _id: 0, applied_students: 1 })
    .then((data) => {
      response.status = 200;
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateApplicantStatus(msg, callback) {
  let err = {};
  let response = {};
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body.status);
  await Jobs.findOneAndUpdate(
    { 'applied_students._id': msg.body._id },
    {
      $set: {
        'applied_students.$.application_status': msg.body.status,
      },
    },
    { safe: true, new: true, useFindAndModify: false },
  )
    .then((data) => {
      response.status = 200;
      response.message = 'Updated';
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

async function getJobsStatistics(msg, callback) {
  let err = {};
  let response = {};
  let start = new Date();
  start.setDate(start.getDate() - 365);
  start = start.toLocaleDateString();
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body);
  console.log(start);
  let jobsCount = await Jobs.find({
    companyName: 'Facebook',
    posted_date: { $lt: '11/29/2019' },
  }).count();
  console.log(jobsCount);

  let selectedCount = await Jobs.find({
    companyName: 'Facebook',
    posted_date: { $lt: '11/29/2019' },
    'applied_students.application_status': 'Hired',
  }).count();
  console.log('Selected', selectedCount);

  let rejectedCount = await Jobs.find({
    companyName: 'Facebook',
    // posted_date: { $lt: '11/29/2019' },
    'applied_students.application_status': 'Rejected',
  }).count();

  console.log('Rejected', rejectedCount);
  // .then((data) => {
  //   console.log(data);
  //   response.status = 200;
  //   response.data = data;
  //   return callback(null, response);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
}
