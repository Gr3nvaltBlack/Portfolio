const mongoose = require('mongoose');

// Define the Post schema
const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        maxlength: 50,
    },
    content: {
        type: String,
        required: true,
        maxlength: 500,
    },
    media: {
        type: String,
    },
    likers: {
        type: [String],
        required: true,
    },
    comments: {
        type: [commentsSchema],
        required: true,
    },
    createdAt: {
        types: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the Post model
module.exports = mongoose.model('Post', PostSchema);