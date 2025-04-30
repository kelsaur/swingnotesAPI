const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		const error = new Error("You need to provide a token!");
		error.statusCode = 400;
		return next(error);
	}

	const token = authHeader.split(" ")[1];

	try {
		//check if token is signed using the correct JWT key, has it expired?
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		//attach user's ID (from logIn controller) to the request, so the notes controller knows who is making the request
		req.userId = decoded.userId;

		next();
	} catch (err) {
		const error = new Error("Invalid or expired token!");
		error.statusCode = 400;
		next(error);
	}
};
