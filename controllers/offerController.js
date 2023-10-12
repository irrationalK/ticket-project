const offerModel = require('../models/offerModel');

const offerController = {
   async submitOffer(req, res) {
      try {
         const { ticketID, attorneyID, price, description } = req.body;
         const offerId = await offerModel.submitOffer(ticketID, attorneyID, price, description);
         res.status(201).json({ message: 'Offer submitted successfully', offerId: offerId });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async updateOffer(req, res) {
      try {
         console.log(req.body);
         const { offerID } = req.params;
         const { price, description } = req.body;
         await offerModel.updateOffer(offerID, price, description);
         res.status(200).json({ message: 'Offer updated successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async getOffersByTicketId(req, res) {
      try {
         const { ticketID } = req.params;
         const offers = await offerModel.getOffersByTicketId(ticketID);
         res.status(200).json(offers);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async getOffersByAttorney(req, res) {
      try {
         const attorneyID = req.user.id;
         const offers = await offerModel.getOffersByAttorneyId(attorneyID);
         res.status(200).json(offers);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async handleOffer(req, res) {
      try {
         const { offerID } = req.params;
         const { action } = req.body; // 'accept' oder 'reject'

         if (action === 'accept') {
            await offerModel.acceptOffer(offerID);
            res.status(200).json({ message: 'Offer accepted' });
         } else if (action === 'reject') {
            await offerModel.rejectOffer(offerID);
            res.status(200).json({ message: 'Offer rejected' });
         } else {
            res.status(400).json({ error: 'Invalid action' });
         }
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async deleteOffer(req, res) {
      try {
         const { offerID } = req.params;
         await offerModel.deleteOffer(offerID);
         res.status(200).json({ message: 'Offer deleted successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }

};

module.exports = offerController;
