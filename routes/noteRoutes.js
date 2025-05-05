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

router.use(verifyToken);

router.route("/").get(getNotes).post(addNote);

router
	.route("/:noteId")
	.put(validateNoteId, validateUpdateNote, updateNote)
	.delete(validateNoteId, deleteNote);

router.post("/search", validateNoteTitle, searchNoteByTitle);

module.exports = router;
