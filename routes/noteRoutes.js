const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const { validateUpdateNote } = require("../middleware/notesMiddleware");
const { validateNoteId } = require("../middleware/noteIdMiddleware");
const {
	validateNoteTitle,
} = require("../middleware/noteTitleSearchMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");

router
	.route("/")
	.get(verifyToken, noteController.getNotes)
	.post(verifyToken, noteController.addNote);

router
	.route("/:noteId")
	.put(
		verifyToken,
		validateNoteId,
		validateUpdateNote,
		noteController.updateNote
	)
	.delete(verifyToken, validateNoteId, noteController.deleteNote);

router
	.route("/search")
	.post(verifyToken, validateNoteTitle, noteController.searchNoteByTitle);

module.exports = router;
