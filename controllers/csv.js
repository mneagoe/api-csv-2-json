// const papa = require('papaparse');
const csv = require('../services/csv');

const exp = {};

exp.csvToJson = async (req, res) => {
    try {
        if (!req.file) throw 'No file was sent.';
        const fileString = req.file.buffer.toString('latin1');
        const data = await csv.csvToJson(fileString);
        res.json(data);
        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: `Could not convert file.`
        })
    }
}

module.exports = exp;