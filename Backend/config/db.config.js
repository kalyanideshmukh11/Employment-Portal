module.exports = {
    secret: "glassdoor_passport",
    HOST: "glassdoor1.ct6wnyfm23fl.us-west-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "glassdoor273",
    DB: "sys",
    dialect: "mysql",
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };