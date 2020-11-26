const Jobs = require("../models/jobs");

module.exports.jobsService = function (msg, callback) {
  console.log("In jobs service path", msg.path);
  switch (msg.path) {
    case "insertJobDetails":
      insertJobDetails(msg, callback);
      break;
    case "getAllJobs":
      getAllCompanyJobs(msg, callback);
      break;
    case "searchJob":
      searchJobs(msg, callback);
  }
};

async function insertJobDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log("In post job details topic service. Msg: ", msg);
  console.log(msg.body);
  await Jobs.create(msg.body)
    .then((data) => {
      response.status = 200;
      response.message = "Inserted Successfully";
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
  console.log("In get job details topic. Msg: ", msg);
  console.log(msg.body);
  await Jobs.find({ companyName: { $regex: msg.body, $options: "i" } })
    .then((data) => {
      response.status = 200;
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function searchJobs(msg, callback) {
  let err = {};
  let response = {};
  console.log("In get job search details topic. Msg: ", msg);
  console.log(msg.body);
  await Jobs.find({ title: { $regex: msg.body.job_title, $options: "i" } })
    .then((data) => {
      response.status = 200;
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}
