const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.validateLogin = async (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "You need to provide username and/or password!" });
	}

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(400).json({ message: "Invalid username!" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Invalid password!" });
		}

		req.user = user;

		next();
	} catch (error) {
		res.status(500).json({ message: "Server error!" });
	}
};
