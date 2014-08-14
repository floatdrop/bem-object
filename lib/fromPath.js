var assign = require('object-assign');
var pathToBemProperties = require('../path-to-bem-properties.js');

module.exports = function (path, ext) {
    return assign(pathToBemProperties(path), ext);
};
