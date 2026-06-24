const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const { upload } = require('../middleware/upload');

router.get('/', (req, res) => res.render('home'));
router.post('/', (req, res, next) => {
    upload.single('csvFile')(req, res, (err) => {
        if (err) {
            return res.render('home', { result: `Error: ${err.message}` });
        }
        res.on('finish', () => {
            if (req.file?.path) require('fs').unlink(req.file.path, () => {});
        });
        res.on('close', () => {
            if (req.file?.path) require('fs').unlink(req.file.path, () => {});
        });
        next();
    });
}, home.csvToJson);

module.exports = router;
