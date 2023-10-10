const userModel = require('../models/userModel.js');

const userController = {

   // Benutzerinformationen abrufen
   async getUser(req, res) {
      try {
         const userID = req.user.id;
         const user = await userModel.getUserById(userID);
         if (user) {
            res.status(200).json(user);
         } else {
            res.status(404).json({ message: 'User not found' });
         }
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   // Alle Benutzer abrufen
   async getAllUsers(req, res) {
      try {
         const users = await userModel.getAllUsers();
         res.status(200).json(users);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   // Benutzerinformationen aktualisieren
   async updateUser(req, res) {
      try {
         const userID = req.user.id;
         const { username, phoneNumber } = req.body;
         await userModel.updateUser(userID, username, phoneNumber);
         res.status(200).json({ message: 'User updated successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   // Benutzer löschen
   async deleteUser(req, res) {
      try {
         const userID = req.user.id;
         await userModel.deleteUser(userID);
         res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }
};

module.exports = userController;
