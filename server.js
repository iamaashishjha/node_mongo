// server.js
// const MongoClient = require('mongodb').MongoClient;
// const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const path = require('path');


// const multer = require('multer');
const app = express();
const port = 8000;


// Set up multer storage and upload configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
const uploadsDirectory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDirectory));


async function startServer() {
    try {
        const database = await db.connectToMongoDB();
        require('./app/routes')(app, database);
        app.listen(port, () => {
            console.log('Server JS : Server is running on port ' + port);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

startServer();