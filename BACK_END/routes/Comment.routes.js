const router = require('express').Router();
const commentController = require('../controllers/Comment.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

// Route to create, update and delete a comment for a post
router.post('/post/:postId/comments', commentController.createComment);
router.put('/post/comments/:id', commentController.updateComment);
router.delete('/post/comments/:id', commentController.deleteComment,);

// Route to create, update and delete a comment for a recipe
router.post('/recipe/:recipeId/comments', commentController.createComment);
router.put('/recipe/comments/:id', commentController.updateComment);
router.delete('/recipe/comments/:id', commentController.deleteComment);

module.exports = router;