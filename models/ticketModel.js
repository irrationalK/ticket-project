const pool = require('./index.js')

const ticketModel = {
   async createTicket(userID, offense) {
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');  // Format: YYYY-MM-DD HH:MM:SS
      const [results] = await pool.query('INSERT INTO tickets (userID, date, status, offense) VALUES (?, ?, "open", ?)',
         [userID, currentDate, offense]);
      return results.insertId;
   },

   async getTicketById(ticketID) {
      const [rows] = await pool.query('SELECT * FROM tickets WHERE ticketID = ?', [ticketID]);
      return rows[0];
   },

   async getTicketsByUserId(userID) {
      const [rows] = await pool.query('SELECT * FROM tickets WHERE userID = ?', [userID]);
      return rows;
   },

   async getOpenTickets() {
      const [rows] = await pool.query('SELECT * FROM tickets WHERE status = "open"');
      return rows;
   },

   async updateTicket(ticketID, status, offense, note_picture, ticket_picture) {
      await pool.query('UPDATE tickets SET status = ?, offense = ?, note_picture = ?, ticket_picture = ? WHERE ticketID = ?',
         [status, offense, note_picture, ticket_picture, ticketID]);
   },

   async deleteTicket(ticketID) {
      await pool.query('DELETE FROM tickets WHERE ticketID = ?', [ticketID]);
   }
}

module.exports = ticketModel;