const { color } = require('./color');

/**
 * Get :
 *  - the current date
 *  - the current time
 * Then set it to prefix
 */
const today = new Date();
const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
const prefix = `[Tiksi JS - ${date}-${time}]`;

/**
 * simple print
 */
exports.print = (...args) => {
    console.log(args);
};

/**
 * Print by the server with prefix
 */
exports.printServer = (str, colorC) => {
    if (colorC == undefined) {
        colorC = color.Reset;
    }

    console.log(colorC, `${prefix}: ${str}`, color.Reset);
};