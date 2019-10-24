class Proxy {
    /**
     * get available functions
     * @param {Function} callback 
     */
    static getListAvailable(callback) {
        const http = new XMLHttpRequest();
        const url = '/api/getclasses';
        http.type = 'application/javascript';
        http.open('GET', url);
        http.send();

        http.onreadystatechange = (e) => {
            if (http.DONE == http.readyState) {
                if (http.status == 200) {
                    callback(http.responseText)
                }
            }
        }
    }

    /**
     * call a server method
     * @param {String} className 
     * @param {String} functionName 
     * @param {Object} arg 
     * @param {Function} callback
     */
    static call(className, functionName, arg, callback) {
        Proxy.getListAvailable((data) => {
            const dispo = JSON.parse(data);
            const theClass = dispo[className];

            if (theClass != undefined) {
                for (let el of theClass.values()) { 
                    if (el == functionName) {
                        /**
                         * call the method to the server
                         */
                        const http = new XMLHttpRequest();
                        const url = `/api/${className}/${functionName}`;
                        
                        http.type = 'application/javascript';
                        http.open('POST', url, true);
                        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        
                        let data = '';
                        let i = 0;

                        for (let [key, value] of Object.entries(arg)) {
                            data += (i == 0 ? '': '&') + `${key}=${value}`;
                            i++;
                        }

                        http.send(data);
                
                        http.onreadystatechange = (e) => {
                            if (http.DONE == http.readyState) {
                                if (http.status == 200) {
                                    callback(http.responseText)
                                }
                            }
                        }                        

                        break;
                    }
                }
            }
        });
    }
}