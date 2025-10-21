const mongoose = require("mongoose");

// Connect to MongoDB 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB Connected"))
.catch((err) => console.log("DB Connection Error: ", err));