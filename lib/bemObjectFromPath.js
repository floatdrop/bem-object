var BEMObject = require('./object.js');
var path = require('path');

module.exports = function getBemObjectFromPath(p, options) {
    options = options || {};

    options.elem = options.elem || '__';
    options.mod = options.mod || '_';

    var bem = new BEMObject();
    var parts = p.split(path.sep);
    while (parts.length) {
        var part = parts.pop();
        if (part.indexOf(options.elem) === 0) {
            bem.elem = part.slice(options.elem.length);
        } else if (part.indexOf(options.mod) === 0) {
            bem.mod = part.slice(options.mod.length);
        } else {
            bem.block = part;
            bem.level = parts.join('/');
            break;
        }
    }

    return bem;
};
