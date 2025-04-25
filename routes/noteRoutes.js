const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const {
	validateAddNote,
	validateUpdateNote,
} = require("../middleware/notesMiddleware");
const { validateNoteId } = require("../middleware/noteIdMiddleware");
const {
	validateNoteTitle,
} = require("../middleware/noteTitleSearchMiddleware");

router
	.route("/")
	.get(noteController.getNotes)
	.post(validateAddNote, noteController.saveNote);

router
	.route("/:noteId")
	.put(validateNoteId, validateUpdateNote, noteController.updateNote)
	.delete(validateNoteId, noteController.deleteNote);

router
	.route("/search")
	.post(validateNoteTitle, noteController.searchNoteByTitle);

module.exports = router;
