const mongoose = require('mongoose');
const Bid = require('../models/Bid');
const Job = require('../models/Job');

exports.createBid = async (req, res) => {
    const { amount, proposal } = req.body;
    const { jobId } = req.params; // Extract jobId from URL parameters

    try {
        // Validate jobId
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ msg: 'Invalid job ID' });
        }

        const bid = new Bid({
            jobId: new mongoose.Types.ObjectId(jobId), // Correctly create ObjectId instance
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
    const { jobId } = req.params;
    try {
        // Validate jobId
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ msg: 'Invalid job ID' });
        }

        const bids = await Bid.find({ jobId: new mongoose.Types.ObjectId(jobId) }) // Correctly create ObjectId instance
            .populate('freelancerId', 'name');
        res.json(bids);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getBidsByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('Logged-in user ID:', userId);

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);
        console.log('User ObjectId:', userObjectId);

        // Find bids where freelancerId matches userObjectId
        const bids = await Bid.find({ freelancerId: userObjectId }).populate('jobId', 'title');
        console.log('Bids found:', bids);

        if (!bids.length) {
            return res.status(404).json({ msg: 'No bids found for this user' });
        }

        // Extract job IDs from bids
        const jobIds = bids.map(bid => bid.jobId._id);
        console.log('Job IDs:', jobIds);

        // Optionally: Find jobs by job IDs if you need job details
        const jobs = await Job.find({ _id: { $in: jobIds } });
        console.log('Jobs found:', jobs);

        // Include job details with bids if needed
        res.json({ bids, jobs });
    } catch (err) {
        console.error('Error fetching bids by user ID:', err.message);
        res.status(500).send('Server error');
    }
};


