const papa = require('papaparse');

const exp = {};

exp.csvToJson = (req, res) => {
    const fileString = req.file.buffer.toString('latin1');

    papa.parse(fileString, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => res.json(results.data),
        error: (error, file) => {
            console.log(error, file);
            res.json({
                success: false,
                message: `Fail to converto to JSON.`
            });
        }
    });
}

module.exports = exp;