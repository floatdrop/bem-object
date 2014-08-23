/* global describe, it */

var fromPath = require('../lib/fromPath.js');
var path = require('path');
require('should');

var nodeps = path.join(__dirname, './fixtures/nodeps/__elem/_mod');

describe('BEMobject.fromPath', function () {
    it('should extract block', function () {
        fromPath('/block').should.have.property('block', 'block');
    });

    it('should extract block and element', function () {
        fromPath('/block/__elem').should.have.property('elem', 'elem');
    });

    it('should extract block, element and mod', function () {
        fromPath('/block/__elem/_mod').should.have.property('mod', 'mod');
    });

    it('should extract block and mod', function () {
        var p = fromPath('/block/_mod');
        p.should.have.property('block', 'block');
        p.should.have.property('mod', 'mod');
    });

    it('should set level to empty string if not present', function () {
        // Because all paths should begins with '/' and 'block' will be after ''
        fromPath('/block').should.have.property('level', '');
    });

    it('should set level to block parent', function () {
        fromPath('/level/block').should.have.property('level', '/level');
    });

    it('should set bem to valid BEM identificator', function () {
        fromPath('/level/block/__elem/_mod').should.have.property('bem', 'block__elem_mod');
    });

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
        var bem = fromPath(nodeps, {}, { prop: true });
        bem.should.have.property('prop', true);
    });
});
