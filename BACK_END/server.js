const express = require('express');
require('dotenv').config({path: './config/.env'});

// Initialize Express application
const app = express();

// Create routes for the user
app.use('/user', require('./routes/userRoutes'));

// App is listening on the specified PORT from environment variables
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});