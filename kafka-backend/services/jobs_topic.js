const Jobs = require('../models/jobs');

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
