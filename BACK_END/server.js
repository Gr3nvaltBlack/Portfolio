const express = require('express');
const app = express(); // Create express app
const userRoutes = require('./routes/user.routes');
const connectDB = require('./config/db');
require('dotenv').config({path: './config/.env'});

require('dotenv').config({path: './config/.env'});
require('./config/db'); // Import database configuration

// Added routes
app.use('/api/post', require('./routes/post.routes')); // Post routes
app.use('/api/comment', require('./controllers/comment.controller')); // Comment routes
app.use(express.json()); // Middleware to parse JSON
app.use('/api/users', userRoutes); // Use user routes

connectDB(); // Connect to the database

app.listen(process.env.PORT, () => { // Start the server
    console.log(`Server is running on port ${process.env.PORT}`);
});
