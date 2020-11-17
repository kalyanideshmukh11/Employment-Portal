const app = require('./app');

const images = require('./routes/Student/images')
const userRouter = require("./routes/Student/user");

app.use("/images", images)
app.use("/user", userRouter);

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