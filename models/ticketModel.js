const pool = require('../db/connect.js')

const ticketModel = {
   async createTicket(userID, offense, notePicture, ticketPicture) {
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');  // Format: YYYY-MM-DD HH:MM:SS
      const [results] = await pool.query(
         'INSERT INTO tickets (userID, date, status, offense, notePicture, ticketPicture) VALUES (?, ?, "open", ?, ?, ?)',
         [userID, currentDate, offense, notePicture, ticketPicture]
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

      // Wenn keine Daten zur Aktualisierung vorhanden sind, können wir hier einen Fehler auslösen oder einfach zurückkehren
      if (updateData.length === 0) {
         throw new Error('No fields provided for update');
      }

      const query = `UPDATE tickets SET ${updateData.join(', ')} WHERE ticketID = ?`;
      await pool.query(query, [...queryValues, ticketID]);
   },


   async deleteTicket(ticketID) {
      await pool.query('DELETE FROM tickets WHERE ticketID = ?', [ticketID]);
   }
}

module.exports = ticketModel;