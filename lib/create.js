var fs = require('fs');
var fromPath = require('./fromPath.js');
var run = require('vm').runInThisContext;
var assign = require('object-assign');
var join = require('path').join;

module.exports = function (path, cb) {
    var bem = fromPath(path);
    var depsFile = join(path, bem.bem + '.deps.js');
    fs.exists(depsFile, function (exists) {
        if (!exists) { return cb(null, bem); }
        fs.readFile(depsFile, function (err, content) {
            if (err) { return cb(err); }
            try {
                var deps = run(content, depsFile);
                deps.require = deps.require || deps.mustDeps;
                deps.expect = deps.expect || deps.shouldDeps;

                delete deps.mustDeps;
                delete deps.shouldDeps;

                assign(bem, deps);
                cb(null, bem);
            } catch (err) {
                cb(err);
            }
        });
    });
};
