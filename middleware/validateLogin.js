const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.validateLogin = async (req, res, next) => {
	const { username, email, password } = req.body;

	if ((!username && !email) || !password) {
		const error = new Error(
			"You need to provide username or email and/or password!"
		);
		error.statusCode = 400;
		return next(error);
	}

	try {
		//is username provided ? if yes -> look for username, if no -> look for email
		const logInUser = username ? { username } : { email };
		const user = await User.findOne(logInUser);

		if (!user) {
			const error = new Error("Invalid username or email!");
			error.statusCode = 400;
			return next(error);
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			const error = new Error("Invalid password!");
			error.statusCode = 400;
			return next(error);
		}

		req.user = user;

		next();
	} catch (error) {
		//console.error("Login error: ", error);
		error.statusCode = 500;
		next(error);

		//res.status(500).json({ message: "Server error!" });
	}
};
