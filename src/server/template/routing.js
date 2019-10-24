const fs = require("fs");
const path = require("path");

/**
 * get the content of the routes.json
 */
const content = fs.readFileSync(path.join(__dirname, "/../../../routes.json"));
const jsonContent = JSON.parse(content);

module.exports = {
    jsonContent
}