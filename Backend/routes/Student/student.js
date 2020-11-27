"use strict"
const express = require("express");
const app = express.Router();
const student = require("../../controllers/student.controller.js");
var { checkAuth } = require('../../config/passport')
var kafka = require('../../kafka/client');

app.post('/register', student.create)
app.post('/login', student.validate)

app.get('/home/:id', checkAuth, (req, res) => {
    kafka.make_request("studentProfile_topic", { "path": "getStudentHomedata", "userId": req.params.id }, function (err, results) {
        console.log(results);
        console.log("In make request call back", results);
        if (err) {
          console.log("Inside err");
          return res.status(err.status).send(err.message);
        } else {
            console.log("Inside Student home data")
            return res.status(results.status).send(results.data)
        }
      })
})

app.get('/profile/:id', checkAuth, (req, res) => {
    kafka.make_request("studentProfile_topic", { "path": "getStudentProfiledata", "userId": req.params.id }, function (err, results) {
        console.log(results);
        console.log("In make request call back", results);
        if (err) {
          console.log("Inside err");
          return res.status(err.status).send(err.message);
        } else {
            console.log("Inside Student profile data")
            return res.status(results.status).send(results.data)
        }
      })
})

app.post('/basicProfile/:id', checkAuth, (req, res) => {
    console.log(req.body)
    kafka.make_request("studentProfile_topic", { "path": "editStudentBasicProfile", "userId": req.params.id, "data": req.body }, function (err, results) {
        console.log(results);
        console.log("In make request call back", results);
        if (err) {
          console.log("Inside err");
          return res.status(err.status).send(err.message);
        } else {
            console.log("Inside Student profile data")
            return res.status(results.status).send(results.data)
        }
      })
})

app.post('/aboutMe/:id', checkAuth, (req, res) => {
    console.log(req.body)
    kafka.make_request("studentProfile_topic", { "path": "editStudentAboutMe", "userId": req.params.id, "data": req.body }, function (err, results) {
        console.log(results);
        console.log("In make request call back", results);
        if (err) {
          console.log("Inside err");
          return res.status(err.status).send(err.message);
        } else {
            console.log("Inside Student profile data")
            return res.status(results.status).send(results.data)
        }
      })
})

app.post('/addExperience/:id', checkAuth, (req, res) => {
    kafka.make_request("studentProfile_topic", { "path": "addStudentExperience", "userId": req.params.id, "data": req.body }, function (err, results) {
        console.log(results);
        console.log("In make request call back", results);
        if (err) {
          console.log("Inside err");
          return res.status(err.status).send(err.message);
        } else {
            console.log("Inside Student profile data")
            return res.status(results.status).send(results.data)
        }
      })
})

app.post('/addSkills/:id', checkAuth, (req, res) => {
  kafka.make_request("studentProfile_topic", { "path": "addStudentSkills", "userId": req.params.id, "data": req.body }, function (err, results) {
      console.log(results);
      console.log("In make request call back", results);
      if (err) {
        console.log("Inside err");
        return res.status(err.status).send(err.message);
      } else {
          console.log("Inside Student profile data")
          return res.status(results.status).send(results.data)
      }
    })
})

app.post('/addEducation/:id', checkAuth, (req, res) => {
  kafka.make_request("studentProfile_topic", { "path": "addStudentEducation", "userId": req.params.id, "data": req.body }, function (err, results) {
      console.log(results);
      console.log("In make request call back", results);
      if (err) {
        console.log("Inside err");
        return res.status(err.status).send(err.message);
      } else {
          console.log("Inside Student profile data")
          return res.status(results.status).send(results.data)
      }
    })
})
module.exports = app;
