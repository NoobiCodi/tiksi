/**
 * get all methods from an array of instance
 * @returns {Object<String, Array>}
 */
exports.getAllMethods = (ar) => {
    let finalObj = {};
  
    for (let instance in ar) {
      const methods = Object.getOwnPropertyNames(ar[instance].constructor.prototype);
      finalObj[instance] = methods;
    }
    
    return finalObj;
};