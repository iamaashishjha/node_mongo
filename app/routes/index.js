const noteRoutes = require('./note_routes');
const noteCategoryRoutes = require('./note_category_routes');

module.exports = function (app, db) {
  noteRoutes(app, db);
  noteCategoryRoutes(app, db);
};