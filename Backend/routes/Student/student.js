const express = require("express");
const app = express.Router();
const student = require("../../controllers/student.controller.js");

console.log("COmes here")
app.post('/register', student.create)
app.post('/login', student.validate)

module.exports = app;
