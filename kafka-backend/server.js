var connection = new require("./kafka/connection");

// topic files
var companyProfileTopic = require("./services/companyProfile_topic");
var reviewTopic = require("./services/review_topic");

const mongoose = require("mongoose");
const { mongoDBURI } = require("./config/config");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 1,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDBURI, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    switch (topic_name) {
      case "companyProfile_topic":
        fname.companyProfileService(data.data, function (err, res) {
          response(data, res, producer);
          return;
        });
        break;
      case "review_topic":
        fname.reviewService(data.data, function (err, res) {
          response(data, res, producer);
          return;
        });
        break;
    }
  });
}

function response(data, res, producer) {
  console.log("after handle", res);
  var payloads = [
    {
      topic: data.replyTo,
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res,
      }),
      partition: 0,
    },
  ];
  producer.send(payloads, function (err, data) {
    console.log("producer send");
  });
  return;
}

// Add your TOPICS here
// first argument is topic name
// second argument is a function that will handle this topic request

handleTopicRequest("companyProfile_topic", companyProfileTopic);
handleTopicRequest("review_topic", reviewTopic);
