const express = require('express');
const connectDB = require('./config/db'); // Import database configuration
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
require('dotenv').config({path: './config/.env'});

const app = express(); // Create express app

// Added routes
app.use(express.json()); // Middleware to parse JSON
app.use('/api/post', postRoutes); // Post routes
app.use('/api/comment', commentRoutes); // Comment routes
app.use('/api/users', userRoutes); // Use user routes

connectDB(); // Connect to the database

app.listen(process.env.PORT, () => { // Start the server
    console.log(`Server is running on port ${process.env.PORT}`);
});