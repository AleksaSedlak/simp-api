const fs = require("fs");
const { uuid } = require("uuidv4");

// Get all notes

const getAllNotes =
  ("/notes",
  async (req, res) => {
    try {
      const data = await fs.readFileSync("./notes.json");
      const json = JSON.parse(data);
      res.json(json);
    } catch (error) {
      console.error(error);
    }
  });

// Add new note

const createNewNote =
  ("/notes",
  async (req, res) => {
    const note = {
      id: uuid(),
      note: req.body.note,
    };

    const data = await fs.readFileSync("./notes.json");
    try {
      const json = JSON.parse(data);
      json.push(note);
      fs.writeFile("./notes.json", JSON.stringify(json, null, 2), (err) => {
        if (err) {
          throw err;
        }
      });
      res.json({ message: "Note added succesfully" });
    } catch (error) {
      console.error(error);
    }
  });

// Delete note

const deleteNote = async (req, res) => {
  const data = await fs.readFileSync("./notes.json");
  try {
    const json = JSON.parse(data);
    const note = json.find((item) => item.id === req.params.id);
    if (!note)
      return res.json(`Note with the ID ${req.params.id} doesn't exist`);
    const newArray = json.filter((item) => item.id !== req.params.id);
    fs.writeFile("./notes.json", JSON.stringify(newArray, 2, null), (err) => {
      if (err) {
        throw err;
      }
      res.json("Item deleted");
    });
  } catch (error) {
    console.error(error);
  }
};

//Update note

const updateNote = async (req, res) => {
  try {
    const data = await fs.readFileSync("./notes.json");
    const json = JSON.parse(data);
    const newNote = json.find((item) => item.id === req.params.id);
    if (!newNote)
      return res.json(`Note with the ID ${req.params.id} doesn't exist`);
    if (req.body.note) newNote.note = req.body.note;
    const Array = json.filter((item) => item.id !== req.params.id);
    const newArray = [...Array, newNote];
    fs.writeFile("./notes.json", JSON.stringify(newArray), (err) => {
      if (err) {
        throw err;
      }
      res.json(`Note with the id ${req.params.id} is successfuly updated`);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createNewNote, getAllNotes, deleteNote, updateNote };
