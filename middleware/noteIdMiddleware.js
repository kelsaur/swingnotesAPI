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

	//note.user is ObjectId -> convert to string
	//userId from verifyToken
	//only owner of note can update/delete - needs same token
	if (note.user.toString() !== req.userId) {
		const error = new Error("This is not your note!");
		error.statusCode = 401;
		return next(error);
	}

	req.note = note; //store the found note for later use / attach to request object

	next();
};
