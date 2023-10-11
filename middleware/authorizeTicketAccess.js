const ticketModel = require('../models/ticketModel');

async function authorizeTicketAccess(req, res, next) {
   try {
      const ticketID = req.params.ticketID;
      const ticket = await ticketModel.getTicketById(ticketID);

      if (!ticket) {
         return res.status(404).json({ message: 'Ticket not found' });
      }

      const isOwner = ticket.userID === req.user.id;
      const isAttorney = req.user.role === 'attorney';

      switch (req.method) {
         case 'GET':
            // Sowohl Eigentümer als auch Anwälte können Tickets abrufen
            if (isOwner || isAttorney) {
               return next();
            }
            break;
         case 'PUT':
         case 'DELETE':
            // Nur Eigentümer können Tickets aktualisieren/löschen
            if (isOwner) {
               return next();
            }
            break;
         default:
            return next();
      }

      res.status(403).json({ message: 'You do not have permission to access this ticket.' });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
}

module.exports = authorizeTicketAccess;
