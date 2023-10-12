const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Alle Anwälte
router.post('/submit', authenticate, authorize('attorney'), offerController.submitOffer);

// Ticketinhaber
router.get('/ticket/:ticketID', authenticate, authorize('ticketOwner'), offerController.getOffersByTicketId);
router.put('/offer/:offerID', authenticate, authorize('ticketOwner'), offerController.handleOffer);

// Angebotersteller
router.get('/attorney/me', authenticate, authorize('attorney'), offerController.getOffersByAttorney);
router.put('/offer/:offerID/update', authenticate, authorize('offerOwner'), offerController.updateOffer);
router.delete('/offer/:offerID', authenticate, authorize('offerOwner'), offerController.deleteOffer);

module.exports = router;
