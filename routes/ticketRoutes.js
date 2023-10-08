const express = require('express');
const ticketController = require('../controllers/ticketController');
const router = express.Router();

router.post('/', ticketController.createTicket);
router.get('/:ticketID', ticketController.getTicket);
router.get('/users/:userID', ticketController.getTicketsByUser);
router.get('/open', ticketController.getOpenTickets);
router.put('/:ticketID', ticketController.updateTicket);
router.delete('/:ticketID', ticketController.deleteTicket);

module.exports = router;
