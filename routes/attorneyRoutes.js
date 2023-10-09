const express = require('express');
const attorneyController = require('../controllers/attorneyController');
const router = express.Router();

router.get('/:attorneyID', attorneyController.getAttorney);
router.get('/', attorneyController.getAllAttorneys);
router.put('/:attorneyID', attorneyController.updateAttorney);
router.delete('/:attorneyID', attorneyController.deleteAttorney);

module.exports = router;
