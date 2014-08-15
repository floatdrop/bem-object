var assign = require('object-assign');
var bemObjectFromPath = require('./bemObjectFromPath.js');

module.exports = function (path, ext) {
    return assign(bemObjectFromPath(path), ext);
};
