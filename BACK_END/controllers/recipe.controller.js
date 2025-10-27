const recipeModel = require('./models/Recipe.model');

// Controller to create a new recipe
exports.createRecipe = async (req, res) => {
    try {
	    const recipe = new Recipe({req.body});

    }
}
