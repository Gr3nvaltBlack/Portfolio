require('dotenv').config({path: './config/.env'});
const express = require('express');
const connectDB = require('./config/db'); // Import database configuration
const userRoutes = require('./routes/User.routes');
const postRoutes = require('./routes/Post.routes');
const recipeRoutes = require('./routes/Recipe.routes');
const commentRoutes = require('./routes/Comment.routes');
const messageRoutes = require('./routes/Message.route');


const app = express(); // Create express app

// Added routes
app.use(express.json()); // Middleware to parse JSON
app.use('/api/post', postRoutes); // Post routes
app.use('/api/comment', commentRoutes); // Comment routes
app.use('/api/users', userRoutes); // Use user routes
app.use('/api/recipes', recipeRoutes); // Recipe routes
app.use('/api/messages', messageRoutes); // Message routes

connectDB(); // Connect to the database

app.listen(process.env.PORT, () => { // Start the server
    console.log(`Server is running on port ${process.env.PORT}`);
});