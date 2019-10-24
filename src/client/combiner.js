/**
 * combine all js file to one
 */
const fs = require('fs');
const path = require('path');

/**
 * js file to combine
 * ORDER IS IMPORTANT
 */
const filesPaths = [
    'proxy/proxy.js'
];

let finalContent = '';

for (let i = 0; i < filesPaths.length; i++) {
    const el = filesPaths[i];
    const filePath = path.join(__dirname, el);
    const content = fs.readFileSync(filePath);

    finalContent += (i == 0 ? '' : '\n') + content;
}

/**
 * overwrite
 */
fs.writeFileSync('./src/client/tiksi.js', finalContent);