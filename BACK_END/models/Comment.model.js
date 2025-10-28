const mongoose = require('mongoose')

// Define the Comment schema
const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        default: '',
        maxlength: 700,
    },
    postId: {
        type: String,
        required: false,
    },
    recipeId: {
        type: String,
        required: false,
    },
},
{
    timestamps: true
}
)


// Export the comment model
module.exports = commentSchema;