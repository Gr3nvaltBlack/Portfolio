const mongoose = require('mongoose');

// Define the Recipe schema
const recipeSchema = new mongoose.Schema({
	title: { type: String, required: true },
	ingredients: { type: [String], required: true },
	steps: { type: [String], required: true },
	photo: { type: String },
	createdAt: { type: Date, default: Date.now },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Static method to find recipe by title
recipeSchema.statics.findByTitle = function(title) {
	return this.findOne({ title });
};

module.exports = mongoose.model('Recipe', recipeSchema);
// Prochaine etape: lier User et Recipe avec userId dans Recipe