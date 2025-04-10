const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


router.post('/', upload.single('image'), (req, res) => {
  const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ imageUrl: fileUrl });
});

module.exports = router;
