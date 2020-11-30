const express = require('express');
const app = express.Router();
const admin = require('../../controllers/admin.controller.js');

app.get('/reviewcount', admin.reviewsPerDay);
// app.post('/search/company', company.search);
// app.post('/search/interview', company.searchInterview);
// app.post('/search/salary', company.searchSalary);
// app.post('/login', user.validate)

module.exports = app;
