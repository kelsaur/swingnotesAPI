const Note = require("../models/Note");
const mongoose = require("mongoose");

exports.validateNoteId = async (req, res, next) => {
	const { noteId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(noteId)) {
		return res.status(400).json({
			success: false,
			message: `Invalid ID format: ${noteId}`,
		});
	}

	const note = await Note.findById(noteId);

	if (!note) {
		return res
			.status(404)
			.json({ message: `Note with id ${noteId} doesn't exist!` });
	}
	next();
};
