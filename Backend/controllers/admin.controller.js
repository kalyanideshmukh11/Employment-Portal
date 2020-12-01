const db = require('../models');
const company = db.company;
const Op = db.Sequelize.Op;
const kafka = require('../kafka/client');

exports.reviewsPerDay = (req, res) => {
  // var company_name = req.body.company_name;

  // var condition = { name: { [Op.like]: `%${company_name}%` } };
  company
    .findAll()
    .then((data) => {
      var dict = {};
      for (each of data) {
        dict[each.id] = each;
      }
      kafka.make_request(
        'review_topic',
        {
          path: 'reviewsPerDay',
          body: dict,
        },
        function (err, results) {
          if (err) {
            console.log('Inside err');
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Some error has occured');
          } else {
            console.log(results);
            // res.writeHead(200, { "Content-Type": "aplication/json" });
            res.send(results);
          }
        }
      );
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving companies.',
      });
    });
};

exports.mostReviewed = (req, res) => {
  // var company_name = req.body.company_name;

  // var condition = { name: { [Op.like]: `%${company_name}%` } };
  company
    .findAll()
    .then((data) => {
      var dict = {};
      for (each of data) {
        dict[each.id] = each;
      }
      kafka.make_request(
        'review_topic',
        {
          path: 'mostReviewed',
          body: dict,
        },
        function (err, results) {
          if (err) {
            console.log('Inside err');
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Some error has occured');
          } else {
            console.log(results);
            // res.writeHead(200, { "Content-Type": "aplication/json" });
            res.send(results);
          }
        }
      );
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving companies.',
      });
    });
};

// exports.searchInterview = (req, res) => {
//   var company_name = req.body.company_name;

//   var condition = { name: { [Op.like]: `%${company_name}%` } };
//   company
//     .findAll({ where: condition })
//     .then((data) => {
//       var dict = {};
//       for (each of data) {
//         dict[each.id] = each;
//       }
//       kafka.make_request(
//         'interview_topic',
//         {
//           path: 'searchByInterview',
//           body: dict,
//           page: req.query.page,
//         },
//         function (err, results) {
//           if (err) {
//             console.log('Inside err');
//             console.log(err);
//             res.writeHead(500, { 'Content-Type': 'text/plain' });
//             res.end('Some error has occured');
//           } else {
//             console.log(results);
//             // res.writeHead(200, { 'Content-Type': 'aplication/json' });
//             res.send(results);
//           }
//         }
//       );
//       // res.send(dict);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving companies.',
//       });
//     });
// };

// exports.searchSalary = (req, res) => {
//   var company_name = req.body.company_name;

//   var condition = { name: { [Op.like]: `%${company_name}%` } };
//   company
//     .findAll({ where: condition })
//     .then((data) => {
//       var dict = {};
//       for (each of data) {
//         dict[each.id] = each;
//       }
//       kafka.make_request(
//         'salary_topic',
//         {
//           path: 'searchBySalary',
//           body: dict,
//           page: req.query.page,
//         },
//         function (err, results) {
//           if (err) {
//             console.log('Inside err');
//             console.log(err);
//             res.writeHead(500, { 'Content-Type': 'text/plain' });
//             res.end('Some error has occured');
//           } else {
//             console.log(results);
//             // res.writeHead(200, { 'Content-Type': 'aplication/json' });
//             res.send(results);
//           }
//         }
//       );
//       // res.send(dict);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving companies.',
//       });
//     });
// };
