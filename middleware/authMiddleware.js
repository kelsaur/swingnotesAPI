const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		const error = new Error("You need to provide a token!");
		error.statusCode = 400;
		return next(error);
	}

	let token;

	if (authHeader && authHeader.startsWith("Bearer ")) {
		token = authHeader.slice(7);
	} else {
		const error = new Error("Authorization header format invalid!");
		error.statusCode = 400;
		return next(error);
	}

	try {
		//check if token is signed using the correct JWT key, has it expired?
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		//attach user's ID (from logIn controller) to the request
		req.currentUser = payload.userId;

		next();
	} catch (err) {
		const error = new Error("Invalid or expired token!");
		error.statusCode = 400;
		next(error);
	}
};
