const ticketModel = require('../models/ticketModel');
const offerModel = require('../models/offerModel');

const authorize = (...allowed) => {
   const isAllowed = role => allowed.includes(role);

   return async (req, res, next) => {
      if (!req.user) {
         return res.status(403).json({ error: "Access forbidden. Invalid user." });
      }

      const { user } = req;
      if (isAllowed(user.role)) {
         return next();
      }

      try {
         if (allowed.includes('offerOwner') && await offerModel.isUserOfferOwner(user.id, req.params.offerID)) {
            return next();
         }

         if (allowed.includes('ticketOwner')) {
            let ticketID = req.params.ticketID;

            if (!ticketID) {
               ticketID = await offerModel.getTicketIdByOfferId(req.params.offerID);
            }

            if (await ticketModel.isUserTicketOwner(user.id, ticketID)) {
               return next();
            }
         }

      } catch (error) {
         return res.status(500).json({ error: error.message });
      }

      return res.status(403).json({ error: "Access forbidden. You don't have the right permissions." });
   }
};

module.exports = authorize;
