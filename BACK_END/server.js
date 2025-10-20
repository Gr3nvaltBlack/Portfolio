const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config({path: './config/.env'});


// Connect to MongoDB
connectDB();

// Initialize Express application
const app = express();

// Redirects all routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/post', require('./routes/post.routes'));
app.use('/api/comment', require('./controllers/comment.controller'));

// App is listening on the specified PORT from environment variables
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});