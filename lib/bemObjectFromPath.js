var BEMObject = require('./object.js');
var path = require('path');

module.exports = function getBemObjectFromPath(p) {
    var bem = new BEMObject({ path: p });
    var parts = p.split(path.sep);
    while (parts.length) {
        var part = parts.pop();
        if (part.indexOf('__') === 0) {
            bem.elem = part.slice(2);
        } else if (part[0] === '_') {
            bem.mod = part.slice(1);
        } else {
            bem.block = part;
            bem.level = parts.join('/');
            break;
        }
    }

    if (bem.level === '') { bem.level = 'default'; }

    return bem;
};
