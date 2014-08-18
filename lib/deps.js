var BEMObject = require('./object.js');
var assign = require('object-assign');

function expand(deps, bem) {
    var res = [];
    var predefined = new BEMObject();
    
    if (!deps.block) {
        predefined.block = bem.block;
    }
    
    if (deps.elem && deps.elems) {
        throw new Error(bem.block + ' cannot have `elem` and `elems` in its dependencies')
    }
    
    if (deps.mod && deps.mods) {
        throw new Error(bem.block + ' cannot have `mod` and `mods` in its dependencies')
    }
    
    if (deps.elems) {
        deps.elems.each(function(elem) {
            res.push(assign(predefined, { elem: elem }));
        });
    }
    
    if (deps.mods) {
        Object.keys(deps).each(function(mod) {
            if (typeof deps.mods[mod] === 'string') {
                deps.mods[mod] = [deps.mods[mod]];
            }
            deps.mods[mod].each(function(value) {
                res.push(assign(predefined, { mod: mod, value: value }));
            })
        });
    }
    
    return res;
}

module.exports.expand = expand;