/* global describe, it */

var props = require('../path-to-bem-properties.js');
require('should');

describe('path-to-bem-properties', function () {
    it('should extract block', function () {
        props('/block').should.have.property('block', 'block');
    });

    it('should extract block and element', function () {
        props('/block/__elem').should.have.property('elem', 'elem');
    });

    it('should extract block, element and mod', function () {
        props('/block/__elem/_mod').should.have.property('mod', 'mod');
    });

    it('should extract block and mod', function () {
        var p = props('/block/_mod');
        p.should.have.property('block', 'block');
        p.should.have.property('mod', 'mod');
    });

    it('should set level to empty string if not present', function () {
        // Because all paths should begins with '/' and 'block' will be after ''
        props('/block').should.have.property('level', 'default');
    });

    it('should set level to block parent', function () {
        props('/level/block').should.have.property('level', '/level');
    });

    it('should set bem to valid BEM identificator', function () {
        props('/level/block/__elem/_mod').should.have.property('bem', 'block__elem_mod');
    });
});
