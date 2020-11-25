"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema;

var companySchema = new schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    website: { type: String, required: true },
    size: { type: String, required: true },
    type: { type: String, required: true },
    revenue: { type: String },
    headquarters: { type: String },
    industry: { type: String },
    founded: { type: String },
    ceoName: { type: String },
    mission: { type: String },
  },

  {
    versionKey: false,
  }
);

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
