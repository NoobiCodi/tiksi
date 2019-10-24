const { Ping } = require('./ping');

const ping = new Ping();

const clsses = {
    'Ping': ping
}

/**
 * @class RemoteInvoker
 */
class RemoteInvoker {
    static get classes() {
        return clsses
    };

    /**
     * register a new instance
     * to be access by the api
     * @param {object} instance 
     * @param {string} getter 
     */
    static registerInstance(instance, getter) {
        clsses[getter] = instance;
        
        return RemoteInvoker.classes;
    }
}

module.exports = {
    RemoteInvoker
};