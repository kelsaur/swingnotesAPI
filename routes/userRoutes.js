const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authController");

router.route("/auth");

router.route("/register").post(authControllers.registerUser);

router.route("/login").post(authControllers.logIn);

module.exports = router;
