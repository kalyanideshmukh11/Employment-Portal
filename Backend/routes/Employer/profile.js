const express = require("express");
const router = express.Router();
//const passwordHash = require('password-hash');
//const pool = require('../../pool');
//var kafka = require('../kafka/client');
//const { checkAuth } = require('../Utils/passport');
const Company = require('../../models/company_mongo.model');

router.get('/:user_id', (req, res) => {
    console.log(req.params.user_id);
    Company.find({ company: req.params.user_id },)
    .then(comp => {
        console.log("");
        res.status = 200;
        res.message = "USER_EXISTS";
        res.data = comp
        return callback(null, response);
    })
    .catch(err => {
        console.log(err)
    });
    }
)
//     kafka.make_request("companyProfile_topic", { "path": "getCompanyDetails", "body": req.params.user_id}, function (err, results) {
//       console.log(results);
//       console.log("In make request call back", results);
//       if (err) {
//         console.log("Inside err");
//         console.log(err);
//         return res.status(err.status).send(err.message);
//       } else {
//         //console.log("Inside else", results);
//         if (results.status === 200) {
//           return res.status(results.status).send(results.data);
//         } else {
//           return res.status(results.status).send(results.errors);
//         }
//       }
//     })
//   })

  router.post('/update/:user_id', (req, res) => {
    console.log(req.params.user_id)
    kafka.make_request("companyProfile_topic", { "path": "companyUpdate", "body": req.body, "userId": req.params.user_id }, function (err, results) {
      console.log(results);
      console.log("In make request call back", results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        //console.log("Inside else", results);
        if (results.status === 200) {
          return res.end(results.message);
        } else {
          return res.end(results.message);
        }
      }
    })
    });

    module.exports=router;