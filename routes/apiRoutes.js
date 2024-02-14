const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// GET /api/notes
router.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// POST /api/notes
router.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = generateUniqueId(notes); // Generate a unique ID for the new note
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, '../db.json'), JSON.stringify(notes), 'utf8', (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

// Function to generate unique ID
function generateUniqueId(notes) {
    let id;
    do {
        id = Math.floor(Math.random() * 1000000); // Generate a random ID
    } while (notes.some(note => note.id === id)); // Ensure the ID is unique
    return id;
}

module.exports = router;
