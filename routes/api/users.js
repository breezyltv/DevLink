const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// load user model
const User = require("../../model/User");

router.get("/info", (req, res) =>
  res.send({ name: "vu le", message: "i'm a software" })
);

// @route   GET api/users/register
// @desc    Register a user
// @access  Public
router.post("/register", (req, res) => {
  //check if email is in database
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating,
        d: "mm" //default
      });
      //create new user model
      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        avatar: avatar
      });

      //encrypt password by using bcryptjs
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          //saving encrypted password to model
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.send(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
