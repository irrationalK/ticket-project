const ticketModel = require('../models/ticketModel')
const { s3Upload, s3Delete, getSignedUrlForObject } = require('./fileController')

const ticketController = {
   async createTicket(req, res) {
      try {
         const userID = req.user.id;
         const offense = req.body.offense;

         let notePictureFilename, ticketPictureFilename;

         if (req.files && req.files.notePicture) {
            notePictureFilename = await s3Upload(req.files.notePicture[0]);
         }

         if (req.files && req.files.ticketPicture) {
            ticketPictureFilename = await s3Upload(req.files.ticketPicture[0]);
         }

         const ticketID = await ticketModel.createTicket(userID, offense, notePictureFilename, ticketPictureFilename);
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

   async getTicketImage(req, res) {
      try {
         const ticketID = req.params.ticketID;
         const ticket = await ticketModel.getTicketById(ticketID);
         if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
         }

         let noteUrl, ticketUrl;

         if (ticket.notePicture) {
            noteUrl = await getSignedUrlForObject(ticket.notePicture).catch((error) => {
               console.error("Error generating signed URL for note picture:", error);
            });
         }

         if (ticket.ticketPicture) {
            ticketUrl = await getSignedUrlForObject(ticket.ticketPicture).catch((error) => {
               console.error("Error generating signed URL for ticket picture:", error);
            });
         }

         if (!noteUrl && !ticketUrl) {
            return res.status(404).json({ message: 'No images found for this ticket' });
         }

         res.json({
            noteUrl: noteUrl || 'Not available',
            ticketUrl: ticketUrl || 'Not available'
         });
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

         let notePictureFilename, ticketPictureFilename;
         // Prüfen, ob Dateien hochgeladen wurden, ggf. alte Bilder löschen und Filenames aktualisieren
         if (req.files) {
            const notePictureFile = req.files['notePicture'] ? req.files['notePicture'][0] : null;
            const ticketPictureFile = req.files['ticketPicture'] ? req.files['ticketPicture'][0] : null;

            if (notePictureFile) {
               if (ticket.notePicture) {
                  await s3Delete(ticket.notePicture);
               }
               notePictureFilename = await s3Upload(notePictureFile);
            }

            if (ticketPictureFile) {
               if (ticket.ticketPicture) {
                  await s3Delete(ticket.ticketPicture);
               }
               ticketPictureFilename = await s3Upload(ticketPictureFile);
            }
         }

         await ticketModel.updateTicket(ticketID, offense, notePictureFilename, ticketPictureFilename);
         res.status(200).json({ message: 'Ticket updated successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async deleteTicket(req, res) {
      try {
         const ticketID = req.params.ticketID;
         const ticket = await ticketModel.getTicketById(ticketID);

         if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
         }

         // Bilder aus S3 löschen, wenn sie existieren
         if (ticket.notePicture) {
            await s3Delete(ticket.notePicture);
         }

         if (ticket.ticketPicture) {
            await s3Delete(ticket.ticketPicture);
         }

         // Ticket aus der Datenbank löschen
         await ticketModel.deleteTicket(ticketID);
         res.status(200).json({ message: 'Ticket deleted successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }
}

module.exports = ticketController;