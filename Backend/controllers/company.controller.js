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
