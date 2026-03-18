const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Auth Routes
router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.get('/jwtid', authMiddleware, userController.userJwtId);

// Protected user Routes
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile/update', authMiddleware, userController.updateProfileUser);
router.delete('/profile/delete', authMiddleware, userController.deleteUser);
router.get('/find', authMiddleware, userController.findByUsername);
router.post('/logout', authMiddleware, userController.userLogout);
router.patch('/follow/:id', authMiddleware, userController.followUser); // Follow a user
router.patch('/unfollow/:id', authMiddleware, userController.unfollowUser); // Unfollow a user
router.get('/:id', userController.getUser);

module.exports = router;
