const express = require("express");
const router = express.Router();
const postController = require("../../controller/postController");
const upload = require("../../modules/multer");

// Create Post
router.post("/", upload.single("image"), postController.createPost);

// Read All Posts
router.get("/", postController.readAllPosts);

// Like or Unlike Post
router.post("/:postId/like", postController.toggleLike);

module.exports = router;
