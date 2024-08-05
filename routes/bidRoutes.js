const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createBid, getBidsByJobId } = require('../controllers/bidController');

router.post('/:jobId', auth, createBid);
router.get('/:jobId', getBidsByJobId);

module.exports = router;
