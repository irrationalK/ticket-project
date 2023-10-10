const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const userModel = require('../models/userModel');
const attorneyModel = require('../models/attorneyModel')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
   const { username, phoneNumber, role } = req.body;

   // Überprüfen, ob die Telefonnummer bereits registriert ist
   const existingUser = await userModel.getEntityByPhoneNumber(phoneNumber);
   if (existingUser) {
      return res.status(400).json({ error: "Phone number already registered as a user." });
   }

   const existingAttorney = await attorneyModel.getEntityByPhoneNumber(phoneNumber);
   if (existingAttorney) {
      return res.status(400).json({ error: "Phone number already registered as an attorney." });
   }

   let model;
   switch (role) {
      case 'user':
         model = userModel;
         break;
      case 'attorney':
         model = attorneyModel;
         break;
      default:
         return res.status(400).json({ error: "Invalid role specified." });
   }

   // Eintrag in der Datenbank speichern
   const entityID = await model.createEntity(username, phoneNumber);
   console.log('test: ', entityID)
   // OTP senden
   try {
      await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
         .verifications
         .create({ to: phoneNumber, channel: 'sms' });

      res.status(200).json({ message: "OTP sent. Please verify.", entityID });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};


const sendOtp = async (req, res) => {
   try {
      const phoneNumber = req.body.phoneNumber;
      const response = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
         .verifications
         .create({ to: phoneNumber, channel: 'sms' })
         .then(verification => console.log(verification.status));

      res.status(200).json(response.verification.status);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const verifyOtp = async (req, res) => {
   try {
      const { phoneNumber, code } = req.body;

      let model;
      let role;
      const ID_FIELDS = {
         user: 'userID',
         attorney: 'attorneyID'
      };
      // Nutzergruppe überprüfen. Eine Handynummer kann nur einer Gruppe zugehören
      const user = await userModel.getEntityByPhoneNumber(phoneNumber);
      if (user) {
         model = userModel;
         role = 'user';
      } else {
         const attorney = await attorneyModel.getEntityByPhoneNumber(phoneNumber);
         if (attorney) {
            model = attorneyModel;
            role = 'attorney';
         } else {
            return res.status(400).json({ error: "Entity not found." });
         }
      }

      const entity = await model.getEntityByPhoneNumber(phoneNumber);
      // Bestimmen des richtigen ID-Feldnamens und dann des Wertes
      const idField = ID_FIELDS[role];
      const entityId = entity[idField];

      // OTP überprüfen
      const verification_check = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
         .verificationChecks
         .create({ to: phoneNumber, code });

      if (verification_check.status === 'approved') {
         // Entität als verifiziert markieren
         if (!entity.phoneVerified) {
            await model.markEntityAsVerified(phoneNumber);
         }

         // Token generieren
         const payload = {
            id: entityId,
            username: entity.username,
            phoneNumber: entity.phoneNumber,
            role: role
         };
         console.log(payload);
         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });

         res.json({ success: true, token });
      } else {
         res.status(400).json({ error: "Invalid code." });
      }
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

module.exports = {
   register,
   sendOtp,
   verifyOtp
};
