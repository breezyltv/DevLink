const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile model
const Post = require("../../model/Post");
// load user model
const User = require("../../model/User");

const validatePostInput = require("../../validation/post_valid");

// @route   POST api/posts
// @desc    add post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user._id
    });
    newPost.save().then(post => res.send(post));
  }
);

module.exports = router;
