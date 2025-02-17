// src/app.js

const express = require('express');
const bodyParser = require('body-parser');
const setAnonymizeRoutes = require('./routes/anonymizeRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set up routes
setAnonymizeRoutes(app);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});