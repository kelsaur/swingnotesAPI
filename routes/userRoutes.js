const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateRegister } = require("../middleware/validateRegister");
const { validateLogin } = require("../middleware/validateLogin");

router.route("/").get(userController.allUsers);

router.route("/register").post(validateRegister, userController.registerUser);

router.route("/login").post(validateLogin, userController.logIn);

module.exports = router;
