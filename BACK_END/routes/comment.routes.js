const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

// Route to Create a new comment
router.post('/', commentController.createComment);
// Route to Update a comment
router.put('/:id', commentController.updateComment);
// Route to Delete a comment
router.delete('/:id', commentController.deleteComment,);

// Export the router
module.exports = router;