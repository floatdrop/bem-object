var join = require('path').join;
var assign = require('object-assign');

function BEMObject(props) {
    assign(this, props);
}

BEMObject.prototype.copy = function (target) {
    if (typeof target !== 'object') { return undefined; }
    var result = new BEMObject({});

    ['level', 'block', 'mod', 'value'].forEach(function (prop) {
        var item = target[prop] || this[prop];
        if (item) {
            result[prop] = item;
        }
    });

    if (target.block === undefined) {
        var elem = target.elem || this.elem;
        if (elem) {
            result.elem = elem;
        }
    }

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

        return blocks.reduce(function (p, dep) {
            return p.concat(self.expand(dep));
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

BEMObject.prototype.expand = function expand(deps) {
    var self = this;
    var res = [];
    var bem = this;
    var keys = Object.keys(deps);

    if (Object.keys(deps).length === 0) {
        throw new Error(this.block + ' have empty deps object');
    }

    if (keys.indexOf('elem') !== -1  && keys.indexOf('elems') !== -1) {
        throw new Error(bem.block + ' cannot have `elem` and `elems` in its dependencies');
    }

    if (keys.indexOf('mod') !== -1  && keys.indexOf('mods') !== -1) {
        throw new Error(bem.block + ' cannot have `mod` and `mods` in its dependencies');
    }

    if (deps.elem) {
        deps.elems = [deps.elem];
    }

    if (deps.mod) {
        deps.mods = {};
        deps.mods[deps.mod] = [deps.value];
    }

    if (deps.elems) {
        deps.elems.forEach(function(elem) {
            res.push(this.copy({ elem: elem }));
        }, self);
    }

    if (deps.mods) {
        Object.keys(deps.mods).forEach(function(mod) {
            if (typeof deps.mods[mod] === 'string') {
                deps.mods[mod] = [deps.mods[mod]];
            }
            deps.mods[mod].forEach(function(value) {
                res.push(this.copy({ mod: mod, value: value }));
            }, self);
        });
    }

    return res;
};

module.exports = BEMObject;
