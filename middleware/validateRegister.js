const User = require("../models/User");

exports.validateRegister = async (req, res, next) => {
	const { email, username } = req.body;

	try {
		const existingEmail = await User.findOne({ email });
		const existingUsername = await User.findOne({ username });

		if (existingEmail) {
			const error = new Error("Email already registered!");
			error.statusCode = 400;
			return next(error);
		}

		if (existingUsername) {
			const error = new Error("Username already in use, pick another one!");
			error.statusCode = 400;
			return next(error);
		}
		next();
	} catch (error) {
		error.statusCode = 500;
		next(error);

		//res.status(500).json({ message: "Server error!" });
	}
};
