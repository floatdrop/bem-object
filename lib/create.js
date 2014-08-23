var fs = require('fs');
var fromPath = require('./fromPath.js');
var path = require('path');
var BEM = require('bem-naming').BEMNaming;

module.exports = function (fullpath, options, cb) {
    if (typeof options === 'function') {
        cb = options;
        options = {};
    }

    fs.stat(fullpath, function (err, stat) {
        if (err) { return cb(err); }
        var dirname = fullpath;

        if (!stat.isDirectory()) {
            dirname = path.dirname(fullpath);
        }

        var bem = fromPath(dirname, options);

        if (!stat.isDirectory()) {
            var naming = new BEM(options);
            var fileName = path.basename(fullpath).split('.')[0];
            bem.val = naming.parse(fileName).modVal;
            if (bem.val === undefined) {
                return cb();
            }
        }

        cb(null, bem);
    });
};
