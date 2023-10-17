const Note = require("../models/NoteModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(notes);
});

const getNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.status(200).json(note);
});

const createNote = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Body is not present !");
  }
  const createdNote = await Note.create({
    title: req.body.title,
    desc: req.body.desc,
    content: req.body.content,
    user: req.user.id,
  });
  res.status(201).json(createdNote);
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Note is not found!");
  }

  if (!req.user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: "true",
  });
  res.status(200).json(updatedNote);
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Note is not found!");
  }

  if (!req.user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  const deletedNote = await Note.findByIdAndRemove(req.params.id);
  res.status(200).json({ deletedId: deletedNote.id });
});

module.exports = {
  getNote,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
