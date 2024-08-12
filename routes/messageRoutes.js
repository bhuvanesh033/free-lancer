const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { sendMessage, getMessagesByJobId ,getMessagesByFreelancerId} = require('../controllers/messageController');

router.post('/:jobId', auth, sendMessage);
// router.get('/:jobId', getMessagesByJobId);
router.get('/freelancer', auth, getMessagesByFreelancerId);

module.exports = router;
