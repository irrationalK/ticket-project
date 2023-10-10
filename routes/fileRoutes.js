const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerStorage = require('../middleware/multerStorage');
const { uploadFile } = require('../controllers/fileController');

const upload = multer({ storage: multerStorage });

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
