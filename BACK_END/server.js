const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config({path: './config/.env'});


// Connect to MongoDB
connectDB();

    /* -----Initialize Express application----- */
const app = express();
// Allows Express to understand requests with a JSON-formatted body
app.use(express.json());
// Allows Express to read data submitted via forms
app.use(express.urlencoded({ extended: true }));


// Redirects all routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/post', require('./routes/post.routes'));
app.use('/api/comment', require('./controllers/comment.controller'));

// App is listening on the specified PORT from environment variables
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});