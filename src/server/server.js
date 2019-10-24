const http = require('http');
const router = require('./router');
const { getConfig } = require('./config/config');
const csl = require('./tools/console');
const { color } = require('./tools/color');
const { Twig } = require("./template/twigImpl");

const server = http.createServer();

csl.printServer(`Server starting ...`, color.BgGreen + color.FgBlack);

/**
 * Handle request and give it to the router
 */
server.on('request', (req, res) => {
    router.router(req, res, Twig);
});

/**
 * Get the config from config/config.json
 */
const config = getConfig();
const serverVersion = config.version;
const port = config.port;

server.listen(port);

csl.printServer(`${color.FgCyan}Server listening to port ${color.FgGreen}${port}${color.FgCyan}, http://localhost:${port}/${color.Reset}`);

const auth = require('./auth/auth');

auth.getCryptedPassword('banana').then((hash) => {
    auth.comparePassword('banana', hash).then(/*console.log*/);
});