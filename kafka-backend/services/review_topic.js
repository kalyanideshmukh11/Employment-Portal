"use strict";

const Review = require("../models/review");
const redisClient = require("../config/redisConfig");
const sqlDB = require('../config/sqlConfig');

exports.reviewService = function (msg, callback) {
  console.log("In reviewService - path:", msg.path);
  switch (msg.path) {
    case "companyReviews":
      companyReviews(msg, callback);
      break;
    case "updateFavFeatured":
      updateFavFeatured(msg, callback); 
      break;
    case "insertReviewDetails":
      insertReviewDetails(msg, callback);
      break;
    case "getReviewDetails":
      getReviewDetails(msg, callback);
        break;
    case "getFeaturedReview":
      getFeaturedReview(msg, callback);
      break;
    case "getPositiveReview":
      getPositiveReview(msg, callback);
      break;
    case "getNegativeReview":
      getNegativeReview(msg, callback);
      break; 
    case "getOverallRating":
      getOverallRating(msg, callback);
        break; 
    case "updateHelpful":
      updateHelpful(msg, callback);
            break; 
  }
};

async function insertReviewDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In add review topic service. Msg: ', msg);
  let companyId = '';
  let sql = `Call get_sqlCompanyId('${msg.body.company}');`;
  try {
    sqlDB.query(sql, async (err, result) => {
      if (err) {
        error.message = err;
        error.status = 500;
        return callback(null, error);
      } else {
        companyId = result[0][0].id;
        let iObj = new Review({
          sql_company_id: companyId,
          sql_student_id: msg.body.sql_student_id,
          rating:msg.body.rating,
          company: msg.body.company,
          headline: msg.body.headline,
          job_title: msg.body.job_title,
          description: msg.body.description,
          pros: msg.body.pros,
          cons: msg.body.cons,
          ceo_rating: msg.body.ceo_rating,
          recommended: msg.body.recommended,          
        });
        let newReview = await iObj.save();
        if (!newReview) {
          response.status = 500;
          response.data = 'Data error';
          return callback(null, response);
        } else {
          response.status = 200;
          response.message = 'Inserted Successfully';
          response.data = JSON.stringify(newReview);
          return callback(null, response);
        }
      }
    });
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = 'Error in Data';
    return callback(err, null);
  }
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
    else {
      console.log("fetching from mongoDb");
      Review.find({ company: msg.body,approvedstatus:"Approved" }, function (err, doc) {
        if (err || !doc) {
          response.status = 400;
        } else {
          response.status = 200;
          response.data = doc;
          return callback(null, response);
        }
      });
    }
  });
}

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
      Review.find({ company: msg.body }, function (err, doc) {
        if (err || !doc) {
          response.status = 400;
        } else {
          //redisClient.setex("allReviews", 36000, JSON.stringify(doc));
          response.status = 200;
          response.data = doc;
          //console.log(response)
          return callback(null, response);
        }
      });
    }
  });
}


async function updateFavFeatured(msg, callback) {
  let err = {};
  let response = {};
  console.log("In updateCompanyDetails service. Msg: ", msg);
  
  if(msg.colValue == 'favourite') {
    await Review.findByIdAndUpdate(
          { _id: msg.id },
          { favorite: true },
          { safe: true, new: true, useFindAndModify: false }
        )
          .then((user) => {
            console.log(user);
            console.log("Review marks as favourite");
            response.status = 200;
            response.message = "REVIEW_UPDATED";
            return callback(null, response);
          })
          .catch((err) => {
            console.log(err);
          });
  } else {
    await Review.findByIdAndUpdate(
      { _id: msg.id },
      { featured: true },
      { safe: true, new: true, useFindAndModify: false }
    )
      .then((user) => {
        console.log(user);
        console.log("Review marks as featured");
        response.status = 200;
        response.message = "REVIEW_UPDATED";
        return callback(null, response);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  
async function getFeaturedReview(msg, callback) {
    let err = {};
    let response = {};
    console.log("In getFeaturedReview service. Msg: ", msg);
    console.log(msg.body);
    Review.find({company: msg.body , featured: true } ).then((user) => {
      console.log(user);
      console.log("Featured Review");
      response.status = 200;
      response.data = user;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
  }

async function getPositiveReview(msg, callback) {
    let err = {};
    let response = {};
    console.log("In getPositiveReview service. Msg: ", msg);
    console.log(msg.body);
    Review.find({$query:{company: msg.body , status: true}}).sort({ helpful: -1 }).limit(1).then((user) => {
      console.log(user);
      console.log("Positive Review");
      response.status = 200;
      response.data = user;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  async function getNegativeReview(msg, callback) {
    let err = {};
    let response = {};
    console.log("In getNegativeReview service. Msg: ", msg);
    console.log(msg.body);
    Review.find({$query:{company: msg.body , status: false }}).sort({ helpful: -1 }).limit(1).then((user) => {
      console.log(user);
      console.log("Negative Review");
      response.status = 200;
      response.data = user;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  async function getOverallRating(msg, callback) {
    let err = {};
    let response = {};
    console.log("In getNegativeReview service. Msg: ", msg);
    console.log(msg.body);
    Review.aggregate([
      {
        $group:
          {
            _id: "$company",
            avgRating: { $avg: "$rating" },
            ceoRating: { $avg: "$ceo_rating" },
            recommended: { $avg: "$recommended" }
          }
      },
      { $match : { _id : msg.body } }
    ]).then((user) => {
      console.log(user);
      console.log("average rating");
      response.status = 200;
      response.data = user;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  async function updateHelpful(msg, callback) {
    let err = {};
    let response = {};
    console.log("In updateCompanyDetails service. Msg: ", msg);
    
    if(msg.colValue == 'favourite') {
      await Review.findByIdAndUpdate(
            { _id: msg.id },
            { favorite: true },
            { safe: true, new: true, useFindAndModify: false }
          )
            .then((user) => {
              console.log(user);
              console.log("Review marks as favourite");
              response.status = 200;
              response.message = "REVIEW_UPDATED";
              return callback(null, response);
            })
            .catch((err) => {
              console.log(err);
            });
    } else {
      await Review.findByIdAndUpdate(
        { _id: msg.id },
        { featured: true },
        { safe: true, new: true, useFindAndModify: false }
      )
        .then((user) => {
          console.log(user);
          console.log("Review marks as featured");
          response.status = 200;
          response.message = "REVIEW_UPDATED";
          return callback(null, response);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
