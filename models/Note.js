const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "The note must have a title"],
			maxlength: [50, `Title can't be more than 50 characters`],
		},
		text: {
			type: String,
			required: [true, "The note must have content"],
			maxlength: [300, `Content can't be more than 300 characters`],
		},
	},
	//adds two properties of type Date: createdAt & modifiedAt
	{ timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
