const Jobs = require('../models/jobs');
const paginate = require('jw-paginate');
/*const {
  getAllJobs,
} = require('../../Frontend/src/store/actions/companyJobsAction');*/

module.exports.jobsService = function (msg, callback) {
  console.log('In jobs service path', msg.path);
  switch (msg.path) {
    case 'insertJobDetails':
      insertJobDetails(msg, callback);
      break;
    case 'getAllCompanyJobs':
      getAllCompanyJobs(msg, callback);
      break;
    case 'getJobApplicants':
      getJobApplicantsDetails(msg, callback);
      break;
    case 'updateApplicantStatus':
      updateApplicantStatus(msg, callback);
      break;

    case 'getJobsStatistics':
      getJobsStatistics(msg, callback);
      break;

    case 'getAllJobs':
      getAllCompanyJobs(msg, callback);
      break;

    case 'searchJob':
      searchJobTitle(msg, callback);
      break;

    case 'getApplicantId':
      getApplicantId(msg, callback);
      break;

    case 'getExploreJobs':
      getExploreJobs(msg, callback);
      break;

    case 'apply_job':
      applyToJob(msg, callback);
      break;

    case 'getJobs':
      getJobs(msg, callback);
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
async function getJobsStatistics(msg, callback) {
  let err = {};
  let response = {};
  let count = {};
  let start = new Date();
  start.setDate(start.getDate() - 365);
  start = start.toLocaleDateString();
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body);
  console.log(start);

  // await Jobs.find({
  //   _id: msg.body,
  //   // posted_date: {$elemMatch: { $lt: 11/29/2019 }},
  // }).count()
  // .then((data) =>
  //   {
  //     count.jobsCount = data
  //   })
  // console.log(response);

  await Jobs.aggregate([
    { $match: { title: 'Data Scientist, Analytics' } },
    { $unwind: '$applied_students' },
    { $unwind: { path: '$applied_students.application_status' } },

    {
      $group: {
        _id: '$applied_students.application_status',
        Frequency: { $sum: 1 },
      },
    },
  ]).then((data) => {
    console.log(data);
    count.selectedCount = data;
  });

  await Jobs.aggregate([
    { $match: { title: 'Data Scientist, Analytics' } },
    { $project: { _id: 0, count: { $size: '$applied_students' } } },
  ])
    .then((data) => {
      count.applicantCount = data[0].applicants;
    })
    .then(() => {
      console.log(count);
      response.status = 200;
      response.data = count;
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

async function getApplicantId(msg, callback) {
  let err = {};
  let response = {};
  console.log('In get applicant ID for admin details topic. Msg: ', msg);
  console.log(msg.body);
  await Jobs.find(
    { title: 'Data Scientist, Analytics' },
    { 'applied_students.sql_student_id': 1, _id: 0 },
  )
    .then((data) => {
      let applicantId = [];
      for (const key of Object.keys(data[0]._doc)) {
        applicantId = data[0]._doc[key].map((val) => val.sql_student_id);
      }
      console.log(applicantId);
      response.status = 200;
      response.data = applicantId;
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
  await Jobs.find({ state: msg.state }, (error, result) => {
    if (error) {
      err.message = error;
      err.status = 500;
      return callback(null, error);
    } else if (result) {
      response.status = 200;
      response.message = 'EXPLORE_JOBS';
      response.data = result;
      return callback(null, response);
    }
  });
}
async function applyToJob(msg, callback) {
  let err = {};
  let response = {};
  console.log('In post APPLY TO JOB topic service. Msg: ', msg);

  try {
    await Jobs.findByIdAndUpdate(
      { _id: msg.body.job_id },
      {
        $addToSet: {
          applied_students: {
            resume_file_name: msg.body.resume_file_name,
            //cover_file: msg.body.cover_file,
            cover_file_name: msg.body.cover_file_name,
            sql_student_id: msg.body.sql_student_id,
            application_status: msg.body.application_status,
          },
        },
      },
    )
      .then((applyJob) => {
        console.log(applyJob);
        console.log('Applied to job');
        response.status = 200;
        response.message = 'APPLIED';
        return callback(null, response);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = 'Error in Data';
    return callback(err, null);
  }
}

async function getJobs(msg, callback) {
  let err = {};
  let response = {};
  await Jobs.find()
    .then((data) => {
      response.status = 200;
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}
