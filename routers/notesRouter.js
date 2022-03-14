const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  createNewNote,
  deleteNote,
  updateNote,
} = require("../controllers/notesController");

router.route("/").get(getAllNotes).post(createNewNote);
router.route("/:id").delete(deleteNote).put(updateNote);

module.exports = router;
