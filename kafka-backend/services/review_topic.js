"use strict";

const Review = require("../models/review");

const redisClient = require("../config/redisConfig");

exports.reviewService = function (msg, callback) {
  console.log("In reviewService - path:", msg.path);
  switch (msg.path) {
    case "companyReviews":
      companyReviews(msg, callback); // Change this method name accordingly
      break;
  }
};

async function companyReviews(msg, callback) {
  let err = {};
  let response = {};
  console.log("In companyReviews service. Msg: ", msg);
  console.log(msg.body);

  redisClient.get("allReviews", function (err, data) {
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
      Review.find({ companyName: msg.body }, function (err, doc) {
        if (err || !doc) {
          response.status = 400;
        } else {
          redisClient.setex("allReviews", 36000, JSON.stringify(doc));
          response.status = 200;
          response.data = doc;
          //console.log(response)
          return callback(null, response);
        }
      });
    }
  });
}
