const mongoose = require("mongoose");
//mongoDB connect string
const conn =
  "mongodb+srv://dbAdmin:dbAdmin@cluster0.yonwt.mongodb.net/portfoliodb?retryWrites=true&w=majority";

const connectDB = async () => {
  console.log("connecting to mongoose db...");
  await mongoose
    .connect(conn, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => console.log("mongoDB connected!"))
    .catch(error => console.log("connect mongoDB error: ", error));
};

module.exports = connectDB;
