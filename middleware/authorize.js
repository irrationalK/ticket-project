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
         console.log(await ticketModel.isUserTicketOwner(user.id, req.params.ticketID)) //TODO req.params.ticketID ändern, da nicht immer vorhanden
         if (allowed.includes('ticketOwner') && await ticketModel.isUserTicketOwner(user.id, req.params.ticketID)) {
            return next();
         }
      } catch (error) {
         return res.status(500).json({ error: error.message });
      }

      return res.status(403).json({ error: "Access forbidden. You don't have the right permissions." });
   }
};

module.exports = authorize;


// const authorize = (role) => {
//    return (req, res, next) => {
//       if (req.user && req.user.role === role) {
//          next();
//       } else {
//          res.status(403).json({ error: "Access forbidden." });
//       }
//    }
// };

// module.exports = authorize;
