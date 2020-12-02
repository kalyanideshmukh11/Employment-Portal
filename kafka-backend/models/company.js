"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema;

var companySchema = new schema(
  {
    noOfViews: { type: Number },
    photos: [{
      fileName: {type: String}
    }],
    sql_company_id: {type: Number}
  },
  {
    versionKey: false,
  }
);

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
