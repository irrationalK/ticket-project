const attorneyModel = require('../models/attorneyModel.js');

const attorneyController = {

   async getAttorney(req, res) {
      try {
         const attorneyID = req.params.attorneyID;
         const attorney = await attorneyModel.getAttorneyById(attorneyID);
         if (attorney) {
            res.status(200).json(attorney);
         } else {
            res.status(404).json({ message: 'Attorney not found' });
         }
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async getAllAttorneys(req, res) {
      try {
         const attorneys = await attorneyModel.getAllAttorneys();
         res.status(200).json(attorneys);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async updateAttorney(req, res) {
      try {
         const attorneyID = req.params.attorneyID;
         const { username, phoneNumber } = req.body;
         await attorneyModel.updateAttorney(attorneyID, username, phoneNumber);
         res.status(200).json({ message: 'Attorney updated successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async deleteAttorney(req, res) {
      try {
         const attorneyID = req.params.attorneyID;
         await attorneyModel.deleteAttorney(attorneyID);
         res.status(200).json({ message: 'Attorney deleted successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }
};

module.exports = attorneyController;
