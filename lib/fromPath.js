var pathToBemProperties = require('../path-to-bem-properties.js');

module.exports = function (path) {
    var obj = pathToBemProperties(path);
    obj.path = path;
    return obj;
};
