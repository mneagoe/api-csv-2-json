const csv = require('../services/csv');
const logger = require('../middleware/logger');

const exp = {};

exp.csvToJson = async (req, res) => {
    try {
        if (!req.file) throw new Error('No file was sent.');
        const delimiter = req.query.delimiter || '';
        const data = await csv.csvToJson(req.file.path, { delimiter });
        res.json(data);

    } catch (error) {
        logger.error(error, 'csvToJson failed');
        const message = error.message || 'Could not convert file.';
        res.status(400).json({ success: false, message });
    }
};

exp.csvToJsonDownload = async (req, res) => {
    try {
        if (!req.file) throw new Error('No file was sent.');
        const delimiter = req.query.delimiter || '';
        const data = await csv.csvToJson(req.file.path, { delimiter });
        res.setHeader('Content-Disposition', 'attachment; filename="output.json"');
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    } catch (error) {
        logger.error(error, 'csvToJsonDownload failed');
        const message = error.message || 'Could not convert file.';
        res.status(400).json({ success: false, message });
    }
};

module.exports = exp;
