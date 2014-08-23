/* global describe, it */

var BEMObject = require('../lib/object.js');
require('should');

describe('BEMobject.copy', function () {
    it('should throw if target is not an object', function () {
        (function () {
            new BEMObject().copy(1);
        }).should.throw();
    });

    it('should take elem from context object, if mod is defined', function () {
        new BEMObject({
            level: 'level',
            block: 'block',
            elem: 'elem'
        }).copy({ mod: 'mod' }).should.eql({
            level: 'level', block: 'block', elem: 'elem', mod: 'mod'
        });
    });

    it('should not take elem from context object, if block and mod is defined', function () {
        new BEMObject({
            level: 'level',
            block: 'block',
            elem: 'elem'
        }).copy({ block: 'block', mod: 'mod' }).should.eql({
            level: 'level', block: 'block', mod: 'mod'
        });
    });

    it('should take undefined properties from context', function () {
        var bem = new BEMObject({
            level: 'two',
            block: 'two',
            elem: 'two',
            mod: 'two',
            val: 'two'
        });

        bem.copy({ block: 'one' }).should.eql({
            level: 'two', block: 'one'
        });

        bem.copy({ elem: 'one' }).should.eql({
            level: 'two', block: 'two', elem: 'one'
        });

        bem.copy({ mod: 'one' }).should.eql({
            level: 'two', block: 'two', elem: 'two', mod: 'one'
        });

        bem.copy({ val: 'one' }).should.eql({
            level: 'two', block: 'two', elem: 'two', mod: 'two', val: 'one'
        });
    });

    it('should not override properties from context, if they are in deps object', function () {
        new BEMObject({
            level: 'two',
            block: 'two',
            elem: 'two',
            mod: 'two',
            val: 'two'
        }).copy({ level: 'one', block: 'one', elem: 'one', mod: 'one', val: 'one' }).should.eql({
            level: 'one', block: 'one', elem: 'one', mod: 'one', val: 'one'
        });
    });
});
