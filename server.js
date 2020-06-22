// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Fixes MIME type error when attempting to load CSS 
app.use(express.static('public'))

// Routes
// =============================================================

// Basic route that sends the user to index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Basic route that sends the user to notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Basic route that sends the db.json file 
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Adds new post to db.json in the form of an object with key of "title" and "text"
// Needs to grab the db.json first, push to the array of objects, then send the edited db.json back
app.post("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        console.log(data); //Requested data that new object will be pushed to
    })
    console.log(req.body); //The new data to be pushed to db.json
    const newEntry = {
        title: req.body.title,
        text: req.body.text
    };
    req.push(newEntry);
    fs.writeFile(path.join(__dirname, "/db/db.json"), req, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});