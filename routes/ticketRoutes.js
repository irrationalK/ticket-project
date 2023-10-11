const express = require('express');
const ticketController = require('../controllers/ticketController');
const upload = require('../middleware/multerStorage');
const authenticate = require('../controllers/authenticate');
const authorize = require('../middleware/authorize');
const authorizeTicketAccess = require('../middleware/authorizeTicketAccess');

const router = express.Router();

router.post('/', upload.fields([
   { name: 'notePicture', maxCount: 1 },
   { name: 'ticketPicture', maxCount: 1 }
]), authenticate, authorize('user'), ticketController.createTicket);   // Usergruppe

router.get('/users/me', authenticate, ticketController.getTicketsByUser);  // Ersteller
router.get('/:ticketID', authenticate, authorizeTicketAccess, ticketController.getTicket); // Ersteller und alle Anwälte
router.get('/open', authenticate, authorize('attorney'), ticketController.getOpenTickets); // Anwälte

router.put('/:ticketID', upload.fields([
   { name: 'notePicture', maxCount: 1 },
   { name: 'ticketPicture', maxCount: 1 }
]), authenticate, authorizeTicketAccess, ticketController.updateTicket);

router.delete('/:ticketID', authenticate, authorizeTicketAccess, ticketController.deleteTicket);   // Nur Ersteller

module.exports = router;
