const db = require("../models");
const company = db.company;
const Op = db.Sequelize.Op;
const passwordHash = require('password-hash');


exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }
  let hashedPassword = passwordHash.generate(req.body.password);

  const c = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  };
  
  company.create(c)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the account."
      });
    });
};

exports.validate = (req, res) => {
  const email = req.body.email;
  const pwd = req.body.password;
  
  var condition = email ? { email: { [Op.eq]: `${email}` } } : null;
  console.log("email and pwd:",email , pwd, condition)

  user.findOne({ where: condition })
    .then(data => {
      console.log("data:", data)
      if (!data) {
        res.status(401).send({
          message: "INVALID_CREDENTIALS"
        });
      }
      else if (passwordHash.verify(pwd, data.dataValues.password)){
        message = {message: "SUCCESS"}
        returnVal = Object.assign(message, data.dataValues)
        res.status(200).send(returnVal)
      }
      else{
        res.status(401).send({
          message: "INVALID_CREDENTIALS"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while logging in."
      });
    });
};
