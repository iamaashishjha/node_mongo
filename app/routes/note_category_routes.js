
const NoteCategoryController = require('../controllers/note_category_controller');
module.exports = function (app, db) {
    app.get('/note-categories', (req, res) => NoteCategoryController.index(req, res, db));
    app.post('/note-categories', (req, res) => NoteCategoryController.store(req, res, db));
    app.get('/note-categories/:id', (req, res) => NoteCategoryController.show(req, res, db));
    app.put('/note-categories/:id', (req, res) => NoteCategoryController.update(req, res, db));
    app.delete('/note-categories/:id', (req, res) => NoteCategoryController.delete(req, res, db));
};