const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    const { rating, review, freelancerId } = req.body;
    try {
        const newReview = new Review({
            jobId: req.params.jobId,
            clientId: req.user.id,
            freelancerId,
            rating,
            review
        });
        await newReview.save();
        res.json(newReview);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
