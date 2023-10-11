const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');


router.post('/submit', authenticate, authorize('attorney'), offerController.submitOffer); // Anwälte

router.get('/ticket/:ticketID', authenticate, authorize('ticketOwner'), offerController.getOffersByTicketId); // Ticketinhaber
router.put('/offer/:offerID/accept', authenticate, authorize('ticketOwner'), offerController.acceptOffer); // Ticketinhaber
router.put('/offer/:offerID/reject', authenticate, authorize('ticketOwner'), offerController.rejectOffer); // Ticketinhaber

router.put('/offer/:offerID', authenticate, authorize('offerOwner'), offerController.updateOffer); // Angebotersteller
router.delete('/offer/:offerID', authenticate, authorize('offerOwner'), offerController.deleteOffer); // Angebotersteller

module.exports = router;
