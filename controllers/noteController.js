const Note = require("../models/Note");

//Get all notes
exports.getNotes = async (req, res, next) => {
	try {
		const notes = await Note.find();
		res.status(200).json(notes);
	} catch (error) {
		next(error);
	}
};

//Save a new note
exports.addNote = async (req, res, next) => {
	try {
		const newNote = new Note(req.body);

		//runValidators runs automatically on .save()!
		await newNote.save();
		res.status(201).json(newNote);
	} catch (error) {
		next(error);
	}
};

//Update a note
exports.updateNote = async (req, res, next) => {
	const { noteId } = req.params;

	try {
		const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json(updatedNote);
	} catch (error) {
		next(error);
	}
};

//Delete a note
exports.deleteNote = async (req, res, next) => {
	const { noteId } = req.params;

	try {
		const deletedNote = await Note.findByIdAndDelete(noteId);

		res.status(200).json({
			message: "Item deleted successfully!",
			note: deletedNote.title,
		});
	} catch (error) {
		next(error);
	}
};

//Search for a note by title
exports.searchNoteByTitle = async (req, res, next) => {
	try {
		const searchedNote = req.note; //from middleware

		res
			.status(200)
			.json({ title: searchedNote.title, content: searchedNote.text });
	} catch (error) {
		next(error);
	}
};
