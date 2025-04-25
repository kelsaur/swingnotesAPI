const Note = require("../models/Note");

//Get all notes
exports.getNotes = async (req, res) => {
	try {
		const notes = await Note.find();
		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json({ error: error.message || "Server error" });
	}
};

//Save a new note
exports.saveNote = async (req, res) => {
	try {
		const newNote = new Note(req.body);

		await newNote.save();
		res.status(201).json(newNote);
	} catch (error) {
		res.status(400).json({ error: "Wrong request. Check res.body!" });
	}
};

//Update a note
exports.updateNote = async (req, res) => {
	const { noteId } = req.params;

	try {
		const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
			new: true,
		});

		res.status(200).json(updatedNote);
	} catch (error) {
		res.status(404).json({ error: "The note with this id doesn't exist!" });
	}
};

//Delete a note
exports.deleteNote = async (req, res) => {
	const { noteId } = req.params;

	try {
		const deletedNote = await Note.findByIdAndDelete(noteId);

		res.status(200).json({
			message: "Item deleted successfully!",
			note: deletedNote.title,
		});
	} catch (error) {
		res.status(400).json({ error: "Could not delete the note!" });
	}
};

//Search for a note by title
exports.searchNoteByTitle = async (req, res) => {
	try {
		const searchedNote = req.note; //from middleware

		res
			.status(200)
			.json({ title: searchedNote.title, content: searchedNote.text });
	} catch (error) {
		res.status(404).json({ error: "Note with this title does not exist!" });
	}
};
