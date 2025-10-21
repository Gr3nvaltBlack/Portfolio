const mongoose = require("mongoose");
require('dotenv').config({path: '.env'});

// Connect to MongoDB 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected")
    } catch (error) {
        console.log("DB Connection Error: ", error);
    }
};

module.exports = connectDB;
