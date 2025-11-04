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

exports.getRecipeByName = async (req, res) => {
	try {
		const { removeStopwords } = require('stopword')
		const userQuery = req.query.q;
		const lowerQuery = userQuery.toLowerCase();
		const words = lowerQuery.split(" ");
		const keywords = removeStopwords(words);

		const conditions = [];

		for (const word of keywords) {
			conditions.push({ title: { $regex: word, $options: "i" } });
			conditions.push({ description: { $regex: word, $options: "i" } });
			conditions.push({ ingredients: { $regex: word, $options: "i" } });
		}

		const listOfRecipes = await Recipe.find({ $or: conditions });

		if (listOfRecipes.length === 0) {
			return res.status(404).json({message: "No recipes found."});
		}
		return res.json(listOfRecipes);

	} catch (error) {
		console.error(error);
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

		const fields = ["title", "description", "ingredients", "steps", "image"];
		for (const field of fields) {
			if (req.body[field]) {
				recipe[field] = req.body[field];
			}
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
