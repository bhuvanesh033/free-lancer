// routes/chatMessageRoutes.js
const express = require('express');
const router = express.Router();
const chatMessageController = require('../controllers/chatMessageController');

// Send a Chat Message
router.post('/chat-message', chatMessageController.sendChatMessage);

// Get Messages for a Conversation
router.get('/chat-messages/:conversationId', chatMessageController.getChatMessagesForConversation);

module.exports = router;
