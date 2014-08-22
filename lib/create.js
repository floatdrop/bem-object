var rod = require('require-or-die');
var fs = require('fs');
var fromPath = require('./fromPath.js');
var assign = require('object-assign');
var path = require('path');
var parse = require('parse-bem-identifier');

function prepeareDeps(deps) {
    if (Array.isArray(deps)) { deps = deps[0]; } // hack to support arrays in bem-core and bem-components

    deps.value = deps.value || deps.val;
    deps.require = deps.require || deps.mustDeps;
    deps.expect = deps.expect || deps.shouldDeps;
    deps.ignore = deps.ignore || deps.noDeps;

    delete deps.val;
    delete deps.noDeps;
    delete deps.mustDeps;
    delete deps.shouldDeps;

    return deps;
}

function loadDepsFile(bem, cb) {
    var depsFile = path.join(bem.path, bem.bem + '.deps.js');
    fs.exists(depsFile, function (exists) {
        if (!exists) { return cb(null, null); }
        rod(depsFile, function (err, value) {
            if (err) { return cb(err); }
            try {
                cb(null, prepeareDeps(value));
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
