const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// load user model
const User = require("../../model/User");
// load validation
const validateRegisterInput = require("../../validation/register_valid");
const validateLoginInput = require("../../validation/login_valid");

router.get("/info", (req, res) =>
  res.send({ name: "vu le", message: "i'm a software" })
);

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).send(errors);
  }

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
          //saving model to mongoDB
          newUser
            .save()
            .then(user => res.send(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login a user and return JSON Web Token
// @access  Public
router.post("/login", (req, res) => {
  const loginFailed =
    "The email and password you entered did not match our records!" +
    " Please double-check and try again.";
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).send(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //check user by email in model
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.loginFailed = loginFailed;
      return res.status(400).send(errors);
    }
    //check password if it's match
    bcrypt.compare(password, user.password).then(isMatched => {
      if (isMatched) {
        //res.send("Logged in successfully");
        const payload = {
          uid: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
          role: user.role
        };
        //sign a token for user
        jwt.sign(
          payload,
          keys.secretOrKey, // set secret key
          { expiresIn: keys.expiredTime }, //set expired time
          (err, token) => {
            if (err) throw err;
            //set token in cookie
            res.cookie("jwt", token, { httpOnly: true });
            //send signed token to client
            res.send({
              success: true,
              token: token,
              msg: "Logged in successfully"
            });
          }
        );
      } else {
        errors.loginFailed = loginFailed;
        return res.status(400).send(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/currentUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //check if token expired
    const currentTime = Date.now() / 1000;
    if (req.user.exp < currentTime) {
      //delete cookie to logout user
      res.clearCookie("jwt");
      res.send({
        msg: "The token of this login URL has expired!",
        isLoggedOut: true
      });
    } else {
      res.send({
        uid: req.user._id,
        role: req.user.role,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        avatar: req.user.avatar,
        exp: req.user.exp
      });
    }
  }
);

// @route   GET api/users/logout
// @desc    clear cookie to logout
// @access  Private
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //clear token to logout
    res.clearCookie("jwt");
    res.send({
      msg: "Token has been removed to logout successfully",
      isLoggedOut: true
    });
  }
);

module.exports = router;
