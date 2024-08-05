const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
    const { amount, freelancerId } = req.body;
    try {
        const payment = new Payment({
            jobId: req.params.jobId,
            clientId: req.user.id,
            freelancerId,
            amount
        });
        await payment.save();
        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPaymentStatusByJobId = async (req, res) => {
    try {
        const payment = await Payment.findOne({ jobId: req.params.jobId });
        if (!payment) return res.status(404).json({ msg: 'Payment not found' });
        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
