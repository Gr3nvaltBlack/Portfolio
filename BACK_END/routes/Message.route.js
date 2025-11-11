const express = require('express');
const router = express.Router();
const messageController = require('../controllers/Message.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send/:receiverId', authMiddleware, messageController.sendMessage);
router.get('/:otherUserId', authMiddleware, messageController.getConversation);
router.delete('/delete/:id', authMiddleware, messageController.deleteMessage);

module.exports = router;