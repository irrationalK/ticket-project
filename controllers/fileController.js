const { Upload } = require("@aws-sdk/lib-storage");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require('../config/s3Config');
const crypto = require('crypto');

const s3Upload = async (file) => {
   // Eindeutiger Filename
   const filename = crypto.randomBytes(16).toString('hex') + "-" + file.originalname;

   const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype
   };

   const uploader = new Upload({
      client: s3,
      params: uploadParams
   });

   await uploader.done();

   return filename;  // Rückgabe des eindeutigen Filenamens, falls erforderlich
};

const s3Delete = async (filename) => {
   const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename
   };

   try {
      await s3.send(new DeleteObjectCommand(deleteParams));
      console.log("Image successfully deleted");
   } catch (error) {
      console.log("Error deleting image", error);
   }
};

const uploadFile = async (req, res) => {
   try {
      if (!req.file) {
         return res.status(400).json({ success: false, message: 'No file uploaded.' });
      }

      const filename = await s3Upload(req.file);
      res.json({ success: true, message: 'File uploaded successfully!', fileLocation: filename });
   } catch (error) {
      res.status(500).json({ success: false, message: 'File upload failed.', error: error.message });
   }
};

module.exports = {
   s3Upload,
   s3Delete,
   uploadFile
};
