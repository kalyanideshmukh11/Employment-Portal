
"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema;

var companySchema = new schema(
  {
    noOfViews: { type: Number },
    photos: [{
      sql_student_id: {type: Number},
      s3Url: {type: String},
      review_status: {type: String, required: true, default: "Pending"},
      date: { type: mongoose.Schema.Types.Date, default: Date.now() },
    }],
    sql_company_id: {type: Number},
    company_name: {type: String}
  },
  {
    versionKey: false,
  }
);

const Company = mongoose.model("company", companySchema);
module.exports = Company;

