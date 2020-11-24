"use strict";

const Company = require("../models/company");
const pool = require('../config/sqlConfig');
// const redisClient = require('../redisConfig');

exports.companyProfileService = function (msg, callback) {
  console.log("In companyProfileService - path:", msg.path);
  switch (msg.path) {
    case "getCompanyDetails":
      getCompanyDetails(msg, callback);
      break;

    case "companyUpdate":
      updateCompanyDetails(msg, callback);
      break;
  }
};

async function getCompanyDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log("In get company details topic service. Msg: ", msg);
  console.log(msg.body);

  let sql = `CALL get_companyProfile('${msg.body}');`;
    pool.query(sql, (err, result) => {
      console.log(result)
      if (err) {
        err.status = 400;
        return callback(null, err)
      }
      if (result && result.length > 0 && result[0][0]) {
        response.status = 200;
        response.message = "COMPANYDETAILS_FETCHED";
        response.data = (JSON.stringify(result[0][0]));
        console.log(response);
        return callback(null, response)
      };
    });
}

//   await Company.findById(
//     { _id: msg.body }
//     //{ safe: true, new: true, useFindAndModify: false },
//   )
//     .then((comp) => {
//       console.log("Company exists");
//       response.status = 200;
//       response.message = "USER_EXISTS";
//       response.data = comp;
//       return callback(null, response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

async function updateCompanyDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log("In updateCompanyDetails service. Msg: ", msg);
  console.log(msg.body);

  await User.findByIdAndUpdate(
    { _id: msg.userId },
    { $set: msg.body },
    { safe: true, new: true, useFindAndModify: false }
  )
    .then((user) => {
      console.log(user);
      console.log("Company details updated successfully");
      response.status = 200;
      response.message = "COMPANY_UPDATED";
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}
