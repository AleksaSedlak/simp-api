const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "aleksasedlak",
  database: "notesapp",
});

module.exports = db.promise();
