const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
let id = 0;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get(`/notes`, function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get(`/api/notes`, function(req, res){
    let notes = JSON.parse(fs.readFileSync(__dirname + "/db/db.json", err => {
        if (err) throw err
    }));
    res.json(notes);
});

app.get(`*`, function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post(`/api/notes`, function(req, res){
    var dataBack = fs.readFileSync(path.join(__dirname, "/db/db.json"), err => {
        if (err) throw err;
    })
    var json = JSON.parse(dataBack);
    id++;
    req.body.id = id;
    json.push(req.body);
    product = JSON.stringify(json)
    fs.writeFileSync(path.join(__dirname, "/db/db.json"), product, err => {
        if (err) throw err;
    });
    res.end();
});

app.delete(`/api/notes/:id`, function(req, res){
    const dataBack = fs.readFileSync(path.join(__dirname, "/db/db.json"), err => {
        if (err) throw err;
    });
    let json = JSON.parse(dataBack);
    finalJson = JSON.stringify(json.filter(element => element.id != req.id));
    fs.writeFileSync(path.join(__dirname, "/db/db.json"), finalJson, err => {
        if (err) throw err;
    });
    res.end();
        
});


app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
});