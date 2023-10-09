const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendOtp = async (req, res) => {
   try {
      const phoneNumber = req.body.phone_number;
      const response = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
         .verifications
         .create({ to: phoneNumber, channel: 'sms' })
         .then(verification => console.log(verification.status));

      res.status(200).json(response.status);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

exports.verifyOtp = async (req, res) => {
   try {
      const phoneNumber = req.body.phone_number;
      const code = req.body.code;
      const response = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
         .verificationChecks
         .create({ to: phoneNumber, code })
         .then(verification_check => {
            console.log("Verification Status:", verification_check.status);
            if (verification_check.status === 'approved') {
               res.json({ success: true });
            } else {
               res.status(400).json({ error: "Invalid code." });
            }
         })
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};
