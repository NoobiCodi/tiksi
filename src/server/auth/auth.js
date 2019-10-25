const { 
    getCryptedPassword,
    comparePassword
} = require('./password');

const {
    session,
    sessionRoute
} = require ('./sessions');

module.exports = {
    getCryptedPassword,
    comparePassword,

    session,
    sessionRoute
};