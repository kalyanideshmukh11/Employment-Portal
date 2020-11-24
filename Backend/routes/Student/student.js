"use strict"
const express = require("express");
const app = express.Router();
const student = require("../../controllers/student.controller.js");
var { checkAuth } = require('../../config/passport')

app.post('/register', student.create)
app.post('/login', student.validate)

app.get('/home/:id', checkAuth, (req, res) => {
    let msg = {}
    

})

module.exports = app;
