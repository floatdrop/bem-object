var assign = require('object-assign');
var bemObjectFromPath = require('./bemObjectFromPath.js');

module.exports = function (path, options, ext) {
    options = options || {};

    options.elem = options.elem || '__';
    options.mod = options.mod || '_';

    return assign(bemObjectFromPath(path, options), ext);
};
