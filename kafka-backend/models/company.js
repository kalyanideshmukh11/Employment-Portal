"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema;

var companySchema = new schema(
  {
    noOfViews: { type: Number },
    photos: [{
      sql_student_id: {type: Number},
      fileName: {type: String}
    }],
    sql_company_id: {type: Number}
  },
  {
    versionKey: false,
  }
);

const Company = mongoose.model("company", companySchema);
module.exports = Company;
