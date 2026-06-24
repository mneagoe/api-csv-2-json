const multer = require('multer');
const path = require('path');
const os = require('os');

const maxSize = parseInt(process.env.MAX_FILE_SIZE, 10) || 10 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: os.tmpdir(),
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, unique + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.csv') {
            return cb(new Error('Only .csv files are allowed.'), false);
        }
        cb(null, true);
    }
});

const cleanup = (filePath) => {
    if (filePath) {
        require('fs').unlink(filePath, () => {});
    }
};

const handleUpload = (fieldName) => (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        res.on('finish', () => cleanup(req.file?.path));
        res.on('close', () => cleanup(req.file?.path));
        next();
    });
};

module.exports = { upload, handleUpload, cleanup };
