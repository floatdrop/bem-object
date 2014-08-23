var create = require('./create.js');
var through = require('through2');
var join = require('path').join;
var gs = require('glob-stream');

function createBemObject(path, options) {
    return through.obj(function (obj, enc, cb) {
        create(obj.path, options, function (err, bem) {
            if (err) { return cb(err); }
            cb(null, bem);
        });
    });
}

function stream(path, options) {
    options = options || {};

    options.elem = options.elem || '__';
    options.mod = options.mod || '_';

    var globs = [
        join(path, '*'),        // blocks
        join(path, '*/*'),      // block mods, block elems
        join(path, '*/*/*'),    // block mod values, block elems mods
        join(path, '*/*/*/*')   // block elem mods value
    ];

    return gs.create(globs, { base: path, dot: false })
        .pipe(createBemObject(path, options));

}

module.exports = stream;
