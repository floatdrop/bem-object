/* global describe, it */

var fromPath = require('../lib/fromPath.js');
var path = require('path');
require('should');

var nodeps = path.join(__dirname, './fixtures/nodeps/__elem/_mod');

describe('BEMobject.fromPath', function () {
    it('should construct BEM object from path', function () {
        var bem = fromPath(nodeps);
        bem.should.eql({
            block: 'nodeps',
            elem: 'elem',
            mod: 'mod',
            level: path.join(__dirname, 'fixtures')
        });
        bem.should.have.property('path', nodeps);
        bem.should.have.property('bem', 'nodeps__elem_mod');
        bem.should.have.property('id', 'nodeps__elem_mod');
    });

    it('should add properties from ext parameter', function () {
        var bem = fromPath(nodeps, { prop: true });
        bem.should.have.property('prop', true);
    });
});
