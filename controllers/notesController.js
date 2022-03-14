const fs = require("fs");
const { uuid } = require("uuidv4");

// Get all notes

const getAllNotes =
  ("/notes",
  (req, res) => {
    try {
      const data = fs.readFileSync("./notes.json");
      const json = JSON.parse(data);
      res.json(json);
    } catch (error) {
      console.error(error);
    }
  });

// Add new note

const createNewNote =
  ("/notes",
  (req, res) => {
    const note = {
      id: uuid(),
      note: req.body.note,
    };

    const data = fs.readFileSync("./notes.json");
    try {
      const json = JSON.parse(data);
      json.push(note);
      fs.writeFileSync("./notes.json", JSON.stringify(json, null, 2));
      try {
        res.json({ message: "Note added succesfully" });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  });

// Delete note

const deleteNote = (req, res) => {
  const data = fs.readFileSync("./notes.json");
  try {
    const json = JSON.parse(data);
    const note = json.find((item) => item.id === req.params.id);
    if (!note)
      return res.json(`Note with the ID ${req.params.id} doesn't exist`);
    const newArray = json.filter((item) => item.id !== req.params.id);
    fs.writeFileSync("./notes.json", JSON.stringify(newArray, 2, null));
    try {
      res.json("Note deleted succesfully");
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

//Update note

const updateNote = (req, res) => {
  try {
    const data = fs.readFileSync("./notes.json");
    const json = JSON.parse(data);
    const newNote = json.find((item) => item.id === req.params.id);
    if (!newNote)
      return res.json(`Note with the ID ${req.params.id} doesn't exist`);
    if (req.body.note) newNote.note = req.body.note;
    const Array = json.filter((item) => item.id !== req.params.id);
    const newArray = [...Array, newNote];
    fs.writeFileSync("./notes.json", JSON.stringify(newArray));
    try {
      res.json(`Note with the id ${req.params.id} is successfuly updated`);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createNewNote, getAllNotes, deleteNote, updateNote };
