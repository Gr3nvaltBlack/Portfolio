const mongoose = require('mongoose');
const commentSchema = require('./Comment.model')

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
    },
    comments: {
        type: [commentSchema],
    },
},
{
    timestamps: true
}
);

// Export the Post model
module.exports = mongoose.model('Post', PostSchema);