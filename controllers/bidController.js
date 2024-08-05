const Bid = require('../models/Bid');

exports.createBid = async (req, res) => {
    const { amount, proposal } = req.body;
    try {
        const bid = new Bid({
            jobId: req.params.jobId,
            freelancerId: req.user.id,
            amount,
            proposal
        });
        await bid.save();
        res.json(bid);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getBidsByJobId = async (req, res) => {
    try {
        const bids = await Bid.find({ jobId: req.params.jobId }).populate('freelancerId', 'name');
        res.json(bids);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
