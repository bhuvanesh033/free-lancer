const Message = require('../models/Message');

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
