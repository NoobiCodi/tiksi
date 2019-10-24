const http = require('http');
const { parse } = require('querystring');

const server = http.createServer();

function getArgs(req, callback) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        callback(parse(body));
    });
}

class TestClass {
    constructor(a) {
        this.a = a;
    }

    test({ name }) {
        return name;
    }
}

let test = new TestClass('a');

let classes = {
    Test: test
}

server.on('request', (req, res) => {
    if (req.method === 'POST') {
        const url = req.url;
    
        const urlSplited = url.split('/');
        urlSplited.shift();

        if (urlSplited[0] == 'api') {
            if (urlSplited.length > 2) {
                const className = urlSplited[1];
                const functionName = urlSplited[2];

                const theClass = classes[className];

                if (theClass != undefined) {
                    const theFunc = theClass[functionName];

                    if (theFunc != undefined) {
                        getArgs(req, (args) => {
                            let result = theFunc(args);
                            res.end(result);
                        });
                    }
                }
            }
        }
    }
    /* TEST DEBUG MUST BE REMOVED */else {     /* TEST DEBUG MUST BE REMOVED */
        res.end(`
          <!doctype html>
          <html>
          <body>
              <form action="/api/Test/test" method="post">
                  <input type="text" name="name" /><br />
                  <input type="number" name="age" /><br />
                  <button>Save</button>
              </form>
          </body>
          </html>
        `);
     /* TEST DEBUG MUST BE REMOVED */ }    /* TEST DEBUG MUST BE REMOVED */
});

server.listen(8000);