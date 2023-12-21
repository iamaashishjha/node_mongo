const mongoose = require('mongoose');

// Define the schema for the 'notes' collection
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NoteCategory', // Reference to the 'note_categories' collection
        required: true,
    },
    image_paths: {
        type: [String], // Array of image paths
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Create the 'Note' model based on the schema
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
