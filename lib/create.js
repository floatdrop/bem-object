var fs = require('fs');
var fromPath = require('./fromPath.js');
var path = require('path');
var parse = require('parse-bem-identifier');

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
            bem.value = bem.value.split('.')[0];
        }

        cb(null, bem);
    });
};
