const Recipe = require('../models/Recipe.model');

// Controller to create a new recipe
exports.createRecipe = async (req, res) => {
    try {
	    if (!req.user || !req.user.id) {
                    return res.status(401).json({
                            message: 'You are not authorized to perform this action'
                    });
            }

	    function filterKeys(object, allowedKeys) {
		    return Object.fromEntries(
			    Object.entries(object).filter(([key]) => allowedKeys.includes(key))
		    );
	    }
	    const allowedData = ['title', 'description', 'ingredients', 'steps'];
	    const filteredData = filterKeys(req.body, allowedData);
	    const recipe = new Recipe({...filteredData, author: req.user.id});

	    await recipe.save();
	    return res.status(201).json({
		    message: 'Recipe created successfuly'
	    });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.getAllRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find()
		.populate('author', 'username email')// Populate author details
		.sort({createdAt: -1});// Sort by creation date descending

		return res.status(200).json(recipes);// Return all recipes
	} catch (error) {
		res.status(500).json({message: 'Internal server error', error});
	}
};

exports.updateRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);

		if (!recipe) {
			return res.status(404).json({message: 'The recipe does not exist'});
		}
		if (recipe.author.toString() !== req.user.id) {
			return res.status(403).send('Access denied')
		}

		// Update fields if they are provided in the request body
		const fields = ["title", "description", "ingredients", "steps", "image"];
		for (const field of fields) {
			if (req.body[field]) {
				recipe[field] = req.body[field];
			}
		}

		if (req.body.newIngredient) {
			recipe.ingredients.push(req.body.newIngredient);
		}

		await recipe.save();
		return res.status(200).json({
			message: 'Recipe update performed successfully',
			recipe
		});

	} catch (error) {
                console.error(error);
                res.status(500).json({message: 'Internal server error', error});
	}
};

exports.getUserRecipes = async (req, res) => {
	try{
		const recipe = await Recipe.find({ author: req.user.id })
		.sort({createdAt: -1});
		return res.status(200).json(recipe);
	} catch (error) {
		res.status(500).json({message: 'Internal server error', error});
	}
};

exports.deleteRecipe = async (req, res) => {
        try {
                const recipe = await Recipe.findById(req.params.id);

                if (!recipe) {
                        return res.status(404).json({message: 'The recipe does not exist'});
                }

                if (recipe.author.toString() !== req.user.id) {
                        return res.status(403).send('Access denied')
                }

                await recipe.deleteOne();
                return res.status(200).json({
                        message: 'Recipe successfully deleted',
                });

        } catch (error) {
                console.error(error);
                res.status(500).json({message: 'Internal server error', error});
        }
}
