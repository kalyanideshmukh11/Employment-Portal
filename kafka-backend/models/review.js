const mongoose = require("mongoose");
const schema = mongoose.Schema;

var reviewSchema = new schema(
  {rating: {
    type: mongoose.Schema.Types.Number,
    min: 1,
    max: 5,
    required: true,
  },
  headline: { type: mongoose.Schema.Types.String, required: true, },
  description: { type: mongoose.Schema.Types.String, required: true, },
  pros: { type: mongoose.Schema.Types.String, required: true,},
  cons: { type: mongoose.Schema.Types.String,required: true, },
  helpful:{type: mongoose.Schema.Types.Number, default:0 },
  ceo_rating:{ type: mongoose.Schema.Types.Boolean}, 
  recommended:{ type: mongoose.Schema.Types.Boolean},
  company:{type: mongoose.Schema.Types.String, required: true},
  student:{type: mongoose.Schema.Types.String, required: true},
  date: { type: mongoose.Schema.Types.Date, default: Date.now() },
//   company: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'company',
//   },
//   /**
//    * TODO: add required tag and ref to student model
//    */
//   student: {
//     id: { type: mongoose.Schema.Types.Number, required: true },
//     name: { type: mongoose.Schema.Types.String, required: true },
//     email: { type: mongoose.Schema.Types.String, required: true }
//   },
//Employer related
featured:{ type: mongoose.Schema.Types.Boolean, default: false},
favorite:{ type: mongoose.Schema.Types.Boolean, default: false}, 
status:{ type: mongoose.Schema.Types.Boolean, default: true},  //default +ve (admin sholud mark? +ve -ve)
approvedstatus:{type: mongoose.Schema.Types.Boolean, default: false},
},

  {
    versionKey: false,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
