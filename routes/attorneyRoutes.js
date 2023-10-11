const express = require('express');
const router = express.Router();
const attorneyController = require('../controllers/attorneyController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');


router.get('/me', authenticate, authorize('attorney'), attorneyController.getAttorney);
router.put('/me', authenticate, authorize('attorney'), attorneyController.updateAttorney);
router.delete('/me', authenticate, authorize('attorney'), attorneyController.deleteAttorney);

// router.get('/', authenticate, authorize('admin'), attorneyController.getAllAttorneys);  // Nur für Admins

module.exports = router;
