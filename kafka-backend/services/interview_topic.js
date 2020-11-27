const Interview = require('../models/interview');

module.exports.interviewService = function (msg, callback) {
  console.log('In jobs service path', msg.path);
  switch (msg.path) {
    case 'add_interview':
      addInterview(msg, callback);
      break;
    case 'get_all_interviews':
      getAllInterviews(msg, callback);
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
