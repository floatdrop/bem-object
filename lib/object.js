var join = require('path').join;
var assign = require('object-assign');
var deps = require('./deps.js');

function BEMObject(props) {
    assign(this, props);
}

BEMObject.prototype.copy = function (target) {
    if (typeof target !== 'object') { return undefined; }

    var result = new BEMObject({
        level: this.level,
        block: target.block || this.block,
    });
    /*
        elem: target.block === undefined ? target.elem || this.elem : undefined,
        mod: target.mod || this.mod,
        value: target.value || this.value
    });
    */
    
    return result;
};

function path() {
    var result = join(this.level, this.block);
    if (this.elem) { result = join(result, '__' + this.elem); }
    if (this.mod) { result = join(result, '_' + this.mod); }
    return result;
}

function bem() {
    var r = this.block;
    if (this.elem) { r += '__' + this.elem; }
    if (this.mod) { r += '_' + this.mod; }
    if (this.value) { r += '_' + this.value; }
    return r;
}

function id() {
    var bem = this.block;
    if (this.elem) { bem += '__' + this.elem; }
    if (this.mod) { bem += '_' + this.mod; }
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
    get: bem,
    enumerable: true
});



function blocksFrom(property) {
    return function () {
        var self = this;
        
        var blocks = this[property];
        if (!Array.isArray(blocks)) { blocks = [blocks]; }
        
        return blocks.reduce(function (p, deps) {
            return p.concat(deps.expand(deps, self));
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
