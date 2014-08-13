/* global describe, it */

var fromPath = require('../lib/fromPath.js');
var path = require('path');
require('should');

var block = path.join(__dirname, './fixtures/block/__elem/_mod');

describe('BEMobject.fromPath', function () {
    it('should construct BEM object from path', function () {
        var bem = fromPath(block);
        bem.should.have.property('block', 'block');
        bem.should.have.property('elem', 'elem');
        bem.should.have.property('mod', 'mod');
        bem.should.have.property('level', 'fixtures');
        bem.should.have.property('bem', 'block__elem_mod');
        bem.should.have.property('path');
    });
});
