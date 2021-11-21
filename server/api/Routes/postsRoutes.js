const express = require("express");
const router = express.Router();
const postController = require("../Controllers/postsController");
const {authMiddleWare} = require("../../Middleware/authMiddleWare.js");

// create a post route
router.post("/create-post", authMiddleWare, postController.createPost);

// get all posts routes 
router.get("/get-posts", postController.getPosts);

module.exports = router;