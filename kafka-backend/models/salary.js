const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema(
  {
    base_salary: { type: mongoose.Schema.Types.Number, default: 0 },
    currancy: { type: mongoose.Schema.Types.String, required: true },
    bonus: { type: mongoose.Schema.Types.Boolean },
    cash_bonus: { type: mongoose.Schema.Types.Number, default: 0 },
    stock_bonus: { type: mongoose.Schema.Types.Number, default: 0 },
    profit_bonus: { type: mongoose.Schema.Types.Number, default: 0 },
    gratuities: { type: mongoose.Schema.Types.Number, default: 0 },
    job_title: { type: mongoose.Schema.Types.String, required: true },
    year_of_experience: { type: mongoose.Schema.Types.Number, required: true },
    location: { type: mongoose.Schema.Types.String, required: true },
    company: { type: mongoose.Schema.Types.String, required: true },
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
  },
  {
    timestamps: true,
  }
);

module.exports = Review = mongoose.model('salary', SalarySchema);
