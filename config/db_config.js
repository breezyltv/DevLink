const mongoose = require("mongoose");
const keys = require("./keys");

const connectDB = async () => {
  console.log("connecting to mongoose db...");
  await mongoose
    .connect(keys.mongoURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => console.log("mongoDB connected!"))
    .catch(error => console.log("connect mongoDB error: ", error));
};

module.exports = connectDB;
