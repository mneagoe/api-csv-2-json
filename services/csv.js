const papa = require('papaparse');

const exp = {};

exp.csvToJson = (fileString) => {
    return new Promise((resolve, reject) => {
        papa.parse(fileString, {
        header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
        });
    })
}

module.exports = exp;