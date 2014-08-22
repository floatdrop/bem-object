var join = require('path').join;
var assign = require('object-assign');
var normalize = require('deps-normalize');

function BEMObject(props) {
    assign(this, props);
}

function set(obj, prop, value) {
    if (value === undefined) { return; }
    obj[prop] = value;
}

BEMObject.prototype.copy = function (target) {
    if (typeof target !== 'object') {
        throw new Error('Target object should be instance of Object, not ' + typeof target);
    }

    if (target.val) { target.value = target.val; }

    var props = ['level', 'block', 'elem', 'mod', 'value'];

    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (target[prop]) { break; }
        set(target, prop, target[prop] || this[prop]);
    }

    return new BEMObject(target);
};

function path() {
    var result = join(this.level, this.block);
    if (this.elem) { result = join(result, '__' + this.elem); }
    if (this.mod) { result = join(result, '_' + this.mod); }
    return result;
}

function id() {
    var bem = this.block;
    if (this.elem) { bem += '__' + this.elem; }
    if (this.mod) { bem += '_' + this.mod; }
    if (this.value) { bem += '_' + this.value; }
    return bem;
}

Object.defineProperty(BEMObject.prototype, 'path', {
    get: path,
    enumerable: true
});

Object.defineProperty(BEMObject.prototype, 'id', {
    get: id,
    enumerable: true
});

Object.defineProperty(BEMObject.prototype, 'bem', {
    get: id,
    enumerable: true
});

function blocksFrom(property) {
    return function () {
        var self = this;

        var blocks = this[property] || [];
        if (!Array.isArray(blocks)) { blocks = [blocks]; }

        return blocks.reduce(function (p, dep) {
            var deps = normalize(dep).map(self.copy, self);
            return p.concat(deps);
        }, []);
    };
}

Object.defineProperty(BEMObject.prototype, 'required', {
    get: blocksFrom('require'),
    enumerable: false
});

Object.defineProperty(BEMObject.prototype, 'expected', {
    get: blocksFrom('expect'),
    enumerable: false
});

module.exports = BEMObject;
