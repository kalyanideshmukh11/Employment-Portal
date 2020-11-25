const review = require('../models/review');

module.exports.reviewService = function (msg, callback) {
  console.log('In review service path', msg.path);
  switch (msg.path) {
    case 'searchByCompany':
      searchByCompany(msg, callback);
      break;
  }
};

async function searchByCompany(msg, callback) {
  let err = {};
  let response = {};
  console.log('In search by company details topic service. Msg: ', msg);
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body)
  await review.find(msg.body)
    .then((data) => {
      response.status = 200;
      response.message = 'Inserted Successfully';
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}
