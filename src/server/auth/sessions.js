const sessions = require('./../../../lib/client-sessions/client-sessions');

// const session = sessions({
//     cookieName: 'authsession',
//     secret: 'blabla',
//     duration: 24 * 60 * 60 * 1000,
//     activeDuration: 5 * 60 * 1000
// });

/**
 * Called for every route
 * @param {Request} req 
 * @param {Response} res 
 */
function sessionRoute(req, res) {
    // session(req, res, () => {
    // });
}

module.exports = {
    // session,
    sessionRoute
};