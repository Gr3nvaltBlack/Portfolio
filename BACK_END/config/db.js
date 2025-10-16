const { default: mongoose } = require("mongoose");

// Connect to MongoDB 
mongoose.connect(process.env.MONGO_URI, {
    useNewParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB Connected"))
.catch((err) => console.log("DB Connection Error: ", err));