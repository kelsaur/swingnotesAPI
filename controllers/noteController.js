const Note = require("../models/Note");

//Get all notes
exports.getNotes = async (req, res, next) => {
	try {
		const notes = await Note.find();
		res.status(200).json({ success: true, notes });
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
		res.status(201).json({ success: true, newNote });
	} catch (error) {
		next(error);
	}
};

//Update a note
exports.updateNote = async (req, res, next) => {
	try {
		req.note.set(req.body); //from id check middleware; merge new values
		const updatedNote = await req.note.save(); //runs validation since .save() is used

		// const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
		// 	new: true,
		// 	runValidators: true,
		// });

		res.status(200).json({ success: true, updatedNote });
	} catch (error) {
		next(error);
	}
};

//Delete a note
exports.deleteNote = async (req, res, next) => {
	//const { noteId } = req.params;

	try {
		console.log("req.note type:", req.note.constructor.name);

		await req.note.deleteOne();

		//const deletedNote = await Note.findByIdAndDelete(noteId);

		res.status(200).json({
			success: true,
			message: "Item deleted successfully!",
			note: req.note.title,
		});
	} catch (error) {
		console.error("DELETE ERROR: ", error);
		next(error);
	}
};

//Search for a note by title
exports.searchNoteByTitle = async (req, res, next) => {
	try {
		const searchedNote = req.note; //stored in middleware

		res
			.status(200)
			.json({ title: searchedNote.title, content: searchedNote.text });
	} catch (error) {
		next(error);
	}
};
