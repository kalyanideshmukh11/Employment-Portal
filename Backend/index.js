const app = require('./app');

const images = require('./routes/Student/images');
const jobs = require('./routes/Employer/jobs');
const interviewRouter = require('./routes/Student/interview');
const reviewsRouter= require('./routes/Student/reviews');
const salaryRouter= require('./routes/Student/salary');

app.use('/images', images);
app.use('/glassdoor/jobs', jobs);
app.use('/student/interview', interviewRouter);
app.use('/company/reviews',reviewsRouter);
app.use('/company/salary',salaryRouter);


const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
