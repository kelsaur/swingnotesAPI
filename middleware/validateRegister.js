const User = require("../models/User");

exports.validateRegister = async (req, res, next) => {
	const { email, username, password } = req.body;

	if (!email || !username || !password) {
		const error = new Error(
			"You need to provide email, username and password!"
		);
		error.statusCode = 400;
		return next(error);

		return res.status(400).json({
			message: "You need to provide email, username and password!",
		});
	}

	try {
		const existingEmail = await User.findOne({ email });
		const existingUsername = await User.findOne({ username });

		if (existingEmail) {
			const error = new Error("Email already registered!");
			error.statusCode = 400;
			return next(error);

			return res.status(400).json({ message: "Email already registered!" });
		}

		if (existingUsername) {
			const error = new Error("Username already in use, pick another one!");
			error.statusCode = 400;
			return next(error);

			return res.status(400).json({
				message: "Username already in use, pick another one!",
			});
		}
		next();
	} catch (error) {
		error.statusCode = 500;
		next(error);

		//res.status(500).json({ message: "Server error!" });
	}
};
