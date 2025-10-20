const router = require('express').Router();
const postController = require('../controllers/post.controller');

// Route to Create a new post
router.post('/', postController.createPost);
// Route to Get all posts
router.get('/', postController.getAllPosts);
// Route to Get a single post by ID
router.get('/:id', postController.getPostById);
// Route to Update a post
router.put('/:id', postController.updatePost);
// Route to Delete a post
router.delete('/:id', postController.deletePost);

// Route to like a post
router.patch('/like-post/:id', postController.likePost);
// Route to unlike a post
router.patch('/unlike-post/:id', postController.unlikePost);

// Export the router
module.exports = router;