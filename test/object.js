/* global describe, it */

var BEMObject = require('../lib/object.js');
require('should');

describe('BEMobject', function () {
    it('should create BEMObject', function () {
        var bem = new BEMObject();
        bem.should.be.instanceOf(BEMObject);
    });

    it('should accept properties as argument', function () {
        var bem = new BEMObject({test: true});
        bem.should.have.property('test', true);
    });

    it('should return empty array from required by default', function () {
        var bem = new BEMObject();
        bem.required.should.eql([]);
        bem.expected.should.eql([]);
    });

    it('should return filled BEMObjects from required', function () {
        var bem = new BEMObject({
            level: 'level',
            require: { block: 'new' },
            expect: { block: 'new' }
        });
        bem.required.should.eql([{ level: 'level', block: 'new' }]);
        bem.expected.should.eql([{ level: 'level', block: 'new' }]);
    });
});
