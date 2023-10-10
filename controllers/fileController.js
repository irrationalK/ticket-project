const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require('../config/s3Config');

const s3Upload = async (file) => {
   const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.stream,
      ContentType: file.mimetype
   };
   return await s3.send(new PutObjectCommand(uploadParams));
};

exports.uploadFile = async (req, res) => {
   try {
      console.log("req.body: ", req.body);
      if (!req.file) {
         return res.status(400).json({ success: false, message: 'No file uploaded.' });
      }

      await s3Upload(req.file);
      res.json({ success: true, message: 'File uploaded successfully!', fileLocation: req.file });
   } catch (error) {
      res.status(500).json({ success: false, message: 'File upload failed.', error: error.message });
   }
};
