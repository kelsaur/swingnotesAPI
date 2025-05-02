exports.errorHandler = (err, req, res, next) => {
	//mongoose validation error
	if (err.name === "ValidationError") {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}

	//status code error
	if (err.statusCode) {
		return res.status(err.statusCode).json({
			success: false,
			message: err.message,
		});
	}

	//server error
	res.status(500).json({
		success: false,
		message: "Server error!",
	});
};
