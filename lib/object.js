var assign = require('object-assign');

function BEMObject(props) {
    assign(this, props);
}

BEMObject.prototype.copy = function (target) {
    if (typeof target !== 'object') { return undefined; }

    var result = new BEMObject(target);

    result.level = result.level || this.level;
    result.block = result.block || this.block;

    return result;
};

function blocksFrom(property) {
    return function () {
        var blocks = this[property];
        if (!Array.isArray(blocks)) { blocks = [blocks]; }
        return blocks.map(this.copy.bind(this)).filter(Boolean);
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
