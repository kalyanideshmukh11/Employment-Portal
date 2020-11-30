"use strict"
const express = require("express");
const app = express.Router();
const student = require("../../controllers/student.controller.js");
var { checkAuth } = require('../../config/passport')
var kafka = require('../../kafka/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../..') + '/public/uploads/student/resumes',
  filename: (req, file, cb) => {
      cb(null, 'student' + req.params.id + '-' + 'resume' + "-" + Date.now() + '!%%%!' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("file");

app.post('/register', student.create)
app.post('/login', student.validate)

app.get('/home/:id', checkAuth, (req, res) => {
    kafka.make_request("studentProfile_topic", { "path": "getStudentHomedata", "userId": req.params.id }, function (err, results) {
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
    kafka.make_request("studentProfile_topic", { "path": "editStudentBasicProfile", "userId": req.params.id, "data": req.body }, function (err, results) {
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
    kafka.make_request("studentProfile_topic", { "path": "editStudentAboutMe", "userId": req.params.id, "data": req.body }, function (err, results) {
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

app.post('/addResume/:id', checkAuth, (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err)
        return res.status(500).json(err)
    } else if (err) {
      console.log(err)
        return res.status(500).json(err)
    } else {
      const resume_data = {
        resume: req.file.filename,
        is_primary: req.body.is_primary
      }
      kafka.make_request("studentResume_topic", { "path": "addStudentResume", "userId": req.params.id, "data": resume_data }, function (err, results) {
        console.log("In make request call back", results);
        if (err) {
          console.log("Inside err");
          return res.status(err.status).send(err.message);
        } else {
            console.log("Inside Student resume data")
            return res.status(results.status).send(results.data)
        }
      })

    }

})

})

app.post('/markPrimaryResume/:id', checkAuth, (req, res) => {
  kafka.make_request("studentResume_topic", { "path": "markPrimaryResume", "userId": req.params.id, "data": req.body }, function (err, results) {
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

app.post('/deleteResume/:id', checkAuth, (req, res) => {
  var resume_path = path.join(__dirname, '../..') + '/public/uploads/student/resumes/' + req.body.resume;
  fs.unlink(resume_path, (err) => {
    if (err) {
      console.error(err)
      return
    } else {
      kafka.make_request("studentResume_topic", { "path": "deleteResume", "userId": req.params.id, "data": req.body }, function (err, results) {
        console.log("In make request call back", results);
        if (err) {
          console.log("Inside err");
          return res.status(err.status).send(err.message);
        } else {
            console.log("Inside Student profile data")
            return res.status(results.status).send(results.data)
        }
      })
    }
  })
})

app.post('/openResume', (req, res) => {
  var file_path = path.join(__dirname, '../..') + '/public/uploads/student/resumes/' + req.body.resume;
  if (fs.existsSync(file_path)) {
      res.contentType("application/pdf")
      res.sendFile(file_path);
  }
  else {
      res.send("FILE DOES NOT EXISTS")
  }
});

app.post('/addJobPreferences/:id', checkAuth, (req, res) => {
  kafka.make_request("studentProfile_topic", { "path": "addJobPreferences", "userId": req.params.id, "data": req.body }, function (err, results) {
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

app.post('/addCompanyPreferences/:id', checkAuth, (req, res) => {
  kafka.make_request("studentProfile_topic", { "path": "addCompanyPreferences", "userId": req.params.id, "data": req.body }, function (err, results) {
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
