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
});
