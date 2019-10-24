const bcrypt = require('../../../lib/bcrypt');
const { getDataJson } = require('./data');

const dataJson = getDataJson();

const getCryptedPassword = async (password) => {
    const hash = await bcrypt.hash(password, dataJson.rounds);

    return hash;
};

const comparePassword = async (password, cryptedPassword) => {
    const bool = await bcrypt.compare(password, cryptedPassword);

    return bool;
};

module.exports = {
    getCryptedPassword,
    comparePassword
};