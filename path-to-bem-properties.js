var path = require('path');

module.exports = function getBemProperties(p) {
    var deps = {};
    var parts = p.split(path.sep);
    while (parts.length) {
        var part = parts.pop();
        if (part.indexOf('__') === 0) {
            deps.elem = part.slice(2);
        } else if (part[0] === '_') {
            deps.mod = part.slice(1);
        } else {
            deps.block = part;
            deps.level = parts[parts.length - 1];
            break;
        }
    }

    deps.bem = deps.block;
    if (deps.elem) { deps.bem += '__' + deps.elem; }
    if (deps.mod) { deps.bem += '_' + deps.mod; }

    return deps;
};
