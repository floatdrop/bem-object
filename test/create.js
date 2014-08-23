/* global describe, it */

var create = require('../lib/create.js');
var path = require('path');
var should = require('should');

var modvalue = path.join(__dirname, './fixtures/nodeps/__elem/_mod/nodeps__elem_mod_true.css');
var nodeps = path.join(__dirname, './fixtures/nodeps/__elem/_mod');

describe('BEMobject.create', function () {
    it('should create block from mod_value file', function (done) {
        create(modvalue, function (err, bem) {
            should.not.exist(err);
            bem.should.eql({
                block: 'nodeps',
                elem: 'elem',
                mod: 'mod',
                val: 'true',
                level: path.join(__dirname, 'fixtures')
            });
            bem.should.have.property('path', nodeps);
            bem.should.have.property('bem', 'nodeps__elem_mod_true');
            bem.should.have.property('id', 'nodeps__elem_mod_true');
            done();
        });
    });

    it('should create block from directory', function (done) {
        create(nodeps, function (err, bem) {
            should.not.exist(err);
            bem.should.eql({
                block: 'nodeps',
                elem: 'elem',
                mod: 'mod',
                level: path.join(__dirname, 'fixtures')
            });
            bem.should.have.property('path', nodeps);
            bem.should.have.property('bem', 'nodeps__elem_mod');
            bem.should.have.property('id', 'nodeps__elem_mod');
            done();
        });
    });
});
