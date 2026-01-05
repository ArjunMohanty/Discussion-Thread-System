const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

router.post("/", async (req, res) => {
  const comment = await Comment.create(req.body);
  res.json(comment);
});

router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId });
  res.json(comments);
});

module.exports = router;
