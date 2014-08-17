/* global describe, it */

var stream = require('../lib/stream.js');
var assert = require('stream-assert');
var join = require('path').join;

var someblocks = join(__dirname, 'fixtures/someblocks');
var fullblock = join(__dirname, 'fixtures/fullblock');

describe('stream', function () {
    it('should read all blocks in path', function (done) {
        stream(someblocks).pipe(assert.length(3)).on('end', done);
    });

    it('should read full block structure', function (done) {
        stream(fullblock)
            .pipe(assert.length(4))
            .on('end', done);
    });
});
