const express = require('express');
const router = express.Router();
const { register, sendOtp, verifyOtp } = require('../controllers/authController');


router.post('/register', register);
router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);

module.exports = router;
