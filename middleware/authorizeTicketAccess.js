const ticketModel = require('../models/ticketModel');

async function authorizeTicketAccess(req, res, next) {
   try {
      const ticketID = req.params.ticketID;
      const ticket = await ticketModel.getTicketById(ticketID);

      if (!ticket) {
         return res.status(404).json({ message: 'Ticket not found' });
      }

      // Wenn der authentifizierte Benutzer der Ticket-Ersteller ist
      if (ticket.userID === req.user.id) {
         return next();
      }

      // Wenn der authentifizierte Benutzer ein "Attorney" ist
      if (req.user.role === 'attorney') {
         return next();
      }

      // Zugriff verweigert für alle anderen
      res.status(403).json({ message: 'You do not have permission to access this ticket.' });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
}

module.exports = authorizeTicketAccess;
