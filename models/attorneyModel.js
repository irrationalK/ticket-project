const pool = require('./index.js');

const AttorneyModel = {
   async createAttorney(username, phone_number) {
      const [result] = await pool.query('INSERT INTO attorneys (username, phone_number, phone_verified) VALUES (?, ?, FALSE)', [username, phone_number]);
      return result.insertId;
   },

   async getAttorneyById(attorneyId) {
      const [rows] = await pool.query('SELECT * FROM attorneys WHERE attorneyID = ?', [attorneyId]);
      return rows[0];
   },

   async getAllAttorneys() {
      const [rows] = await pool.query('SELECT * FROM attorneys');
      return rows;
   },

   async updateAttorney(attorneyId, username, phone_number) {
      await pool.query('UPDATE attorneys SET username = ?, phone_number = ? WHERE attorneyID = ?', [username, phone_number, attorneyId]);
   },

   async deleteAttorney(attorneyId) {
      await pool.query('DELETE FROM attorneys WHERE attorneyID = ?', [attorneyId]);
   }
};

module.exports = AttorneyModel;
