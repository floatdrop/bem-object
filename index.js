var basename = require('path').basename;
var dirname = require('path').dirname;
var join = require('path').join;
var naming = require('bem-naming');

function BEMObject(props) {
    this.level = props.level;
    this.block = props.block;
    this.elem = props.elem;
    this.modName = props.modName;
    this.modVal = props.modVal;
    this.tech = props.tech;
}

function defaultPath() {
    return join(this.level, this.id + '.' + this.tech);
}

BEMObject.prototype.copy = function (target) {
    if (typeof target !== 'object') {
        throw new Error('Target object should be instance of Object, not ' + typeof target);
    }

    var props = ['block', 'elem', 'modName', 'modVal'];

    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (target[prop]) { break; }
        target[prop] = this[prop];
    }

    target.tech = target.tech || this.tech;
    target.path = this.path;

    return new BEMObject(target);
};


module.exports = function (path, options) {
    var parts = path;
    var _naming = options ? new naming.BEMNaming(options) : naming;

    function id() {
        return _naming.stringify(this);
    }

    if (typeof path === 'string') {
        var base = basename(path);
        var nameparts = base.split('.');

        if (nameparts.length === 1) {
            throw new Error('Basename should have extension, but got ' + base);
        }

        var bem = nameparts.shift();
        var tech = nameparts.join('.');
        parts = _naming.parse(bem);

        if (!parts) { throw new Error('Could not parse "' + bem + '"'); }
        parts.tech = tech;
        parts.level = dirname(path);
    }

    var bem = new BEMObject(parts);

    Object.defineProperties(bem, {
        path: {
            get: defaultPath,
            enumerable: true
        },
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
