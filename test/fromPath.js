/* global describe, it */

var fromPath = require('../lib/fromPath.js');
var path = require('path');
require('should');

var block = path.join(__dirname, './fixtures/block/__elem/_mod');

describe('BEMobject.fromPath', function () {
    it('should construct BEM object from path', function () {
        fromPath(block)
            .should.eql({
                block: 'block',
                elem: 'elem',
                mod: 'mod',
                level: 'fixtures',
                bem: 'block__elem_mod'
            });
    });
});
