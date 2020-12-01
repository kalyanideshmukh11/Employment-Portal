const express = require('express');
const app = express.Router();
const company = require('../../controllers/company.controller.js');

app.post('/register', company.create);
app.post('/search/company', company.search);
app.post('/search/interview', company.searchInterview);
app.post('/search/salary', company.searchSalary);
// app.post('/login', user.validate)

module.exports = app;
