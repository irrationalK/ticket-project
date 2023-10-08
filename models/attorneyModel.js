const pool = require('./index.js');

const attorneyModel = {
   async createAttorney(username, phone_number) {
      const [result] = await pool.query('INSERT INTO attorneys (username, phone_number, phone_verified) VALUES (?, ?, FALSE)', [username, phone_number]);
      return result.insertId;
   },

   async getAttorneyById(attorneyID) {
      const [rows] = await pool.query('SELECT * FROM attorneys WHERE attorneyID = ?', [attorneyID]);
      return rows[0];
   },

   async getAllAttorneys() {
      const [rows] = await pool.query('SELECT * FROM attorneys');
      return rows;
   },

   async updateAttorney(attorneyID, username, phone_number) {
      await pool.query('UPDATE attorneys SET username = ?, phone_number = ? WHERE attorneyID = ?', [username, phone_number, attorneyID]);
   },

   async deleteAttorney(attorneyID) {
      await pool.query('DELETE FROM attorneys WHERE attorneyID = ?', [attorneyID]);
   }
};

module.exports = attorneyModel;
