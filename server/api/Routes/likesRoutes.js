const express = require("express")
const router = express.Router();
const likesController = require("../Controllers/likesController")
const {authMiddleWare} = require("../../Middleware/authMiddleWare.js");

// get post likes
router.get("/get-likes/:postId", likesController.getPostLikes);

// like a post
router.post("/like-post/:postId", authMiddleWare, likesController.likePost);

module.exports = router;