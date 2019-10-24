/**
 * import all script that user will use
 */
const { RemoteInvoker } = require('./api/remoteInvoker');
const authentification = require('./auth/auth');

/**
 * Then export lib
 * to be accessible
 */
module.exports = {
    RemoteInvoker,
    authentification
}