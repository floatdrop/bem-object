var assign = require('object-assign');

function BEMObject(props) {
    assign(this, props);
}

BEMObject.prototype.copy = function (target) {
    if (typeof target !== 'object') { return undefined; }

    target.level = target.level || this.level;
    target.block = target.block || this.block;

    return target;
};

function blocksFrom(property) {
    return function () {
        var blocks = this[property];
        if (!Array.isArray(blocks)) { blocks = [blocks]; }
        return blocks.map(this.copy.bind(this)).filter(Boolean);
    };
}

Object.defineProperty(BEMObject.prototype, 'required', {
    get: blocksFrom('require')
});

Object.defineProperty(BEMObject.prototype, 'expected', {
    get: blocksFrom('expect')
});

module.exports = BEMObject;
