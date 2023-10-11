const pool = require('../db/connect.js')

const offerModel = {
   async submitOffer(ticketID, attorneyID, price, description) {
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');  // Format: YYYY-MM-DD HH:MM:SS
      const status = 'pending';
      const query = 'INSERT INTO offers (ticketID, attorneyID, price, description, date, status) VALUES (?, ?, ?, ?, ?, ?)';
      const [result] = await pool.query(query, [ticketID, attorneyID, price, description, currentDate, status]);
      return result.insertId;
   },

   async updateOffer(offerID, price, description) {
      const query = 'UPDATE offers SET price = ?, description = ? WHERE offerID = ?';
      await pool.query(query, [price, description, offerID]);
   },

   async getOffersByTicketId(ticketID) {
      const query = 'SELECT * FROM offers WHERE ticketID = ?';
      const [rows] = await pool.query(query, [ticketID]);
      return rows;
   },

   async acceptOffer(offerID) {
      const status = 'accepted';
      const query = 'UPDATE offers SET status = ? WHERE offerID = ?';
      await pool.query(query, [status, offerID]);
   },

   async rejectOffer(offerID) {
      const status = 'rejected';
      const query = 'UPDATE offers SET status = ? WHERE offerID = ?';
      await pool.query(query, [status, offerID]);
   },

   async deleteOffer(offerID) {
      const query = 'DELETE FROM offers WHERE offerID = ?';
      await pool.query(query, [offerID]);
   },

   async isUserOfferOwner(userID, offerID) {
      try {
         const query = 'SELECT * FROM offers WHERE offerID = ?';
         const [results] = await pool.query(query, [offerID]);

         if (results.length > 0) {
            return results[0].attorneyID === userID;
         }
         return false;
      } catch (error) {
         throw new Error('Database error: ' + error.message);
      }
   }

};

module.exports = offerModel;
