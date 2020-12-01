const express = require('express');
const kafka = require('../../kafka/client');
const router = express.Router();

router.get('/fetchCompanies', (req, res) => {
    kafka.make_request("companyProfile_topic", { "path": "getAllCompanies"}, function (err, results) {
      console.log(results);
      console.log("In make request call back", results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        //console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    })
  })

router.post('/search/job', (req, res) => {
  console.log('In company profile jobs to search');
  kafka.make_request(
    'jobs_topic',
    { path: 'searchJob', body: req.body, page: req.query.page },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log(results);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results.data));
      }
    }
  );
});


router.get('/:companyName/fetchStatistics', (req, res) => {
  console.log('In company profile jobs route');
  kafka.make_request(
    'jobs_topic',
    { path: 'getJobsStatistics', body: req.params.companyName },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log(results.data);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(results.data));
      }
    },
  );
});
module.exports = router;
