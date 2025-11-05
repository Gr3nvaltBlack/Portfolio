const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/Recipe.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/create', authMiddleware, recipeController.createRecipe);
router.get('/all', recipeController.getAllRecipes);
router.get('/own', authMiddleware, recipeController.getUserRecipes);
router.put('/update/:id', authMiddleware, recipeController.updateRecipe);
router.delete('/delete/:id', authMiddleware, recipeController.deleteRecipe);

module.exports = router;