var assign = require('object-assign');
var BEMObject = require('./object.js');
var path = require('path');

module.exports = function (p, options, ext) {
    options = options || {};

    options.elem = options.elem || '__';
    options.mod = options.mod || '_';

    function isElem(part) { return part.indexOf(options.elem) === 0; }
    function isMod(part) { return part.indexOf(options.mod) === 0; }

    var bem = new BEMObject();
    var parts = p.split(path.sep);

    var part = parts.pop();

    if (!isElem(part)) {
        if (isMod(part)) {
            bem.mod = part.slice(options.mod.length);
            part = parts.pop();
        }

        if (isElem(part)) {
            bem.elem = part.slice(options.elem.length);
            part = parts.pop();
        }
    }
    
    if (isElem(part)) {
        bem.elem = part.slice(options.elem.length);
        part = parts.pop();
    }

    bem.block = part;
    bem.level = parts.join(path.sep);

    return assign(bem, ext);
};
