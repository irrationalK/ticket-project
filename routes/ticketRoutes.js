const express = require('express');
const ticketController = require('../controllers/ticketController');
const authenticate = require('../controllers/authenticate');
const authorize = require('../middleware/authorize');
const authorizeTicketAccess = require('../middleware/authorizeTicketAccess');

const router = express.Router();

router.post('/', authenticate, authorize('user'), ticketController.createTicket);
router.get('/:ticketID', authenticate, authorizeTicketAccess, ticketController.getTicket);
router.get('/users/me', authenticate, ticketController.getTicketsByUser);


// router.get('/:ticketID', ticketController.getTicket);
// router.get('/users/:userID', ticketController.getTicketsByUser);
router.get('/open', ticketController.getOpenTickets);
router.put('/:ticketID', ticketController.updateTicket);
router.delete('/:ticketID', ticketController.deleteTicket);

module.exports = router;
