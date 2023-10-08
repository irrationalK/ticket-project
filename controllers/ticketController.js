const ticketModel = require('../models/ticketModel')

const ticketController = {
   async createTicket(req, res) {
      try {
         const { userID, offense } = req.body;
         const ticketID = await ticketModel.createTicket(userID, offense);
         res.status(201).json({ ticketID, message: 'Ticket created successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async getTicket(req, res) {
      try {
         const ticketID = req.params.ticketID;
         const ticket = await ticketModel.getTicketById(ticketID);
         if (ticket) {
            res.status(200).json(ticket);
         } else {
            res.status(404).json({ message: 'Ticket not found' });
         }
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async getTicketsByUser(req, res) {
      try {
         const userID = req.params.userID;
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
         const { status, offense, note_picture, ticket_picture } = req.body;
         await ticketModel.updateTicket(ticketID, status, offense, note_picture, ticket_picture);
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