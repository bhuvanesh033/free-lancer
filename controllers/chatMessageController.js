// controllers/chatMessageController.js
const ChatMessage = require('../models/ChatMessage');

const User = require('../models/User');

// Send a Chat Message
exports.sendChatMessage = async (req, res) => {
  const { conversationId, senderId, text } = req.body;

  try {
    const message = new ChatMessage({
      conversationId,
      senderId,
      text,
    });

    await message.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Messages for a Conversation
exports.getChatMessagesForConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await ChatMessage.find({ conversationId })
      .sort({ timestamp: 1 })
      .populate('senderId', 'name'); // Populate senderId with the user's name
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
