const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
const auth = require('../middleware/auth');

// Create or Get a Conversation
router.post('/api/conversation', auth, conversationController.createOrGetConversation);

// Get Conversations for a User
router.get('/api/conversations/:userId', auth, conversationController.getConversationsForUser);

module.exports = router;
