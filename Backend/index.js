const app = require('./app');

const images = require('./routes/Student/images');
const studentRouter = require('./routes/Student/student');
const companyRouter = require('./routes/Employer/company');
const companyProfileRouter = require('./routes/Employer/profile');
const jobs = require('./routes/Employer/jobs');
const imageUpload = require('./routes/Employer/imageUpload');
const reviewRouter = require('./routes/Employer/reviews');
const interviewRouter = require('./routes/Student/interview');
const salaryRouter = require('./routes/Student/salary');
const studentJobRouter = require('./routes/Student/job');

app.use('/images', images);
app.use('/student', studentRouter);
app.use('/company', companyRouter);
app.use('/company/profile', companyProfileRouter);
app.use('/glassdoor/jobs', jobs);
app.use('/company/imageUpload', imageUpload);
app.use('/company/reviews', reviewRouter);
app.use('/student/interview', interviewRouter);
app.use('/student/salary', salaryRouter);
app.use('/student/job', studentJobRouter);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;

const db = require('./models');
// TODO: Remove force: true and change to sync() in production
// force: true drops table and resyncs db
db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and re-sync db.');
});
