const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Auth Routes
router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
// Protected user Routes
router.get('/profile', authMiddleware, userController.getUser);
router.put('/profile/update', authMiddleware, userController.updateUser);
router.delete('/profile/delete', authMiddleware, userController.deleteUser);
router.get('/find', authMiddleware, userController.findByUsername);
router.post('/logout', authMiddleware, userController.userLogout);

module.exports = router;
