//type: string, required: true is already decided in noteSchema, this is obsolete?

// exports.validateAddNote = (req, res, next) => {
// 	const { title, text } = req.body;

// 	if (!title || !text) {
// 		const error = new Error("Missing note title and/or content!");
// 		error.statusCode = 400;
// 		return next(error);
// 	}

// 	if (typeof title !== "string" || typeof text !== "string") {
// 		const error = new Error("Title and/or content must be of type string!");
// 		error.statusCode = 400;
// 		return next(error);
// 	}

// 	next();
// };

exports.validateUpdateNote = (req, res, next) => {
	const { title, text } = req.body;

	if (title === undefined && text === undefined) {
		const error = new Error(
			"You must provide at least 'title' or 'text' to update."
		);
		error.statusCode = 400;
		return next(error);
	}

	if (
		(title !== undefined && typeof title !== "string") ||
		(text !== undefined && typeof text !== "string")
	) {
		const error = new Error("Title and/or text must be of type string!");
		error.statusCode = 400;
		return next(error);
	}

	next();
};
