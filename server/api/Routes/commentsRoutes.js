const express = require("express")
const router = express.Router()
const commentsController = require("../Controllers/commentsController")
const {authMiddleWare} = require("../../Middleware/authMiddleWare.js");

// add a comment
router.post("/add-comment", authMiddleWare, commentsController.addComment);

// get all comments
router.get("/get-comments/:postId", commentsController.getComments)


module.exports = router;