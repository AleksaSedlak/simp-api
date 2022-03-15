const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aleksasedlak",
  database: "notesapp",
});

module.exports = db;
