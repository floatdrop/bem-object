var create = require('./create.js');
var through = require('through2');
var relative = require('path').relative;
var join = require('path').join;
var gs = require('glob-stream');

function createBemObject() {
    return through.obj(function (obj, enc, cb) {
        create(relative(obj.cwd, obj.path), cb);
    });
}

function stream(path, options) {
    options = options || {};

    options.elem = options.elem || '__';
    options.mod = options.mod || '_';

    var globs = [
        join(path, '[^_]*'),                // blocks
        join(path, '[^_]*/_[^_]*'),         // blocks mods
        join(path, '[^_]*/_[^_]*/*'),       // blocks mods values
        join(path, '[^_]*/__*'),            // blocks elems
        join(path, '[^_]*/__*/_[^_]*'),     // blocks elems mods
        join(path, '[^_]*/__*/_[^_]*/*'),   // blocks elems mods values
    ];

    return gs.create(globs, { dot: false })
        .pipe(createBemObject());
}

module.exports = stream;
