const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const upload = require('../middleware/multerStorage');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Alle User
router.post('/', upload.fields([
   { name: 'notePicture', maxCount: 1 },
   { name: 'ticketPicture', maxCount: 1 }
]), authenticate, authorize('user'), ticketController.createTicket);

// Alle Anwälte
router.get('/openTickets', authenticate, authorize('attorney'), ticketController.getOpenTickets);

// Ticketersteller
router.get('/users/me', authenticate, ticketController.getTicketsByUser);
router.put('/ticket/:ticketID', upload.fields([
   { name: 'notePicture', maxCount: 1 },
   { name: 'ticketPicture', maxCount: 1 }
]), authenticate, authorize('ticketOwner'), ticketController.updateTicket);
router.put('/ticket/:ticketID/status', authenticate, authorize('ticketOwner'), ticketController.updateTicketStatus);
router.delete('/:ticketID', authenticate, authorize('ticketOwner'), ticketController.deleteTicket);

// Ersteller und alle Anwälte
router.get('/ticket/:ticketID', authenticate, authorize('attorney', 'ticketOwner'), ticketController.getTicket);
router.get('/ticket/:ticketID/images', authenticate, authorize('attorney', 'ticketOwner'), ticketController.getTicketImage);

module.exports = router;
