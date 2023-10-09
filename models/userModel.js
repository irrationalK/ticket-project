const pool = require('../db/connect.js')

const userModel = {
   async createEntity(username, phoneNumber) {
      const [results] = await pool.query('INSERT INTO users (username, phoneNumber, phoneVerified) VALUES (?, ?, false)', [username, phoneNumber]);
      return results.insertId;
   },

   async getUserById(userID) {
      const [rows] = await pool.query('SELECT * FROM users WHERE userID = ?', [userID]);
      return rows[0];
   },

   async getEntityByPhoneNumber(phoneNumber) {
      const [rows] = await pool.query('SELECT * FROM users WHERE phoneNumber = ?', [phoneNumber]);
      return rows[0];
   },

   async getAllUsers() {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
   },

   async markEntityAsVerified(phoneNumber) {
      await pool.query('UPDATE users SET phoneVerified = true WHERE phoneNumber = ?', [phoneNumber]);
   },

   async updateUser(userID, username, phoneNumber) {
      await pool.query('UPDATE users SET username = ?, phoneNumber = ? WHERE userID = ?', [username, phoneNumber, userID]);
   },

   async deleteUser(userID) {
      await pool.query('DELETE FROM users WHERE userID = ?', [userID]);
   }

}

module.exports = userModel;