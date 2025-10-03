const mongoose = require ('mongoose');

// Define the Recipe schema
const recipeSchema = new mongoose.Schema({
	title: { type: String, required: true, unique: false },
	ingredients: { type: [String], required: true, unique: false },
	steps: { type: [String], required: true, unique: false },
	photo: { type: String },
	createdAt: { type: Date, default: Date.now }
});

// Static method to find recipe by title
recipeShema.statics.findByTitle = function(title) {
	return this.findOne({ title });
};

module.exports = mongoose.model('Recipe', recipeSchema);
// Prochaine etape: lier User et Recipe avec userId dans Recipe