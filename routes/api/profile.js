const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile model
const Profile = require("../../model/Profile");
// load user model
const User = require("../../model/User");

// load validation
const validateProfileInput = require("../../validation/profile_valid");

// @route   GET api/profile
// @desc    get current profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user._id })
      .populate("user", ["first_name", "last_name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "there is no profile for this user";
          return res.status(400).send(errors);
        }
        res.send(profile);
      })
      .catch(err => console.log(err));
  }
);

// @route   POST api/profile
// @desc    add new profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }

    const profileData = {};

    //save a current user id
    profileData.user = req.user._id;

    if (req.body.handle) profileData.handle = req.body.handle;
    if (req.body.company) profileData.company = req.body.company;
    if (req.body.website) profileData.website = req.body.website;
    if (req.body.location) profileData.location = req.body.location;
    if (req.body.bio) profileData.bio = req.body.bio;
    if (req.body.status) profileData.status = req.body.status;
    if (req.body.githubusername)
      profileData.githubusername = req.body.githubusername;

    //skills - split into an array
    if (typeof req.body.skills !== "undefined") {
      profileData.skills = req.body.skills.split(",");
    }

    //social
    profileData.social = {};
    if (req.body.youtube) profileData.social.youtube = req.body.youtube;
    if (req.body.twitter) profileData.social.twitter = req.body.twitter;
    if (req.body.facebook) profileData.social.facebook = req.body.facebook;
    if (req.body.instagram) profileData.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileData.social.linkedin = req.body.linkedin;

    //find profile by user id and add it
    Profile.findOne({ user: req.user._id }).then(profile => {
      if (profile) {
        //update profile
        Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: profileData },
          { returnOriginal: false, useFindAndModify: false }
        ).then(profile => {
          console.log("update profile successfully!");
          res.send(profile);
        });
      } else {
        //check if handle exist
        Profile.findOne({ handle: profileData.handle })
          .then(handle => {
            if (handle) {
              return res.send("this handle already exists");
            }
          })
          .catch(err => console.log(err));
        // add a new profile
        new Profile(profileData)
          .save()
          .then(profile => {
            console.log("add profile successfully");
            res.send(profile);
          })
          .catch(err => console.log(err));
      }
    });
  }
);

module.exports = router;
