const express = require("express");
const router = express.Router();
const {
	getNotes,
	addNote,
	updateNote,
	deleteNote,
	searchNoteByTitle,
} = require("../controllers/noteController");
const { validateUpdateNote } = require("../middleware/notesMiddleware");
const { validateNoteId } = require("../middleware/noteIdMiddleware");
const {
	validateNoteTitle,
} = require("../middleware/noteTitleSearchMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");

router.route("/").get(verifyToken, getNotes).post(verifyToken, addNote);

router
	.route("/:noteId")
	.put(verifyToken, validateNoteId, validateUpdateNote, updateNote)
	.delete(verifyToken, validateNoteId, deleteNote);

router.post("/search", verifyToken, validateNoteTitle, searchNoteByTitle);

module.exports = router;
