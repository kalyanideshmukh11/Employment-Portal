"use strict";

const Company = require("../models/company");

// const redisClient = require('../redisConfig');

exports.studentProfileServices = function (msg, callback) {
  console.log("In studentProfileServices - path:", msg.path);
  switch (msg.path) {
    case "getStudentHomedata":
        getStudentHomedata(msg, callback);
      break;

    case "getStudentProfile":
        getStudentProfile(msg, callback);
      break;
  }
};

