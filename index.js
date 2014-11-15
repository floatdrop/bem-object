var basename = require('path').basename;
var dirname = require('path').dirname;
var join = require('path').join;
var BEMNaming = require('bem-naming').BEMNaming;

function BEMObject(props) {
    this.level = props.level;
    this.block = props.block;
    this.elem = props.elem;
    this.modName = props.modName;
    this.modVal = props.modVal;
    this.tech = props.tech;
}

function set(obj, prop, value) {
    if (value === undefined) { return; }
    obj[prop] = value;
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
        set(target, prop, target[prop] || this[prop]);
    }

    target.tech = target.tech || this.tech;
    target.path = this.path;

    return new BEMObject(target);
};


module.exports = function (path, options) {
    var parts = path;
    var naming = new BEMNaming(options);

    function id() {
        return naming.stringify(this);
    }

    if (typeof path === 'string') {
        var base = basename(path);
        var idx = base.indexOf('.');

        if (idx === -1) {
            throw new Error('Basename should have extension, but got ' + base);
        }

        var tech = base.substring(idx + 1);
        var bem = basename(path, '.' + tech);
        parts = naming.parse(bem);
        if (!parts) { throw new Error('Could not parse "' + bem + '"'); }
        parts.tech = tech;
        parts.level = dirname(path);
    }

    var bem = new BEMObject(parts);

    Object.defineProperty(bem, 'path', {
        get: defaultPath,
        enumerable: true
    });

    Object.defineProperty(bem, 'id', {
        get: id,
        enumerable: true
    });

    Object.defineProperty(bem, 'bem', {
        get: id,
        enumerable: true
    });

    return bem;
};
