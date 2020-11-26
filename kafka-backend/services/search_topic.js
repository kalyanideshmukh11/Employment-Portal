const review = require("../models/review");

module.exports.searchService = function (msg, callback) {
  console.log("In review service path", msg.path);
  switch (msg.path) {
    case "searchByCompany":
      searchByCompany(msg, callback);
      break;
  }
};

async function searchByCompany(msg, callback) {
  let err = {};
  let response = {};
  console.log("In search by company details topic service. Msg: ");
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body);
  await review.aggregate(
    [
      {
        $match: { sql_company_id: { $in: ids } },
      },
      {
        $group: {
          _id: "$sql_company_id",
          reviews: { $sum: 1 },
        },
      },
    ],
    function (err, results) {
      console.log("Results:", results);
      for (each of results) {
        msg.body[each._id].reviews = each.reviews;
      }
    }
  );

  callback(null, msg.body);
  // .find({ sql_company_id: { $in: ids } }, function (err, result) {
  //   console.log("reviews list:", result);
  //   callback(null, result);
  // });
}
