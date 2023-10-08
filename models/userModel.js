const pool = require('./index.js')

const UserModel = {
   async createUser(username, phoneNumber) {
      const [results] = await pool.query('INSERT INTO users (username, phone_number, phone_verified) VALUES (?, ?, false)', [username, phoneNumber]);
      return results.insertId;
   },

   async getUserById(userId) {
      const [rows] = await pool.query('SELECT * FROM users WHERE userID = ?', [userId]);
      return rows[0];
   },

   async getAllUsers() {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
   },

   async updateUser(userId, username, phoneNumber) {
      await pool.query('UPDATE users SET username = ?, phone_number = ? WHERE userID = ?', [username, phoneNumber, userId]);
   },

   async deleteUser(userId) {
      await pool.query('DELETE FROM users WHERE userID = ?', [userId]);
   }

}

module.exports = UserModel;