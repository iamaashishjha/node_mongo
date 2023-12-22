// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const path = require('path');
const cookieParser = require("cookie-parser");
const database = db.connectToMongoDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
require('../app/routes')(app, database);

module.exports = {
    app
}