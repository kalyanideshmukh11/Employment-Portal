"use strict";

const Reviews = require("../models/review");

const redisClient = require("../config/redisConfig");

module.exports.reviewService = function (msg, callback) {
  console.log("In reviewService - path:", msg.path);
  switch (msg.path) {
    case "insertReviewDetails":
      insertReviewDetails(msg, callback); 
      break;
    case "getReviewDetails":
      getReviewDetails(msg,callback);
      break;
  }
};


async function insertReviewDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In post review  topic service. Msg: ', msg);
  console.log(msg.body);
  await Reviews.create(msg.body)
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


async function getReviewDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log("In getReviewDetails service. Msg: ", msg);
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
      Reviews.find({ company: msg.body }, function (err, doc) {
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

