"use strict";

const Salary = require("../models/salary");

const redisClient = require("../config/redisConfig");

exports.salaryService = function (msg, callback) {
  console.log("In salaryService - path:", msg.path);
  switch (msg.path) {
    case "insertSalaryDetails":
      insertSalaryDetails(msg, callback); 
      break;
    case "getSalaryDetails":
      getSalaryDetails(msg,callback);
      break;
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
  console.log("In getSalaryDetails service. Msg: ", msg);
  console.log(msg.body);

  redisClient.get("allSalary", function (err, data) {
    if (err) {
      console.log("error");
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
      console.log("fetching from mongoDb");
      Salary.find({ company: msg.body }, function (err, doc) {
        if (err || !doc) {
          response.status = 400;
        } else {
          redisClient.setex("allSalary", 36000, JSON.stringify(doc));
          response.status = 200;
          response.data = doc;
          //console.log(response)
          return callback(null, response);
        }
      });
    }
  });
}

