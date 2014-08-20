var fs = require('fs');
var fromPath = require('./fromPath.js');
var run = require('vm').runInThisContext;
var assign = require('object-assign');
var path = require('path');
var parse = require('parse-bem-identifier');

function prepeareDeps(content, path) {
    var deps = run(content, path);
    deps.require = deps.require || deps.mustDeps;
    deps.expect = deps.expect || deps.shouldDeps;
    deps.ignore = deps.ignore || deps.noDeps;

    delete deps.noDeps;
    delete deps.mustDeps;
    delete deps.shouldDeps;

    return deps;
}

function loadDepsFile(bem, cb) {
    var depsFile = path.join(bem.path, bem.bem + '.deps.js');
    fs.exists(depsFile, function (exists) {
        if (!exists) { return cb(null, null); }
        fs.readFile(depsFile, function (err, content) {
            if (err) { return cb(err); }
            try {
                cb(null, prepeareDeps(content, depsFile));
            } catch (err) {
                cb(err);
            }
        });
    });
}

module.exports = function (fullpath, cb) {
    fs.stat(fullpath, function (err, stat) {
        if (err) { return cb(err); }
        var dirname = fullpath;

        if (!stat.isDirectory()) {
            dirname = path.dirname(fullpath);
        }

        var bem = fromPath(dirname);

        if (!stat.isDirectory()) {
            var fileName = path.basename(fullpath, path.extname(fullpath));
            bem.value = parse(fileName, {short: true}).value;
            if (bem.value === undefined) {
                return cb();
            }
        }

        loadDepsFile(bem, function (err, obj) {
            if (err) { return cb(err); }
            cb(null, assign(bem, obj));
        });
    });
};
