const express = require("express");
const router = express.Router();
const {
	allUsers,
	registerUser,
	logIn,
} = require("../controllers/userController");
const { validateRegister } = require("../middleware/validateRegister");
const { validateLogin } = require("../middleware/validateLogin");

router.route("/").get(allUsers);

router.route("/register").post(validateRegister, registerUser);

router.route("/login").post(validateLogin, logIn);

module.exports = router;
