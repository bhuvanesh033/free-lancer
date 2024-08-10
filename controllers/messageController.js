const Message = require('../models/Message');
const AcceptedBid = require('../models/AcceptedBid');
const mongoose = require('mongoose');
const Job = require('../models/Job');


exports.sendMessage = async (req, res) => {
    const { message, receiverId } = req.body;
    try {
        const newMessage = new Message({
            jobId: req.params.jobId,
            senderId: req.user.id,
            receiverId,
            message
        });
        await newMessage.save();
        res.json(newMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getMessagesByJobId = async (req, res) => {
    try {
        const messages = await Message.find({ jobId: req.params.jobId }).populate('senderId', 'name').populate('receiverId', 'name');
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getMessagesByFreelancerId = async (req, res) => {
    try {
        // Convert user ID to ObjectId
        const freelancerId = new mongoose.Types.ObjectId(req.user.id);
        console.log(freelancerId); // Optional: For debugging

        // Fetch messages and populate jobId and senderId fields
        const messages = await Message.find({ receiverId: freelancerId })
                                      .populate('jobId', 'description') // Populate job details (adjust fields as needed)
                                      .populate('senderId', 'name');    // Populate sender details (adjust fields as needed)

        res.json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err.message);
        res.status(500).send('Server error');
    }
};