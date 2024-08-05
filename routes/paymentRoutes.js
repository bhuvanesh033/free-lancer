const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPayment, getPaymentStatusByJobId } = require('../controllers/paymentController');

router.post('/:jobId', auth, createPayment);
router.get('/:jobId', getPaymentStatusByJobId);

module.exports = router;
