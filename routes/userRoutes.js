const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');


router.get('/me', authenticate, authorize('user'), userController.getUser);
router.put('/me', authenticate, authorize('user'), userController.updateUser);
router.delete('/me', authenticate, authorize('user'), userController.deleteUser);

// router.get('/', authenticate, authorize('admin'), userController.getAllUsers);  // Nur für Admins

module.exports = router;
