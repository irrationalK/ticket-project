const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Angebot erstellen - Zugriffrechte: Alle Anwälte
router.post('/', authenticate, authorize('attorney'), offerController.submitOffer);

// Angebote für ein bestimmtes Ticket abrufen
router.get('/tickets/:ticketID', authenticate, authorize('ticketOwner'), offerController.getOffersByTicketId);

// Alle Angebote eines Anwalts abrufen
router.get('/attorney/me', authenticate, authorize('attorney'), offerController.getOffersByAttorney);

// Angebot Annehmen/Ablehnen von Ticketbesitzer
router.put('/:offerID/handle', authenticate, authorize('ticketOwner'), offerController.handleOffer);

// Angebot aktuallieren oder löschen - Nur Angebotsersteller
router.put('/:offerID', authenticate, authorize('offerOwner'), offerController.updateOffer);
router.delete('/:offerID', authenticate, authorize('offerOwner'), offerController.deleteOffer);

module.exports = router;
