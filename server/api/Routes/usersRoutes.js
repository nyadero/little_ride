const express = require("express");
const router = express.Router();
const userController = require("../Controllers/usersControllers");
const {authMiddleWare} = require("../../Middleware/authMiddleWare.js");

// register user route
router.post("/register", userController.registerUser);

// login user 
router.post("/login", userController.loginUser);

// create a profile
router.post("/profile", authMiddleWare, userController.createProfile);

// get a profile
router.get("/profile/get-profile/:UserId", userController.getProfile)

module.exports = router;