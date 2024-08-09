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

exports.getBidsByUserId = async (req, res) => {
    try {
        // Find all jobs created by the logged-in client
        const jobs = await Job.find({ clientId: req.user.id });

        // Extract the job IDs
        const jobIds = jobs.map(job => job._id);

        // Find bids for the jobs created by the client
        const bids = await Bid.find({ jobId: { $in: jobIds } }).populate('jobId', 'title');

        res.json(bids);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

