exports.validateAddNote = (req, res, next) => {
	const { title, text } = req.body;

	if (!title || !text) {
		return res
			.status(400)
			.json({ message: "Missing note title and/or content!" });
	}

	if (typeof title !== "string" || typeof text !== "string") {
		return res
			.status(400)
			.json({ message: "Title and/or content must be of type string" });
	}

	next();
};

exports.validateUpdateNote = (req, res, next) => {
	const { title, text } = req.body;

	if (
		(title && typeof title !== "string") ||
		(text && typeof text !== "string")
	) {
		return res
			.status(400)
			.json({ message: "Title and/or content must be of type string!" });
	}

	next();
};
