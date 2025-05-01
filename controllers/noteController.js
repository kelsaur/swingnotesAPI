const Note = require("../models/Note");

//req.note
//new... + .save() ---> .create()
//.findByIdAndUpdate() ---> .set() + .save()
//.findByIdAndDelete() ---> .removeOne()

//Get all notes
exports.getNotes = async (req, res, next) => {
	const user = req.currentUser; //user from payload token - verifyToken

	try {
		const notes = await Note.find({ user: user });
		res.status(200).json({ success: true, notes });
	} catch (error) {
		next(error);
	}
};

//Save a new note
exports.addNote = async (req, res, next) => {
	const user = req.currentUser;
	const { title, text } = req.body;

	try {
		const newNote = await Note.create({
			title: title,
			text: text,
			user: user,
		});

		res.status(201).json({ success: true, newNote });
	} catch (error) {
		next(error);
	}
};

//Update a note
exports.updateNote = async (req, res, next) => {
	try {
		const updateNote = req.note;

		updateNote.set(req.body); //from id check middleware; merge new values
		const updatedNote = await updateNote.save(); //runs validation since .save() is used

		res.status(200).json({ success: true, updatedNote });
	} catch (error) {
		next(error);
	}
};

//Delete a note
exports.deleteNote = async (req, res, next) => {
	try {
		const deletedNote = req.note;

		await deletedNote.deleteOne();

		res.status(200).json({
			success: true,
			message: "Item deleted successfully!",
			note: deletedNote.title,
		});
	} catch (error) {
		//console.error("DELETE ERROR: ", error);
		next(error);
	}
};

//Search for a note by title
exports.searchNoteByTitle = async (req, res, next) => {
	try {
		const searchedNote = req.note;

		res
			.status(200)
			.json({ title: searchedNote.title, content: searchedNote.text });
	} catch (error) {
		next(error);
	}
};
