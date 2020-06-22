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

// Create New Characters - takes in JSON input
app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;

    // Using a RegEx Pattern to remove spaces from newCustomer
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.customerName.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);
    if (customers.length < 5) {
        customers.push(newReservation)
        newReservation.type = "Reservation"
    }
    else {
        waitlist.push(newReservation);
        newReservation.type = "Waitlist"
    }
    res.json(newReservation);

});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});