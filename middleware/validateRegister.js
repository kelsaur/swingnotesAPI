const User = require("../models/User");

exports.validateRegister = async (req, res, next) => {
	const { email, username, password } = req.body;

	if (!email || !username || !password) {
		return res.status(400).json({
			message: "You need to provide email, username and password!",
		});
	}

	try {
		const existingEmail = await User.findOne({ email });
		const existingUsername = await User.findOne({ username });

		if (existingEmail) {
			return res.status(400).json({ message: "Email already registered!" });
		}

		if (existingUsername) {
			return res.status(400).json({
				message: "Username already in use, pick another one!",
			});
		}
		next();
	} catch (error) {
		res.status(500).json({ message: "Server error!" });
	}
};
