const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

            /* =====ROUTE FOR POST===== */
// Route to Create a new comment for a post
router.post('/post/:postId/new-comment', commentController.createComment);
// Route to Update a comment for a post
router.patch('/post/:postId/Update-comment', commentController.updateComment);
// Route to Delete a comment for a post
router.delete('/post/:postId/delete-comment', commentController.deleteComment,);

            /* =====ROUTE FOR RECIPE===== */
// Route to Create a new comment for a recipe
router.post('/recipe/:recipeId/new-comment', commentController.createComment);
// Route to Update a comment for a recipe
router.patch('/recipe/:recipeId/Update-comment', commentController.updateComment);
// Route to Delete a comment for a recipe
router.delete('/recipe/:recipeId/delete-comment', commentController.deleteComment);
// Export the router
module.exports = router;