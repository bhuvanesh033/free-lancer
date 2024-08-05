const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { sendMessage, getMessagesByJobId } = require('../controllers/messageController');

router.post('/:jobId', auth, sendMessage);
router.get('/:jobId', getMessagesByJobId);

module.exports = router;
