const express = require('express');
const app = express.Router();
const admin = require('../../controllers/admin.controller.js');

app.get('/reviewcount', admin.reviewsPerDay);
app.get('/mostreviewed', admin.mostReviewed);
app.get('/toprated', admin.topRated);

module.exports = app;
