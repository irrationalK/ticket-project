const pool = require('../db/connect.js');

const attorneyModel = {
   async createEntity(username, phoneNumber) {
      const [result] = await pool.query('INSERT INTO attorneys (username, phoneNumber, phoneVerified) VALUES (?, ?, FALSE)', [username, phoneNumber]);
      return result.insertId;
   },

   async getAttorneyById(attorneyID) {
      const [rows] = await pool.query('SELECT * FROM attorneys WHERE attorneyID = ?', [attorneyID]);
      return rows[0];
   },

   async getEntityByPhoneNumber(phoneNumber) {
      const [rows] = await pool.query('SELECT * FROM attorneys WHERE phoneNumber = ?', [phoneNumber]);
      return rows[0];
   },

   async getAllAttorneys() {
      const [rows] = await pool.query('SELECT * FROM attorneys');
      return rows;
   },

   async markEntityAsVerified(phoneNumber) {
      await pool.query('UPDATE attorneys SET phoneVerified = true WHERE phoneNumber = ?', [phoneNumber]);
   },

   async updateAttorney(attorneyID, username, phoneNumber) {
      await pool.query('UPDATE attorneys SET username = ?, phoneNumber = ? WHERE attorneyID = ?', [username, phoneNumber, attorneyID]);
   },

   async deleteAttorney(attorneyID) {
      await pool.query('DELETE FROM attorneys WHERE attorneyID = ?', [attorneyID]);
   }
};

module.exports = attorneyModel;
