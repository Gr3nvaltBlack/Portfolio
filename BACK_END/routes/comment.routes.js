const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

            /* =====ROUTE FOR POST===== */
// Route to Create a new comment for a post
router.post('/post/:postId/comments', commentController.createComment);
// Route to Update a comment for a post
router.patch('/post/:postId/comments/:commentId', commentController.updateComment);
// Route to Delete a comment for a post
router.delete('/post/:postId/comments/:commentId', commentController.deleteComment,);

            /* =====ROUTE FOR RECIPE===== */
// Route to Create a new comment for a recipe
router.post('/recipe/:recipeId/comments', commentController.createComment);
// Route to Update a comment for a recipe
router.patch('/recipe/:recipeId/comments/:commentId', commentController.updateComment);
// Route to Delete a comment for a recipe
router.delete('/recipe/:recipeId/comments/:commentId', commentController.deleteComment);

// Export the router
module.exports = router;