const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Register as new user
exports.registerUser = async (req, res) => {
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

		res.status(201).json({ message: "User registered successfully!" });
	} catch (error) {
		res.status(500).json({ error: "Server error!" });
	}
};

//Log in
exports.logIn = async (req, res) => {
	const user = req.user;

	try {
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "5h",
		});

		res.status(200).json({ message: "Log in successful!", token: token });
	} catch (error) {
		res.status(500).json({ message: "Server error!" });
	}
};
