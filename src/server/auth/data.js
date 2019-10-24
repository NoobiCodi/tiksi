const fs = require('fs');
const path = require('path');

const getDataJson = () => {
    const content = fs.readFileSync(path.join(__dirname, '/data/data.json'));
    const result = JSON.parse(content);

    return result;
};

module.exports = {
    getDataJson
};