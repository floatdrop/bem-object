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
            level: 'fixtures',
            bem: 'nodeps__elem_mod',
            path: nodeps
        });
    });
});
