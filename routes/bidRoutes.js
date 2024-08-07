const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createBid, getBidsByJobId ,getBidsByUserId } = require('../controllers/bidController');

router.post('/:jobId', auth, createBid);
router.get('/:jobId', getBidsByJobId);
router.get('/user', auth, getBidsByUserId); 

module.exports = router;
