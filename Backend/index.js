const app = require('./app');

const images = require('./routes/Student/images');
const jobs = require('./routes/Employer/jobs');
const reviews= require('./routes/Employer/reviews');
const salary= require('./routes/Employer/salary');

app.use('/images', images);
app.use('/glassdoor/jobs', jobs);
app.use('/glassdoor/company/reviews',reviews);
app.use('/glassdoor/company/salary',salary);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
