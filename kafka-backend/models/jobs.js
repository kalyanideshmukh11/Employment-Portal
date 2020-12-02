const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var jobsSchema = new Schema(
  {
    companyName: { type: String, required: true },
    title: { type: String, required: true },
    sql_company_id: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: { type: String, required: true },
    qualification: { type: String, required: true },
    industry: { type: String },
    country: { type: String },
    workType: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    zipcode: { type: String },
    posted_date: { type: String },
    applied_students: [
      {
        resume_file_name: { type: String, required: true },
        //cover_file: { type: Buffer },
        cover_file_name: { type: String },
        sql_student_id: { type: String, required: true },
        application_status: { type: String, required: true },
      },
    ],
  },
  {
    versionKey: false,
  }
);

var jobsModel = mongoose.model('Job', jobsSchema);

module.exports = jobsModel;
