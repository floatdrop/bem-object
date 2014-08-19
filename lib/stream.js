var create = require('./create.js');
var through = require('through2');
var relative = require('path').relative;
var join = require('path').join;
var gs = require('glob-stream');
var fs = require('fs');

function createBemObject() {
    return through.obj(function (obj, enc, cb) {
        create(relative(obj.cwd, obj.path), cb);
    });
}

function isDirectory() {
    return through.obj(function (obj, enc, cb) {
        fs.stat(obj.path, function (err, stat) {
            if (err) { return cb(err); }
            if (!stat.isDirectory()) { return cb(); }
            cb(null, obj);
        });
    });
}

function stream(path) {
    var globs = [
        join(path, '[^_]*'),        // all blocks
        join(path, '[^_]*/_[^_]*'), // all blocks mods
        join(path, '[^_]*/__*'),          // all blocks elems
        join(path, '[^_]*/__*/_[^_]*'),   // all blocks elems mods
    ];

    return gs.create(globs, { dot: false })
        .pipe(isDirectory())
        .pipe(createBemObject());
}

module.exports = stream;
