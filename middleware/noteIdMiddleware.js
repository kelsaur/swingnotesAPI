const Note = require("../models/Note");
const mongoose = require("mongoose");

exports.validateNoteId = async (req, res, next) => {
	const { noteId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(noteId)) {
		const error = new Error(`Invalid ID format: ${noteId}`);
		error.statusCode = 400;
		return next(error);
	}

	const note = await Note.findById(noteId);

	if (!note) {
		const error = new Error(`Note with id ${noteId} doesn't exist!`);
		error.statusCode = 404;
		return next(error);
	}

	req.note = note; //store the found note for later use / attach to request object

	next();
};
