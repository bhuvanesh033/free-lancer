const express = require('express');
const router = express.Router();
const { storeAcceptedBid ,getAcceptedBidsForClient} = require('../controllers/acceptedBidController');
const auth = require ('../middleware/auth');

router.post('/', storeAcceptedBid);
router.get('/client', auth, getAcceptedBidsForClient);
module.exports = router;
