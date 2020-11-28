const Interview = require('../models/interview');

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
  let err = {};
  let response = {};
  console.log('In search by interview for a company: ');
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body);
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
      for (each of results) {
        msg.body[each._id].interviews = each.interviews;
        msg.body[each._id].rating = each.rating;
      }
    }
  );

  callback(null, msg.body);
  // .find({ sql_company_id: { $in: ids } }, function (err, result) {
  //   console.log("reviews list:", result);
  //   callback(null, result);
  // });
}
