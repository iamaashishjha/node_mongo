const noteRoutes = require('./note_routes');
const noteCategoryRoutes = require('./note_category_routes');
// const express = require('express');
// const path = require('path');

// class IndexRoutes{
// }



module.exports = function (app, db) {

  noteRoutes(app, db);
  noteCategoryRoutes(app, db);
};