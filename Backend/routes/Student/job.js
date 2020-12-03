const express = require('express');
const kafka = require('../../kafka/client');
const router = express.Router();

router.post('/apply', (req, res) => {
  console.log('In apply JOB route');
  console.log(req.body);
  console.log('FULL--------');
  kafka.make_request(
    'jobs_topic',
    {
      path: 'apply_job',
      body: req.body,
    },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log(results);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(results.message);
      }
    }
  );
});

router.get('/all', (req, res) => {
  console.log('Get all jobs');
  kafka.make_request(
    'jobs_topic',
    { path: 'getJobs' },
    function (err, results) {
      if (err) {
        console.log('Inside err');
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Some error has occured');
      } else {
        console.log(results);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(results.data));
      }
    }
  );
});

module.exports = router;
