const AcceptedBid = require('../models/AcceptedBid');

exports.storeAcceptedBid = async (req, res) => {
    const { jobId, freelancerId, clientId, amount, jobDescription, date } = req.body;
    try {
        const acceptedBid = new AcceptedBid({
            jobId,
            freelancerId,
            clientId,
            amount,
            jobDescription,
            date
        });
        await acceptedBid.save();
        res.json(acceptedBid);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getAcceptedBidsForClient = async (req, res) => {
    try {
        // Fetch accepted bids where clientId matches the logged-in user's ID
        const acceptedBids = await AcceptedBid.find({ clientId: req.user.id })
            .populate('freelancerId', 'name')  // Populate freelancer details
            .populate('jobId', 'description'); // Populate job details

        if (!acceptedBids) return res.status(404).json({ msg: 'No accepted bids found' });
        res.json(acceptedBids);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};