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
const validateExpInput = require("../../validation/experience_valid");
const validateEduInput = require("../../validation/education_valid");

// @route   GET api/profile/handle/:handle
// @desc    get current profile by handle
// @access  public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["first_name", "last_name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this handle";
        return res.status(404).send(errors);
      }
      res.send(profile);
    })
    .catch(err =>
      res.status(404).send({
        noProfile: "There is no profile for this handle"
      })
    );
});

// @route   GET api/profile/user/:uid
// @desc    get current profile by user id
// @access  public
router.get("/user/:uid", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.uid })
    .populate("user", ["first_name", "last_name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user id";
        return res.status(404).send(errors);
      }
      res.send(profile);
    })
    .catch(err =>
      res.status(404).send({
        noProfile: "There is no profile for this user id: " + req.params.uid
      })
    );
});

// @route   GET api/profile/all
// @desc    get all profiles
// @access  public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["first_name", "last_name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profiles";
        return res.status(404).send(errors);
      }
      res.send(profile);
    })
    .catch(err =>
      res.status(404).send({
        noProfile: "There is no profiles"
      })
    );
});

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
          errors.noProfile = "there is no profile for this user";
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

// @route   POST api/profile/experience
// @desc    add new profile experience
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExpInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }
    Profile.findOne({ user: req.user._id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //add into profile
      profile.experience.unshift(newExp);
      profile
        .save()
        .then(profile => res.send(profile))
        .catch(err => console.log(err));
    });
  }
);

// @route   POST api/profile/education
// @desc    add new profile education
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEduInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }
    Profile.findOne({ user: req.user._id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        major: req.body.major,
        degree: req.body.degree,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //add into profile
      profile.experience.unshift(newEdu);
      profile
        .save()
        .then(profile => res.send(profile))
        .catch(err => console.log(err));
    });
  }
);

// @route   POST api/profile/project
// @desc    add new profile education
// @access  Private
router.post(
  "/project",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateEduInput(req.body);
    // //check validation
    // if (!isValid) {
    //   return res.status(400).send(errors);
    // }
    Profile.findOne({ user: req.user._id }).then(profile => {
      const newProject = {
        title: req.body.title,
        github_link: req.body.github_link,
        description: req.body.description,
        demo_link: req.body.demo_link
      };
      //add into profile
      profile.experience.unshift(newProject);
      profile
        .save()
        .then(profile => res.send(profile))
        .catch(err => console.log(err));
    });
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    delete a education
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id }).then(profile => {
      //search for index of education
      const indexEdu = profile.education
        .map(item => item._id)
        .indexOf(req.params.edu_id);
      //remove that education
      profile.education.splice(indexEdu, 1);

      profile
        .save()
        .then(profile => res.send(profile))
        .catch(err => res.status(404).send(err));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    delete a experience
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id }).then(profile => {
      //search for index of experience
      const indexExp = profile.experience
        .map(item => item._id)
        .indexOf(req.params.edu_id);
      //remove that experience
      profile.experience.splice(indexExp, 1);

      profile
        .save()
        .then(profile => res.send(profile))
        .catch(err => res.status(404).send(err));
    });
  }
);

// @route   DELETE api/profile/
// @desc    delete a user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user._id }).then(() => {
      User.findOneAndRemove({ _id: req.user._id }).then(() =>
        res.send({ success: true })
      );
    });
  }
);

module.exports = router;
