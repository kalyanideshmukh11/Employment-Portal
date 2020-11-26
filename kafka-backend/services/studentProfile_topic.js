"use strict";
const sqlDB = require('../config/sqlConfig')
const studentModel = require('../models/student')

exports.studentProfileServices = function (msg, callback) {
  console.log("In studentProfileServices \n", msg.path);
  switch (msg.path) {
    case "getStudentHomedata":
        getStudentHomedata(msg, callback);
      break;

    case "getStudentProfiledata":
      getStudentProfiledata(msg, callback);
      break;

    case "editStudentBasicProfile":
      editStudentBasicProfile(msg, callback);
      break;

    case "editStudentAboutMe":
      editStudentAboutMe(msg, callback);
      break;

    case "addStudentExperience":
      addStudentExperience(msg, callback);
      break;
    
    case "addStudentSkills":
      addStudentSkills(msg, callback);
      break;

    case "addStudentEducation":
      addStudentEducation(msg, callback);
      break;
  }
};

async function getStudentHomedata(msg, callback){
    let error = {}, response = {}
    console.log("IN STUDENT PROFILE TOPIC", msg)
    let sql = `Call getStudentHome_data('${(msg.userId)}');`
    await sqlDB.query(sql, (err, result) => {
        if (err) {
          error.message = err
          error.status = 500
          return callback(null, error);
        } else{
          response.status = 200
          response.message = 'FETCH_STUDENT_LANDINGPAGE'
          response.data = result[0]
          console.log("BASIC HOME", response.data)
          return callback(null, response)
        }
      });
}

async function getStudentProfiledata(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  let sql = `Call getStudentProfile_data('${(msg.userId)}');`
  await sqlDB.query(sql, (err, result) => {
      if (err) {
        error.message = err
        error.status = 500
        return callback(null, error);
      } else{
        let sql_result = result
        studentModel.findOne({sql_student_id: msg.userId}, (error1, result1) => {
          if(!error1 && !result1){
            console.log("AREE YOU HEERE??")
            response.status = 200
            response.message = 'EDIT_STUDENT_PROFILE'
            response.data = sql_result[0]
            return callback(null, response)
          } else if (error1){
            error.message = error1
            error.status = 500
            return callback(null, error);
          } else if(result1){
            response.status = 200
            response.message = 'EDIT_STUDENT_PROFILE'
            response.data = [Object.assign(sql_result[0][0], result1._doc)]
            return callback(null, response)
          }
        })
      }
    });
}

async function editStudentBasicProfile(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  let sql = `Call editStudentProfile_data('${(msg.userId)}', '${(msg.data.first_name)}', '${(msg.data.last_name)}',
  '${(msg.data.job_title)}', '${(msg.data.city)}', '${(msg.data.address)}', '${(msg.data.email)}', '${(msg.data.state)}', '${(msg.data.zip)}',
  '${(msg.data.phone_number)}', '${(msg.data.website)}');`
  await sqlDB.query(sql, (err, result) => {
      if (err) {
        error.message = err
        error.status = 500
        return callback(null, error);
      } else {
        response.status = 200
        response.message = 'EDIT_STUDENT_PROFILE'
        response.data = result[0]
        return callback(null, response)
      }
    });
}

async function editStudentAboutMe(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  await studentModel.findOneAndUpdate({sql_student_id: msg.userId}, {aboutMe: msg.data.description}, (error1, result1) => {
    if(error1){
      error.message = error1
      error.status = 500
      return callback(null, error);
    } else if (result1){
      response.status = 200
      response.message = 'ABOUT_ME'
      response.data = "CHANGES_SAVED"
      return callback(null, response)
    } else if( !error1 && !result1){
      studentModel.create({
        sql_student_id: msg.userId,
        aboutMe: msg.data.description
      }, (error2, result2) => {
        if (error2) {
          error.message = error2
          error.status = 500
          return callback(null, error);
        } else{
          response.status = 200
          response.message = 'ABOUT_ME'
          response.data = "CHANGES_SAVED"
          return callback(null, response)
        }
      })
    } 
  })

}

async function addStudentExperience(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  studentModel.findOneAndUpdate({sql_student_id: msg.userId},
    {$push : {'experience': {
      title: msg.data.title,
      company_name: msg.data.company_name,
      location: msg.data.location,
      start_month: msg.data.start_month,
      start_year: msg.data.start_year,
      end_month: msg.data.end_month,
      end_year: msg.data.end_year,
      description: msg.data.description
    }}}, (error1, result1) => {
      if(error1){
        error.message = error1
        error.status = 500
        return callback(null, error);
      } else if (result1){
        response.status = 200
        response.message = 'ABOUT_ME'
        response.data = "CHANGES_SAVED"
        return callback(null, response)
      } else if(!error1 && !result1){
        studentModel.create({
          sql_student_id: msg.userId,
          experience: [msg.data]}, (error2, result2) => {
          if (error2) {
            error.message = error2
            error.status = 500
            return callback(null, error);
          } else if(result2){
            response.status = 200
            response.message = 'ABOUT_ME'
            response.data = "CHANGES_SAVED"
            return callback(null, response)
          }
        })
      }
    })

}

async function addStudentSkills (msg, callback) {
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  await studentModel.findOneAndUpdate({sql_student_id: msg.userId}, 
    {skills: msg.data}, (error1, result1) => {
      if (error1) {
        error.message = error1
        error.status = 500
        return callback(null, error);
      } else if(result1) {
        response.status = 200
        response.message = 'ABOUT_ME'
        response.data = "CHANGES_SAVED"
        return callback(null, response)
      } else if (!error1 && !result1){
        studentModel.create({sql_student_id: msg.userId, 
        skills: msg.data}, (error2, result2) => {
          if (error2) {
            error.message = error2
            error.status = 500
            return callback(null, error);
          } else {
            response.status = 200
            response.message = 'ABOUT_ME'
            response.data = "CHANGES_SAVED"
            return callback(null, response)
          }
        })
      }
    })
}

async function addStudentEducation(msg, callback){
  let error = {}, response = {}
  console.log("IN STUDENT PROFILE TOPIC", msg)
  studentModel.findOneAndUpdate({sql_student_id: msg.userId},
    {$push : {'education': {
      institution_name: msg.data.institution_name,
      degree_certificate: msg.data.degree_certificate,
      field_of_study: msg.data.field_of_study,
      location: msg.data.location,
      start_month: msg.data.start_month,
      start_year: msg.data.start_year,
      end_month: msg.data.end_month,
      end_year: msg.data.end_year,
      description: msg.data.description
    }}}, (error1, result1) => {
      if(error1){
        error.message = error1
        error.status = 500
        return callback(null, error);
      } else if (result1){
        response.status = 200
        response.message = 'ABOUT_ME'
        response.data = "CHANGES_SAVED"
        return callback(null, response)
      } else if(!error1 && !result1){
        studentModel.create({
          sql_student_id: msg.userId,
          education: [msg.data]}, (error2, result2) => {
          if (error2) {
            error.message = error2
            error.status = 500
            return callback(null, error);
          } else if(result2){
            response.status = 200
            response.message = 'ABOUT_ME'
            response.data = "CHANGES_SAVED"
            return callback(null, response)
          }
        })
      }
    })

}