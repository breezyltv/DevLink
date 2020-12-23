const express = require("express");
const router = express.Router();

router.get("/info", (req, res) =>
  res.send({ page: "profile", message: "i'm a software" })
);

module.exports = router;
