const authRoutes = require('./auth_routes');
const noteRoutes = require('./note_routes');
const noteCategoryRoutes = require('./note_category_routes');
const { auth } = require('../middleware/authenticated');

module.exports = function (app, db) {
  authRoutes(app, db, auth);
  noteRoutes(app, db, auth); // Pass the adminAuth middleware to noteRoutes
  noteCategoryRoutes(app, db, auth);
};