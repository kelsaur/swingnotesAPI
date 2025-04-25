const Note = require("../models/Note");

exports.validateNoteTitle = async (req, res, next) => {
	const { title } = req.body;

	if (!title) {
		return res
			.status(400)
			.json({ message: "You must write a title you want to search for!" });
	}

	try {
		const searchedNote = await Note.findOne({ title });

		if (!searchedNote) {
			return res.status(404).json({ message: "No such title exists!" });
		}

		req.note = searchedNote;

		next();
	} catch (error) {
		res.status(500).json({ message: "Server error!" });
	}
};
