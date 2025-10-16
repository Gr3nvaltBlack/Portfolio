const express = require('express');
const port = 5000; // Define the port

const app = express(); // Create express app
app.use(express.json()); // Middleware to parse JSON

app.use('/user', require("./routes/userRoutes")); // User routes

app.listen(port, () => { // Start the server
    console.log('Server is running on port ' + port);
})