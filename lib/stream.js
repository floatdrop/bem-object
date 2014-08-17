var create = require('./create.js');
var through = require('through2');
var readdirs = require('stream-dirs');
var basename = require('path').basename;

function createBemObject() {
    return through.obj(function (obj, enc, cb) {
        create(obj.path, cb);
    });
}

function isElement(path) { return /^__/.test(basename(path)); }
function isModificator(path) { return /^_[^_]/.test(basename(path)); }

function findBEMs(path) {
    return readdirs(path)
        .pipe(findElements())
        .pipe(findMods());
}

function findElements() {
    return through.obj(function (obj, enc, cb) {
        this.push(obj);
        readdirs(obj.path)
            .on('data', function (data) {
                if (isElement(data.path)) { this.push(data); }
            }.bind(this))
            .on('end', cb);
    });
}

function findMods() {
    return through.obj(function (obj, enc, cb) {
        this.push(obj);
        readdirs(obj.path)
            .on('data', function (data) {
                if (isModificator(data.path)) { this.push(data); }
            }.bind(this))
            .on('end', cb);
    });
}

function stream(path) {
    return findBEMs(path).pipe(createBemObject());
}

module.exports = stream;
