const express = require("express");
const router = express.Router();
//const Company = require('../../models/company_mongo.model');
//const reviews = require('../../models/reviews_mongo.model');
var kafka = require('../../kafka/client');
//const redisClient = require('../../redisConfig');

// router.get('/:companyName', (req, res) => {
//   redisClient.get("allReviews", function (err, data) {
//       if (err) {
//           res.status = 400;
//       }
//       else if (data) {
//           res.send(JSON.parse(data))
//       } else {
//           reviews.find({},
//               function (err, doc) {
//                   if(err || !doc){
//                       res.status = 400;
//                   } else {
//                       redisClient.setex("allReviews", 36000, JSON.stringify(doc));
//                       res.status = 200;
//                       res.send(doc);
//                   }
//               })
//       }
//   })
// })

// router.get('/:companyName', (req, res) => {
//     console.log("hi")
//     // console.log(req.params.companyName);
//     reviews.find({},)
//     .then(comp => {
//         console.log(comp);
//         res.status = 200;
//         res.message = "REVIEWS_FETCHED";
//         res.send(comp)
//     })
//     .catch(err => {
//         console.log(err)
//     });
//     }
// )

router.get('/:companyName', (req, res) => {
    console.log(req.params.companyName)
  kafka.make_request("review_topic", { "path": "companyReviews", "body": req.params.companyName }, function (err, results) {
    console.log(results);
    console.log("In make request call back", results);
    if (err) {
      console.log("Inside err");
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      //console.log("Inside else", results);
      if (results.data) {
        return res.send(results.data);
      } else {
        return res.status(results.status).send(results.errors);
      }
    }
  })
})

router.post('/favourite', (req, res) => {
  console.log(req.body)
kafka.make_request("review_topic", { "path": "updateFavFeatured", "id": req.body.id, "colValue": req.body.value }, function (err, results) {
  console.log(results);
  console.log("In make request call back", results);
  if (err) {
    console.log("Inside err");
    console.log(err);
    return res.status(err.status).send(err.message);
  } else {
    //console.log("Inside else", results);
    if (results.data) {
      return res.send(results.data);
    } else {
      return res.status(results.status).send(results.errors);
    }
  }
})
})


module.exports=router;