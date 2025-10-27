const express = require('express');
const app = express(); // Create express app
const userRoutes = require('./routes/user.routes');
const commentRoutes = require('./routes/comment.routes');
const postRoutes = require('./routes/post.routes');
const connectDB = require('./config/db');
require('dotenv').config({path: './config/.env'});

app.use(express.json()); // Middleware to parse JSON
require('./config/db'); // Import database configuration

// Added routes
app.use('/api/post', postRoutes); // Post routes
app.use('/api/comment', commentRoutes); // Comment routes
app.use('/api/users', userRoutes); // Use user routes

connectDB(); // Connect to the database

app.listen(process.env.PORT, () => { // Start the server
    console.log(`Server is running on port ${process.env.PORT}`);
});
