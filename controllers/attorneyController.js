const AttorneyModel = require('../models/attorneyModel.js');

const attorneyController = {
   async createAttorney(req, res) {
      try {
         const { username, phone_number } = req.body;
         const attorneyId = await AttorneyModel.createAttorney(username, phone_number);
         res.status(201).json({ attorneyId, message: 'Attorney created successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async getAttorney(req, res) {
      try {
         const attorneyId = req.params.id;
         const attorney = await AttorneyModel.getAttorneyById(attorneyId);
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
         const attorneys = await AttorneyModel.getAllAttorneys();
         res.status(200).json(attorneys);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async updateAttorney(req, res) {
      try {
         const attorneyId = req.params.id;
         const { username, phone_number } = req.body;
         await AttorneyModel.updateAttorney(attorneyId, username, phone_number);
         res.status(200).json({ message: 'Attorney updated successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   async deleteAttorney(req, res) {
      try {
         const attorneyId = req.params.id;
         await AttorneyModel.deleteAttorney(attorneyId);
         res.status(200).json({ message: 'Attorney deleted successfully' });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }
};

module.exports = attorneyController;
