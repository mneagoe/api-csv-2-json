const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const multer = require('multer');

// This sets multer to store file in memory (as a buffer).
const storage = multer.memoryStorage();
// This sets max file size accepted.
const limit = { fileSize: 1024 * 1024 * 10 } // 10MB
// Apply previous configurations to multer and create instance.
const upload = multer({ storage: storage, limits: limit });


router.get('/', (req, res) => res.render('home'))
router.post('/', upload.single('csvFile'), home.csvToJson);

module.exports = router;