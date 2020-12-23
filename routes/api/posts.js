const express = require("express");
const router = express.Router();

router.get("/info", (req, res) =>
  res.send({ page: "posts", message: "this is post page" })
);

module.exports = router;
