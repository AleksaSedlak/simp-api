const db = require("../config/db");

// Get all notes

const getAllNotes =
  ("/notes",
  async (req, res) => {
    const sql = "SELECT * FROM notes";
    const query = await db.execute(sql);

    try {
      console.log(query[0]);
      res.send(query[0]);
    } catch (error) {
      console.error(error);
    }
  });

// Add new note

const createNewNote =
  ("/notes",
  async (req, res) => {
    const sql = `INSERT INTO notes(note) VALUES ("${req.body.note}")`;
    const query = await db.execute(sql);
    try {
      res.send("New note created succesfully");
      console.log("New note created succesfully");
    } catch (error) {
      console.error(error);
    }
  });

// Delete note

const deleteNote = async (req, res) => {
  const sql = `DELETE FROM notes WHERE id=${req.params.id}`;
  const query = await db.execute(sql);
  try {
    console.log("Note deleted succesfully");
    res.send("Note deleted succesfully");
  } catch (error) {
    console.error(error);
  }
};

//Update note

const updateNote = async (req, res) => {
  const sql = `UPDATE notes SET note = "${req.body.note}" WHERE ID=${req.params.id}`;
  const query = await db.execute(sql);
  try {
    console.log("Note updated succesfully");
    res.send("Note updated succesfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createNewNote, getAllNotes, deleteNote, updateNote };
