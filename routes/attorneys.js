const express = require('express');
const attorneyController = require('../controllers/attorneyController');
const router = express.Router();

router.post('/', attorneyController.createAttorney);
router.get('/:id', attorneyController.getAttorney);
router.get('/', attorneyController.getAllAttorneys);
router.put('/:id', attorneyController.updateAttorney);
router.delete('/:id', attorneyController.deleteAttorney);

module.exports = router;
