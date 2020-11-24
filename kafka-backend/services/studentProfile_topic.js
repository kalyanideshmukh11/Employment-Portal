"use strict";
const sqlDB = require('../config/sqlConfig')

exports.studentProfileServices = function (msg, callback) {
  console.log("In studentProfileServices \n", msg.path);
  switch (msg.path) {
    case "getStudentHomedata":
        getStudentHomedata(msg, callback);
      break;

    case "getStudentProfile":
        getStudentProfile(msg, callback);
      break;
  }
};

async function getStudentHomedata(msg, callback){
    let error = {}, response = {}
    console.log("IN STUDENT PROFILE TOPIC", msg)
    let sql = `Call getStudentHome_data('${(req.params.id)}');`
    await sqlDB.query(sql, (err, result) => {
        if (err) {
          error.message = err
          error.status = 500
          return(callback, error);
        } else{
          response.status = 200
          response.message = 'USER_DATA'
          response.data = result
          return(callback, response)
        }
      });
}
