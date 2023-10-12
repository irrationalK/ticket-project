const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const upload = require('../middleware/multerStorage');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Erstellung eines Tickets - Alle User
router.post('/', upload.fields([
   { name: 'notePicture', maxCount: 1 },
   { name: 'ticketPicture', maxCount: 1 }
]), authenticate, authorize('user'), ticketController.createTicket);

//  Abruf offener Tickets für Anwälte
router.get('/open', authenticate, authorize('attorney'), ticketController.getOpenTickets);

// Zugriffsrechte: Ticketersteller
// Abruf von Tickets eines Benutzers
router.get('/user', authenticate, ticketController.getTicketsByUser);

// Aktualisieren eines Tickets
router.put('/:ticketID', upload.fields([
   { name: 'notePicture', maxCount: 1 },
   { name: 'ticketPicture', maxCount: 1 }
]), authenticate, authorize('ticketOwner'), ticketController.updateTicket);

// Aktualisieren des Status eines Tickets
router.put('/:ticketID/status', authenticate, authorize('ticketOwner'), ticketController.updateTicketStatus);
router.delete('/:ticketID', authenticate, authorize('ticketOwner'), ticketController.deleteTicket);


// Zugriffsrechte: Ersteller und alle Anwälte
router.get('/:ticketID', authenticate, authorize('attorney', 'ticketOwner'), ticketController.getTicket);
// URL der Bilder eines bestimmten Tickets abrufen
router.get('/:ticketID/images', authenticate, authorize('attorney', 'ticketOwner'), ticketController.getTicketImage);

module.exports = router;
