const { RemoteInvoker } = require('./remoteInvoker');
const { parse } = require('querystring');

/**
 * get arguments from the POST request
 * @param {Request} req 
 * @param {Function} callback 
 */
function getArgs(req, callback) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        callback(parse(body));
    });
}

exports.apiRoute = (req, res, urlSplited) => {
    if (urlSplited.length > 2) {
        /**
         * get first and second args, 
         * class name and function name
         */
        const className = urlSplited[1];
        const functionName = urlSplited[2];

        const theClass = RemoteInvoker.classes[className];

        if (theClass != undefined) {
            const theFunc = theClass[functionName];

            if (theFunc != undefined) {
                /**
                 * get all arguments from the POST request
                 * pass to the function
                 */
                getArgs(req, (args) => {
                    let result = theFunc(args);

                    res.end(result);
                });
            }
        }
    }
};