const express = require("express");
const app = express.Router();
const company = require("../../controllers/company.controller.js");

app.post('/register', company.create)
// app.post('/login', user.validate)

module.exports = app;
