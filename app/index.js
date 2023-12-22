// app.js
const express = require('express');
// const bodyParser = require('body-parser');
const db = require('./config/db');
const path = require('path');

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
const database = db.connectToMongoDB();

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require('../app/routes')(app, database);

module.exports = {
    app
}