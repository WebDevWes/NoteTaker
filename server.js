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
app.use(express.static('public'))  // https://expressjs.com/en/starter/static-files.html

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
    res.sendFile(path.join(__dirname + "/db/", "db.json"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});