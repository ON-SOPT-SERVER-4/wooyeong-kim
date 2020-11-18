const express = require("express");
const router = express.Router();
const postController = require("../../controller/postController");

// Create Post
router.post("/", postController.createPost);

// Read All Posts
router.get("/", postController.readAllPosts);

// Read Post
// router.get("/:id");

// Update Post
router.post("/:postId/like", postController.createLike);

// Delete Post
router.post("/:id");

module.exports = router;
