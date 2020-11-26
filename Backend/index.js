const app = require("./app");

const images = require("./routes/Student/images");
const studentRouter = require("./routes/Student/student");
const companyRouter = require("./routes/Employer/company");
const jobs = require("./routes/Employer/jobs");

app.use("/images", images);
app.use("/student", studentRouter);
app.use("/company", companyRouter);
app.use("/glassdoor/jobs", jobs);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;

const db = require("./models");
// TODO: Remove force: true and change to sync() in production
// force: true drops table and resyncs db
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});
