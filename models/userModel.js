const pool = require('./index.js')

const userModel = {
   async createUser(username, phoneNumber) {
      const [results] = await pool.query('INSERT INTO users (username, phone_number, phone_verified) VALUES (?, ?, false)', [username, phoneNumber]);
      return results.insertId;
   },

   async getUserById(userID) {
      const [rows] = await pool.query('SELECT * FROM users WHERE userID = ?', [userID]);
      return rows[0];
   },

   async getAllUsers() {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
   },

   async updateUser(userID, username, phoneNumber) {
      await pool.query('UPDATE users SET username = ?, phone_number = ? WHERE userID = ?', [username, phoneNumber, userID]);
   },

   async deleteUser(userID) {
      await pool.query('DELETE FROM users WHERE userID = ?', [userID]);
   }

}

module.exports = userModel;