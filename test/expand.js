/* global describe, it */

var BEMObject = require('../lib/object.js');
require('should');

describe.only('object.expand', function () {

    describe('with context object', function () {
        it('should take elem from context object, if mod is defined', function () {
            new BEMObject({
                level: 'level',
                block: 'block',
                elem: 'elem'
            }).expand({ mod: 'mod' }).should.eql({
                level: 'level', block: 'block', elem: 'elem', mod: 'mod'
            });
        });
        
        it('should not take elem from context object, if block and mod is defined', function () {
            new BEMObject({
                level: 'level',
                block: 'block',
                elem: 'elem'
            }).expand({ block: 'block', mod: 'mod' }).should.eql({
                level: 'level', block: 'block', mod: 'mod'
            });
        });
        
        it('should take undefined properties from context', function () {
            var bem = new BEMObject({
                level: 'two',
                block: 'two',
                elem: 'two',
                mod: 'two',
                value: 'two'
            });
            
            bem.expand({ block: 'one' }).should.eql({
                level: 'two', block: 'one'
            });
            
            bem.expand({ elem: 'one' }).should.eql({
                level: 'two', block: 'two', elem: 'one'
            });
            
            bem.expand({ mod: 'one' }).should.eql({
                level: 'two', block: 'two', elem: 'two', mod: 'one'
            });
            
            bem.expand({ value: 'one' }).should.eql({
                level: 'two', block: 'two', elem: 'two', mod: 'two', value: 'one'
            });
        });
        
        it('should not override properties from context, if they are in deps object', function () {
            new BEMObject({
                level: 'two',
                block: 'two',
                elem: 'two',
                mod: 'two',
                value: 'two'
            }).expand({ level: 'one', block: 'one', elem: 'one', mod: 'one', value: 'one' }).should.eql({
                level: 'one', block: 'one', elem: 'one', mod: 'one', value: 'one'
            });
        });
    });

    var bem = new BEMObject();

    it('should throw expection on empty object', function () {
        (function () {
            bem.expand({});    
        }).should.throw();
    });

    it('should properly handle single elem', function () {
        bem.expand({ elem: 'singleElem' }).should.eql({
            elem: 'singleElem'
        });
    });
    
    it('should properly handle multiply elements', function () {
        bem.expand({ elems: ['row', 'cell'] }).should.eql([
            { elem: 'row' },
            { elem: 'cell' }
        ]);
    });
    
    it('should properly handle single mod with value', function () {
        bem.expand({ mod: 'color', value: 'white' }).should.eql({
            mod: 'color', value: 'white'
        });
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
