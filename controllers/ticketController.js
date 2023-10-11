const ticketModel = require('../models/ticketModel')
const { s3Upload } = require('./fileController')

const ticketController = {
   async createTicket(req, res) {
      try {
         const userID = req.user.id;
         const offense = req.body.offense;

         let notePictureURL, ticketPictureURL;

         if (req.files && req.files.notePicture) {
            console.log(req.files.notePicture);
            notePictureURL = await s3Upload(req.files.notePicture[0]);
         }

         if (req.files && req.files.ticketPicture) {
            ticketPictureURL = await s3Upload(req.files.ticketPicture[0]);
         }

         const ticketID = await ticketModel.createTicket(userID, offense, notePictureURL, ticketPictureURL);
         res.status(201).json({ ticketID, message: 'Ticket created successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async getTicket(req, res) {
      try {
         const ticketID = req.params.ticketID;
         const ticket = await ticketModel.getTicketById(ticketID);

         if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
         }

         if (ticket.userID !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to access this ticket.' });
         }

         res.status(200).json(ticket);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async getTicketsByUser(req, res) {
      try {
         const userID = req.user.id;
         const tickets = await ticketModel.getTicketsByUserId(userID);
         res.status(200).json(tickets);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async getOpenTickets(req, res) {
      try {
         const tickets = await ticketModel.getOpenTickets();
         res.status(200).json(tickets);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async updateTicket(req, res) {
      try {
         const ticketID = req.params.ticketID;
         const { offense } = req.body;

         const ticket = await ticketModel.getTicketById(ticketID);
         if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
         }

         if (ticket.userID !== req.user.id) {
            return res.status(403).json({ message: "You don't have permission to update this ticket." });
         }

         let notePictureURL, ticketPictureURL;
         // Prüfen, ob Dateien hochgeladen wurden, und URLs aktualisieren
         if (req.files) {
            const notePictureFile = req.files['notePicture'] ? req.files['notePicture'][0] : null;
            const ticketPictureFile = req.files['ticketPicture'] ? req.files['ticketPicture'][0] : null;

            if (notePictureFile) {
               notePictureURL = await s3Upload(notePictureFile);
            }

            if (ticketPictureFile) {
               ticketPictureURL = await s3Upload(ticketPictureFile);
            }
         }

         await ticketModel.updateTicket(ticketID, offense, notePictureURL, ticketPictureURL);
         res.status(200).json({ message: 'Ticket updated successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async deleteTicket(req, res) {
      try {
         const ticketID = req.params.ticketID;
         await ticketModel.deleteTicket(ticketID);
         res.status(200).json({ message: 'Ticket deleted successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }
}

module.exports = ticketController;