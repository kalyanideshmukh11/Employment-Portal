const app = require('./app');

const images = require('./routes/Student/images');
const jobs = require('./routes/Employer/jobs');

app.use('/images', images);
app.use('/glassdoor/jobs', jobs);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
