const express = require("express");
const { getNote, getNotes, deleteNote, updateNote, createNote } = require("../controller/NoteController");
const router = express.Router();
const {protect} = require("../midlleware/AuthMiddleware.js")

router.get("/", protect,getNotes)
router.post("/", protect, createNote)
router.get("/:id", protect,getNote)
router.put("/:id", protect, updateNote)
router.delete("/:id",protect, deleteNote)

module.exports = router