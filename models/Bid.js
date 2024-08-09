const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    proposal: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Bid', bidSchema);
