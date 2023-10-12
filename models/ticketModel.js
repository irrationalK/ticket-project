const pool = require('../db/connect.js')

const ticketModel = {
   async createTicket(userID, offense, notePicture, ticketPicture) {
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');  // Format: YYYY-MM-DD HH:MM:SS
      const status = 'open';
      const [results] = await pool.query(
         'INSERT INTO tickets (userID, date, status, offense, notePicture, ticketPicture) VALUES (?, ?, ?, ?, ?, ?)',
         [userID, currentDate, status, offense, notePicture, ticketPicture]
      );
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

   async updateTicket(ticketID, offense, notePictureFilename, ticketPictureFilename) {
      const updateData = [];
      const queryValues = [];

      if (offense) {
         updateData.push('offense = ?');
         queryValues.push(offense);
      }

      if (notePictureFilename) {
         updateData.push('notePicture = ?');
         queryValues.push(notePictureFilename);
      }

      if (ticketPictureFilename) {
         updateData.push('ticketPicture = ?');
         queryValues.push(ticketPictureFilename);
      }

      if (updateData.length === 0) {
         throw new Error('No fields provided for update');
      }

      const query = `UPDATE tickets SET ${updateData.join(', ')} WHERE ticketID = ?`;
      await pool.query(query, [...queryValues, ticketID]);
   },

   async updateTicketStatus(ticketID, status) {
      const query = 'UPDATE tickets SET status = ? WHERE ticketID = ?';
      await pool.query(query, [status, ticketID]);
   },

   async deleteTicket(ticketID) {
      await pool.query('DELETE FROM tickets WHERE ticketID = ?', [ticketID]);
   },

   async isUserTicketOwner(userID, ticketID) {
      try {
         const query = 'SELECT * FROM tickets WHERE ticketID = ?';
         const [results] = await pool.query(query, [ticketID]);
         if (results.length > 0) {
            return results[0].userID === userID;
         }
         return false;
      } catch (error) {
         throw new Error('Database error: ' + error.message);
      }
   }

}

module.exports = ticketModel;