const express = require("express");
const app = express();
const db = require("./config/db");

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
  // db.query("CREATE DATABASE notesapp", (err, res) => {
  //   if (err) throw err;
  //   console.log("Database created");
  // });
});
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/notes", require("./routers/notesRouter"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
