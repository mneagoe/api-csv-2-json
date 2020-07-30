const csv = require('../services/csv');

const exp = {};

exp.csvToJson = async (req, res) => {
    try {
        if (!req.file) throw 'No file was sent.';
        const fileString = req.file.buffer.toString('latin1');
        const data = await csv.csvToJson(fileString);
        res.render('home', {result: JSON.stringify(data, null, 4)});
        
    } catch (error) {
        console.error(error);
        res.render('home', {result: `Could not convert file.`});
    }
}

module.exports = exp;