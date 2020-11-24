"use strict"
const express = require("express");
const app = express.Router();
const student = require("../../controllers/student.controller.js");
var { checkAuth } = require('../../config/passport')
var kafka = require('../kafka/client');

app.post('/register', student.create)
app.post('/login', student.validate)

app.get('/home/:id', checkAuth, (req, res) => {
    kafka.make_request("studentProfile_topic", { "path": "studentHomeData", "userId": req.params.id }, function (err, results) {
        console.log(results);
        console.log("In make request call back", results);
        if (err) {
          console.log("Inside err");
          return res.status(err.status).send(err.message);
        } else {
            console.log("Inside Student home data")
            return res.status(results.status).send(results.message)
        }
      })
})

module.exports = app;
