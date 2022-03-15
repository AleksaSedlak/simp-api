const db = require("../config/db");

// Get all notes

const getAllNotes =
  ("/notes",
  (req, res) => {
    const sql = "SELECT * FROM notes";
    const query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });

// Add new note

const createNewNote =
  ("/notes",
  (req, res) => {
    const note = req.body.note;
    const sql = "INSERT INTO notes(note) VALUES (?)";
    const query = db.query(sql, note, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Note created succesful");
    });
  });

// Delete note

const deleteNote = (req, res) => {
  const note = req.params.id;
  const sql = "DELETE FROM notes WHERE id=?";
  const query = db.query(sql, note, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Note deleted succesfully");
  });
};

//Update note

const updateNote = (req, res) => {
  const sql = `UPDATE notes SET note = "${req.body.note}" WHERE ID=${req.params.id}`;
  const query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Note updated succesfully");
  });
};

module.exports = { createNewNote, getAllNotes, deleteNote, updateNote };
