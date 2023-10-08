const pool = require('./index.js')

class UserModel {
   // Neue Benutzer hinzufügen
   static async createUser(username, phoneNumber) {
      try {
         const [results] = await pool.query('INSERT INTO users (username, phone_number, phone_verified) VALUES (?, ?, false)', [username, phoneNumber]);
         return results.insertId;
      } catch (error) {
         throw error;
      }
   }

   // Benutzer anhand der ID abrufen
   static async getUserById(userId) {
      try {
         const [results] = await pool.query('SELECT * FROM users WHERE userID = ?', [userId]);
         return results[0];
      } catch (error) {
         throw error;
      }
   }

   // Alle Benutzer abrufen
   static async getAllUsers() {
      try {
         const [results] = await pool.query('SELECT * FROM users');
         return results;
      } catch (error) {
         throw error;
      }
   }

   // Benutzer aktualisieren
   static async updateUser(userId, username, phoneNumber) {
      try {
         await pool.query('UPDATE users SET username = ?, phone_number = ? WHERE userID = ?', [username, phoneNumber, userId]);
      } catch (error) {
         throw error;
      }
   }

   // Benutzer löschen
   static async deleteUser(userId) {
      try {
         await pool.query('DELETE FROM users WHERE userID = ?', [userId]);
      } catch (error) {
         throw error;
      }
   }

}

module.exports = UserModel;