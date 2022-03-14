const fs = require("fs");
const { uuid } = require("uuidv4");

// Get all notes

const getAllNotes =
  ("/notes",
  (req, res) => {
    fs.readFile("./notes.json", (err, jsonString) => {
      if (err) {
        throw err;
      } else {
        try {
          const data = JSON.parse(jsonString);
          res.json(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    });
  });

// Add new note

const createNewNote =
  ("/notes",
  (req, res) => {
    const note = {
      id: uuid(),
      note: req.body.note,
    };

    fs.readFile("./notes.json", (err, data) => {
      if (err) {
        throw err;
      }
      const json = JSON.parse(data);
      json.push(note);
      fs.writeFile("./notes.json", JSON.stringify(json, null, 2), (err) => {
        if (err) {
          throw err;
        }
      });
      res.json({ message: "Note added sucesfully" });
    });
  });

// Delete note

const deleteNote = (req, res) => {
  fs.readFile("./notes.json", (err, data) => {
    if (err) {
      throw err;
    } else {
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
    }
  });
};

//Update note

const updateNote = (req, res) => {
  fs.readFile("./notes.json", (err, data) => {
    if (err) {
      throw err;
    }
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
  });
};

module.exports = { createNewNote, getAllNotes, deleteNote, updateNote };
