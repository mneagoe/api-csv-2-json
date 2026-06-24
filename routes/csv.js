const express = require('express');
const router = express.Router();
const csv = require('../controllers/csv');
const { handleUpload } = require('../middleware/upload');

const handleCsvUpload = handleUpload('csvFile');

router.post('/', handleCsvUpload, csv.csvToJson);
router.post('/download', handleCsvUpload, csv.csvToJsonDownload);

module.exports = router;
