const papa = require('papaparse');
const fs = require('fs');

const exp = {};

exp.csvToJson = (filePath, options = {}) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const readStream = fs.createReadStream(filePath, { encoding: 'latin1' });

        papa.parse(readStream, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            delimiter: options.delimiter || '',
            step: (row) => results.push(row.data),
            complete: () => resolve(results),
            error: (err) => reject(err),
        });
    });
};

module.exports = exp;
