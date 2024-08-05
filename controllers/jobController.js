const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    const { title, description, budget, deadline } = req.body;
    try {
        const job = new Job({
            clientId: req.user.id,
            title,
            description,
            budget,
            deadline
        });
        await job.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('clientId', 'name');
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('clientId', 'name');
        if (!job) return res.status(404).json({ msg: 'Job not found' });
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
