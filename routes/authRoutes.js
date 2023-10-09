const express = require('express');
const { register, sendOtp, verifyOtp } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);

module.exports = router;
