const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Register as new user
exports.registerUser = async (req, res, next) => {
	const { username, email, password } = req.body;
	const saltRounds = 10;

	try {
		//Hash password
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		//Save user
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			success: true,
			message: "User registered successfully!",
			newUser,
		});
	} catch (error) {
		next(error);
	}
};

//Log in
exports.logIn = async (req, res, next) => {
	const user = req.user;

	try {
		//create payload: saves user id in the token -> sign it with server pw
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "5h",
		});

		res.status(200).json({
			success: true,
			message: `Log in successful! Welcome ${user.username}`,
			token: token,
		});
	} catch (error) {
		console.error("Login error: ", error);
		next(error);
	}
};

//Get a list of all users
exports.allUsers = async (req, res, next) => {
	try {
		const users = await User.find();

		res.status(200).json({ success: true, users });
	} catch (error) {
		next(error);
	}
};
