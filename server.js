const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(`/notes`, function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get(`/api/notes`, function(req, res){
    let notes = fs.readFile(path.join(__dirname, "/db/db.json"), err => {
        if (err) throw err
    });
    res.json(notes);
});

app.get(`*`, function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
});