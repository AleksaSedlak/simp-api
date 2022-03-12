const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs");

app.use(express.json());

app.post("/notes", (req, res) => {
  const note = req.body;
  console.log(req.body);

  fs.readFile("./notes.json", (err, data) => {
    if (err) {
      throw err;
    }
    const json = JSON.parse(data);
    json.push(note);
    fs.writeFile("./notes.json", JSON.stringify(json), (err) => {
      if (err) {
        throw err;
      }
    });
    res.json({ message: "Note added sucesfully" });
  });
});

app.get("/notes", (req, res) => {
  fs.readFile("./notes.json", "utf-8", (err, jsonString) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
