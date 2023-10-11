const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const upload = require('../middleware/multerStorage');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const authorizeTicketAccess = require('../middleware/authorizeTicketAccess');


router.post('/', upload.fields([
   { name: 'notePicture', maxCount: 1 },
   { name: 'ticketPicture', maxCount: 1 }
]), authenticate, authorize('user'), ticketController.createTicket);   // Usergruppe

router.get('/users/me', authenticate, ticketController.getTicketsByUser);  // Ersteller
router.get('/openTickets', authenticate, authorize('attorney'), ticketController.getOpenTickets); // Anwälte
router.get('/ticket/:ticketID', authenticate, authorizeTicketAccess, ticketController.getTicket); // Ersteller und alle Anwälte
router.get('/ticket/:ticketID/images', authenticate, authorizeTicketAccess, ticketController.getTicketImage);

router.put('/ticket/:ticketID', upload.fields([
   { name: 'notePicture', maxCount: 1 },
   { name: 'ticketPicture', maxCount: 1 }
]), authenticate, authorizeTicketAccess, ticketController.updateTicket); // Ersteller

router.delete('/:ticketID', authenticate, authorizeTicketAccess, ticketController.deleteTicket);   // Ersteller

module.exports = router;
