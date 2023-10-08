const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.post('/', userController.createUser);
router.get('/:userID', userController.getUser);
router.get('/', userController.getAllUsers);
router.put('/:userID', userController.updateUser);
router.delete('/:userID', userController.deleteUser);

module.exports = router;
