
const NoteController = require('../controllers/note_controller');

// Add a new route for file uploads using multer
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function (app, db) {
    app.get('/notes', (req, res) => NoteController.index(req, res, db));
    app.post('/notes', upload.array('files'), (req, res) => NoteController.store(req, res, db));
    app.get('/notes/:id', (req, res) => NoteController.show(req, res, db));
    app.put('/notes/:id', (req, res) => NoteController.update(req, res, db));
    app.delete('/notes/:id', (req, res) => NoteController.delete(req, res, db));
};