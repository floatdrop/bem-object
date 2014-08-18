/* global describe, it */

var BEMObject = require('../lib/object.js');
var expand = require('../lib/deps.js').expand;
require('should');

describe.only('deps.expand', function () {

    describe('with context object', function () {
        it('should take elem from context object, if mod is defined', function () {
            expand({ mod: 'mod' }, new BEMObject({
                level: 'level',
                block: 'block',
                elem: 'elem'
            })).should.eql({
                level: 'level', block: 'block', elem: 'elem', mod: 'mod'
            });
        });
        
        it('should not take elem from context object, if block and mod is defined', function () {
            expand({ block: 'block', mod: 'mod' }, new BEMObject({
                level: 'level',
                block: 'block',
                elem: 'elem'
            })).should.eql({
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
            
            expand({ block: 'one' }, bem).should.eql({
                level: 'two', block: 'one'
            });
            
            expand({ elem: 'one' }, bem).should.eql({
                level: 'two', block: 'two', elem: 'one'
            });
            
            expand({ mod: 'one' }, bem).should.eql({
                level: 'two', block: 'two', elem: 'two', mod: 'one'
            });
            
            expand({ value: 'one' }, bem).should.eql({
                level: 'two', block: 'two', elem: 'two', mod: 'two', value: 'one'
            });
        });
        
        it('should not override properties from context, if they are in deps object', function () {
            expand({ level: 'one', block: 'one', elem: 'one', mod: 'one', value: 'one' }, new BEMObject({
                level: 'two',
                block: 'two',
                elem: 'two',
                mod: 'two',
                value: 'two'
            })).should.eql({
                level: 'one', block: 'one', elem: 'one', mod: 'one', value: 'one'
            });
        });
    });

    it('should throw expection on empty object', function () {
        (function () {
            expand({});    
        }).should.throw();
    });

    it('should properly handle single elem', function () {
        expand({ elem: 'singleElem' }).should.eql({
            elem: 'singleElem'
        });
    });
    
    it('should properly handle multiply elements', function () {
        expand({ elems: ['row', 'cell'] }).should.eql([
            { elem: 'row' },
            { elem: 'cell' }
        ]);
    });
    
    it('should properly handle single mod with value', function () {
        expand({ mod: 'color', value: 'white' }).should.eql({
            mod: 'color', value: 'white'
        });
    });
    
    it('should properly handle multiple mods with single values', function () {
        expand({ mods: { color: 'white', position: 'top' }}).should.eql([
            { mod: 'color', value: 'white' },
            { mod: 'position', value: 'top' }
        ]);
    });
    
    it('should properly handle multiple mods with multiple values', function () {
        expand({ mods: { color: 'white', position: ['top', 'bottom'] }}).should.eql([
            { mod: 'color', value: 'white' },
            { mod: 'position', value: 'top' },
            { mod: 'position', value: 'bottom' }
        ]);
    });
    
    it('should throw exception when both `elem` and `elems` defined (also `mod` and `mods`)', function () {
        expand({ elem: '', elems: [] }).should.throw();
        expand({ mod: '', mods: [] }).should.throw();
    });
    
});
