const express = require("express");
const connectDB = require("../DB/config");
const cors = require("cors");

const profile = require("../routes/api/profile");
const users = require("../routes/api/users");
const posts = require("../routes/api/posts");

const bodyParser = require("body-parser");
const app = express();

app.use(
  cors({
    credentials: true
  })
);

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to mongoDB Allas
connectDB();

//app.get("/", (req, res) => res.send("hello node server..."));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
