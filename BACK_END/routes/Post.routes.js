const router = require('express').Router();
const postController = require('../controllers/Post.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

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

router.patch('/:id/like', postController.likePost); // Like a post
router.patch('/:id/unlike', postController.unlikePost); // Unlike a post

// Export the router
module.exports = router;