/* global describe, it */

var BEMObject = require('../lib/object.js');
require('should');

describe('BEMobject.expand', function () {
    var bem = new BEMObject();

    it('should throw expection on empty object', function () {
        (function () {
            bem.expand({});
        }).should.throw();
    });

    it('should properly handle single elem', function () {
        bem.expand({ elem: 'singleElem' }).should.eql([{
            elem: 'singleElem'
        }]);
    });

    it('should properly handle multiple elements', function () {
        bem.expand({ elems: ['row', 'cell'] }).should.eql([
            { elem: 'row' },
            { elem: 'cell' }
        ]);
    });

    it('should properly handle single mod with value', function () {
        bem.expand({ mod: 'color', value: 'white' }).should.eql([{
            mod: 'color', value: 'white'
        }]);
    });

    it('should properly handle multiple mods with single values', function () {
        bem.expand({ mods: { color: 'white', position: 'top' }}).should.eql([
            { mod: 'color', value: 'white' },
            { mod: 'position', value: 'top' }
        ]);
    });

    it('should properly handle multiple mods with multiple values', function () {
        bem.expand({ mods: { color: 'white', position: ['top', 'bottom'] }}).should.eql([
            { mod: 'color', value: 'white' },
            { mod: 'position', value: 'top' },
            { mod: 'position', value: 'bottom' }
        ]);
    });

    it('should throw exception when both `elem` and `elems` defined (also `mod` and `mods`)', function () {
        (function() { bem.expand({ elem: '', elems: [] }) }).should.throw();
        (function() { bem.expand({ mod: '', mods: [] }) }).should.throw();
    });

});
