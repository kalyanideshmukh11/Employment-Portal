const mysql = require('mysql');
const sqlDB = mysql.createConnection({
    connectionLimit: 100,
    host: 'glassdoor1.ct6wnyfm23fl.us-west-1.rds.amazonaws.com',
    user: 'admin',
    port: 3306,
    password: 'glassdoor273',
    database: 'sys'
});

sqlDB.connect((err) => {
    if(err){
      console.log(err)
      throw 'Error occured: ' + err;
       
    } else {
        console.log("MYSQL Database Connected")
    }
  });

  module.exports = sqlDB;