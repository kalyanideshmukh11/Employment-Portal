const express = require("express");
const app = express.Router();
const user = require("../../controllers/user.controller.js");

console.log("COmes here")
app.post('/register', user.create)
app.post('/login', user.validate)

module.exports = app;
