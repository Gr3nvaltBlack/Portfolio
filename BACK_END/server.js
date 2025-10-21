const express = require('express');
const mongoose = require('mongoose');
const app = express(); // Create express app
const userRoutes = require('./routes/user.routes');

require('dotenv').config({path: './config/.env'});
require('./config/db'); // Import database configuration

app.use(express.json()); // Middleware to parse JSON
app.use('/api/users', userRoutes); // Use user routes

mongoose.connect(process.env.MONGO_URI, { // Connect to MongoDB
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.get('/test', (req, res) => {
  console.log('✅ Route /test atteinte');
  res.send('Server OK');
});

app.listen(process.env.PORT, () => { // Start the server
    console.log(`Server is running on port ${process.env.PORT}`);
})