const csv = require('../services/csv');
const logger = require('../middleware/logger');

const exp = {};

exp.csvToJson = async (req, res) => {
    try {
        if (!req.file) throw new Error('No file was sent.');
        const delimiter = req.query.delimiter || '';
        const data = await csv.csvToJson(req.file.path, { delimiter });
        res.render('home', {result: JSON.stringify(data, null, 4)});

    } catch (error) {
        logger.error(error, 'home csvToJson failed');
        const result = error.message || 'Could not convert file.';
        res.render('home', { result: `Error: ${result}` });
    }
}

module.exports = exp;
