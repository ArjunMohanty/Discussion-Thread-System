const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.post("/", async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});


router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});


router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

router.delete("/:id", async (req, res) => {
  console.log("Deleting post:", req.params.id); 
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});

module.exports = router;
