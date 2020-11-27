const app = require('./app');

const images = require('./routes/Student/images');
const jobs = require('./routes/Employer/jobs');
<<<<<<< Updated upstream
const reviews= require('./routes/Employer/reviews');
const salary= require('./routes/Employer/salary');
=======
const interviewRouter = require('./routes/Student/interview');
const reviewsRouter= require('./routes/Student/reviews');
const salaryRouter= require('./routes/Student/salary');
>>>>>>> Stashed changes

app.use('/images', images);
app.use('/glassdoor/jobs', jobs);
<<<<<<< Updated upstream
app.use('/glassdoor/company/reviews',reviews);
app.use('/glassdoor/company/salary',salary);
=======
app.use('/student/interview', interviewRouter);
app.use('/company/reviews',reviewsRouter);
app.use('/company/salary',salaryRouter);

>>>>>>> Stashed changes

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
