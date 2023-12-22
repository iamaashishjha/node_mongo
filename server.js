// server.js

const { app } = require('./app/index'); // Destructuring to get the app property
const port = 8000;
const path = require('path');
const express = require('express');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function startServer() {
    try {
        app.listen(port, () => {
            console.log('Server JS : Server is running on port ' + port);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

startServer();