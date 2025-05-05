const Note = require("../models/Note");

exports.validateNoteTitle = async (req, res, next) => {
	const { title } = req.body;

	if (!title) {
		const error = new Error("You must write a title you want to search for!");
		error.statusCode = 400;
		return next(error);
	}

	try {
		const searchedNote = await Note.findOne({ title });

		if (!searchedNote) {
			const error = new Error("No such title exists!");
			error.statusCode = 404;
			return next(error);
		}

		req.note = searchedNote;

		next();
	} catch (error) {
		error.statusCode = 500;
		next(error);

		//res.status(500).json({ message: "Server error!" });
	}
};
