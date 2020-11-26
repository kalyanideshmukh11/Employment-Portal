const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var profilePicture = new Schema({
    img: {type: String, required:true}
},

{
    versionKey: false
});

var experienceSchema = new Schema({
    title: {type: String, required:true}, 
    company_name: {type: String, required:true},
    location: {type: String, required:true},
    start_month: {type: String, required:true},
    start_year: {type: String, required:true},
    end_month: {type: String, required:true},
    end_year: {type: String, required:true},
    description: {type: String, required:true}
},

{
    versionKey: false
});

var skillsSchema = new Schema({
    skill: {type: String, required:true}
},

{
    versionKey: false
});

var educationSchema = new Schema({
    institution_name: {type: String, required:true},
    degree_certificate: {type: String, required:true},
    field_of_study: {type: String, required:true},
    location: {type: String, required:true},
    start_month: {type: String, required:true},
    start_year: {type: String, required:true},
    end_month: {type: String, required:true},
    end_year: {type: String, required:true},
    description: {type: String, required:true}
},

{
    versionKey: false
});


var resumeSchema = new Schema({
    resume: {type: String, required:true}
},

{
    versionKey: false
});

var studentSchema = new Schema({
    sql_student_id: {type: String, required:true},
    aboutMe: {type: String},
    image: [profilePicture],
    experience: [experienceSchema],
    skills: [skillsSchema],
    education: [educationSchema],
    resumes: [resumeSchema],
},
{
    versionKey: false
});

const StudentModel = mongoose.model('studentSchema', studentSchema, 'students');
module.exports = StudentModel;