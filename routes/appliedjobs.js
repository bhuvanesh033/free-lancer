const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {  getBidsByUserId } = require('../controllers/bidController');

 
router.get('/user', auth, getBidsByUserId); 

module.exports = router;
