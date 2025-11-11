const mongoose = require('mongoose')

// Define the Comment schema
const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, default: '', maxlength: 700 },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false },
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: false },
},
{ timestamps: true }
);

// Export the comment model
module.exports = mongoose.model('Comment', commentSchema);