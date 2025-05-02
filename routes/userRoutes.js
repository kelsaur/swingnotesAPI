const express = require("express");
const router = express.Router();
const {
	allUsers,
	registerUser,
	logIn,
} = require("../controllers/userController");
const { validateRegister } = require("../middleware/validateRegister");
const { validateLogin } = require("../middleware/validateLogin");

router.get("/", allUsers);

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, logIn);

module.exports = router;
