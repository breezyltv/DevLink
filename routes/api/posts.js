const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile model
const Post = require("../../model/Post");
const Profile = require("../../model/Profile");

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

// @route   GET api/posts
// @desc    get all posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.send(posts))
    .catch(err => res.status(404).send({ noPost: "There is no any post" }));
});

// @route   GET api/posts/:post_id
// @desc    get post by id
// @access  Public
router.get("/:post_id", (req, res) => {
  Post.findById({ _id: req.params.post_id })
    .then(posts => res.send(posts))
    .catch(err =>
      res.status(404).send({ noPost: "There is no post with that id" })
    );
});

// @route   DELETE api/posts/:post_id
// @desc    delete post by id
// @access  Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        Post.findById({ _id: req.params.post_id }).then(post => {
          //check if this is not owner
          if (post.user.toString() != req.user._id) {
            return res
              .status(401)
              .send({ notAuthorized: "user is unauthorized!" });
          }
          post.remove().then(() => res.send({ success: true }));
        });
      })
      .catch(err => res.status(404).send({ noPost: "No post to delete" }));
  }
);

// @route   POST api/like/:post_id
// @desc    like a post
// @access  Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        Post.findById({ _id: req.params.post_id }).then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user._id)
              .length > 0
          ) {
            return res
              .status(400)
              .send({ isLiked: "You are already liked this post !" });
          }
          post.likes.unshift({ user: req.user._id });
          post.save().then(post => res.send(post));
        });
      })
      .catch(err => res.status(404).send({ noPost: "No post found" }));
  }
);

// @route   POST api/unlike/:post_id
// @desc    unlike a post
// @access  Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        Post.findById({ _id: req.params.post_id }).then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user._id)
              .length === 0
          ) {
            return res
              .status(400)
              .send({ isLiked: "You have not liked this post yet !" });
          }
          //search for index of like
          const indexLike = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user._id);
          //remove that like
          post.likes.splice(indexLike, 1);

          post
            .save()
            .then(post => res.send(post))
            .catch(err => res.status(404).send(err));
        });
      })
      .catch(err => res.status(404).send({ noPost: "No post found" }));
  }
);

// @route   POST api/posts/comment/:post_id
// @desc    add comment into post
// @access  Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }
    Post.findById(req.params.post_id).then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user._id
      };
      post.comments.unshift(newComment);
      post.save().then(post => res.send(post));
    });
  }
);
// @route   DELETE api/posts/comment/:post_id
// @desc    delete comment int post
// @access  Private
router.delete(
  "/comment/:post_id/:cmt_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      if (
        post.comments.filter(cmt => cmt._id.toString() === req.params.cmt_id)
          .length === 0
      ) {
        return res.status(400).send({ deleteComment: "no comment exists !" });
      }
      //search for index of comment
      const indexCmt = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.cmt_id);
      //remove that like
      post.comments.splice(indexCmt, 1);

      post
        .save()
        .then(post => res.send(post))
        .catch(err => res.status(404).send(err));
    });
  }
);

module.exports = router;
