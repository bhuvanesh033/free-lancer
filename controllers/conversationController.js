// controllers/conversationController.js
const Conversation = require('../models/Conversation');
const Job = require('../models/Job');
const User = require('../models/User');

// Create or Retrieve a Conversation
exports.createOrGetConversation = async (req, res) => {
  const { jobId, freelancerId, clientId } = req.body;

  try {
    let conversation = await Conversation.findOne({ jobId, freelancerId, clientId });
    if (!conversation) {
      conversation = new Conversation({
        jobId,
        freelancerId,
        clientId,
        participants: [freelancerId, clientId],
      });
      await conversation.save();
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Conversations for a User
// controllers/conversationController.js
// controllers/conversationController.js
exports.getConversationsForUser = async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      const conversations = await Conversation.find({
        $or: [{ clientId: userId }, { freelancerId: userId }]
      })
      .populate('jobId', 'title') // Populate job title
      .populate('freelancerId', 'name') // Populate freelancer's name
      .populate('clientId', 'name'); // Populate client's name
  
      const formattedConversations = conversations.map(conversation => ({
        jobTitle: conversation.jobId.title,
        participants: [
          {
            id: conversation.freelancerId._id,
            name: conversation.freelancerId.name
          },
          {
            id: conversation.clientId._id,
            name: conversation.clientId.name
          }
        ]
      }));
  
      res.status(200).json(formattedConversations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
