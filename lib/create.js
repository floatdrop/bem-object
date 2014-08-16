var fs = require('fs');
var fromPath = require('./fromPath.js');
var run = require('vm').runInThisContext;
var assign = require('object-assign');
var join = require('path').join;

function evalContent(content, path) {
    var deps = run(content, path);
    deps.require = deps.require || deps.mustDeps;
    deps.expect = deps.expect || deps.shouldDeps;
    deps.ignore = deps.ignore || deps.noDeps;

    delete deps.noDeps;
    delete deps.mustDeps;
    delete deps.shouldDeps;

    return deps;
}

function readAndEval(path, cb) {
    fs.exists(path, function (exists) {
        if (!exists) { return cb(null, null); }
        fs.readFile(path, function (err, content) {
            if (err) { return cb(err); }
            try {
                cb(null, evalContent(content, path));
            } catch (err) {
                cb(err);
            }
        });
    });
}

module.exports = function (path, cb) {
    var bem = fromPath(path);
    var depsFile = join(path, bem.bem + '.deps.js');
    readAndEval(depsFile, function (err, obj) {
        if (err) { return cb(err); }
        cb(null, assign(bem, obj));
    });
};
