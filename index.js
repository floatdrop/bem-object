var basename = require('path').basename;
var dirname = require('path').dirname;
var BEMNaming = require('bem-naming').BEMNaming;

function BEMObject(props) {
    this.level = props.level;
    this.block = props.block;
    this.elem = props.elem;
    this.modName = props.modName;
    this.modVal = props.modVal;
}

function set(obj, prop, value) {
    if (value === undefined) { return; }
    obj[prop] = value;
}

BEMObject.prototype.copy = function (target) {
    if (typeof target !== 'object') {
        throw new Error('Target object should be instance of Object, not ' + typeof target);
    }

    var props = ['block', 'elem', 'modName', 'modVal'];

    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (target[prop]) { break; }
        set(target, prop, target[prop] || this[prop]);
    }

    return new BEMObject(target);
};


module.exports = function (path, options) {
    var parts = path;
    var naming = new BEMNaming(options);

    function id() {
        return naming.stringify(this);
    }

    if (typeof path === 'string') {
        parts = naming.parse(basename(path));
        if (!parts) { throw new Error('Could not parse "' + path + '"'); }
        parts.level = dirname(path);
    }

    var bem = new BEMObject(parts);

    Object.defineProperties(bem, {
        id: {
            get: id,
            enumerable: true
        },
        bem: {
            get: id,
            enumerable: true
        }
    });

    return bem;
};
