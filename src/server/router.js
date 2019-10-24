const { apiRoute } = require('./api/route');
const csl = require('./tools/console');
const { color } = require('./tools/color');
const { RemoteInvoker } = require('./api/remoteInvoker');
const fs = require('fs');
const path = require('path');
const { getAllMethods } = require('./tools/methodInstance');
const { jsonContent } = require("./template/routing");

function loadControllerView(instance, twig, res) {
    const controllSplit = jsonContent[instance].controller.split(".");
    const controllerRequire = require('./../../controllers/' + controllSplit[0]);

    const theController = controllerRequire[controllSplit[0]];

    const data = theController[controllSplit[1]]();

    twig.renderFile(path.join(__dirname, `/../../views/${jsonContent[instance].view}.twig`), data, (err, html) => {
        res.end(html);
    });
}

exports.router = (req, res, twig) => {
    /**
     * get url and method
     */
    const url = req.url;
    const method = req.method;

    csl.printServer(`Handle request ${url} with method ${method}`);
    
    /**
     * split url by '/'
     * example:
     * /test/de  ->  ['', 'test', 'de']
     */
    const urlSplited = url.split('/');
    /**
     * remove the first empty element
     */
    urlSplited.shift();

    if (method === 'POST' && urlSplited[0] == 'api') {
        /**
         * request for api
         * call the apiRoute
         */
        apiRoute(req, res, urlSplited);
    } else if (urlSplited[0] == 'client') {
        if (urlSplited[1] == 'getlib') {
            if (urlSplited[2] == 'tiksi') {
                /**
                 * send library tiksi to the client
                 */
                const content = fs.readFileSync(path.join(__dirname, '/../client/tiksi.js'));
                res.end(content);           
            }
        }
    } else if (method === 'GET' && urlSplited[0] == 'api') {
        if (urlSplited[1] == 'getclasses') {
            /**
             * send RemoteInvoker.classes
             * example : { Ping: [constructor, ping] }
             */
            res.end(JSON.stringify(getAllMethods(RemoteInvoker.classes)));
        }
    } else {
        let handlerError;

        for (let instance in jsonContent) {
            if (instance == '404') {
                handlerError = instance;
            }

            if (jsonContent[instance].path == url) {
                loadControllerView(instance, twig, res);
                return;
            }
        }

        /**
         * Request not handled, 404 error
         */
        if (handlerError != undefined) {
            csl.printServer(`Request ${url} not valid: 404 error, handled by 404 controller`, color.FgYellow);
            loadControllerView(handlerError, twig, res);
        } else {
            csl.printServer(`Request ${url} not valid: 404 error`, color.FgRed);
            res.end('404 error');
        }
    }
};