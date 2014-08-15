var path = require('path');

module.exports = function getBemProperties(p) {
    var bem = { path: p };
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

    bem.bem = bem.block;
    if (bem.elem) { bem.bem += '__' + bem.elem; }
    if (bem.mod) { bem.bem += '_' + bem.mod; }

    bem.id = bem.bem;

    if (bem.level === '') { bem.level = 'default'; }

    return bem;
};
