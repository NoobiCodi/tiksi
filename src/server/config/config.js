const fs = require("fs");

exports.getConfig = () => {
    /**
     * read the config.json file
     */
    const content = fs.readFileSync(__dirname + "/../../../config.json");
    const jsonContent = JSON.parse(content);

    return jsonContent;
};