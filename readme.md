# bem-object [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

BEM object contains definition of BEM "blocks" in notion, that it could be either block itself, or element of a block, or block with modificator, etc...

Each object should contain next properties:

 * `path` - full path to directory, that contains block files
 * `block` - name of the block
 * `elem` - name of the element
 * `mod` - name of the modificator
 * `value` - value of the modificator
 * `bem` - valid BEM identifier, composed from `block`, `elem`, `mod` and `value`

And may contain these:

* `level` - level of definition of current block
* `require` - array of BEM blocks, that will be included before current block
* `expect` - array of BEM blocks, that should be included after current block
* `exclude` - array of BEM blocks, that should be excluded with this block

## Helpers

#### create(path, cb)

Constructs BEM object from path with `fromPath` method and reads `{bem}.deps.js` to override properties defined in it.

#### fromPath(path)

Constructs BEM object from path to block. It will parse path to extract `block`, `elem`, `mod`, `level`.

##### path
Type: `String`

Path to block __directory__.

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/bem-object
[npm-image]: https://badge.fury.io/js/bem-object.png

[travis-url]: http://travis-ci.org/floatdrop/bem-object
[travis-image]: https://travis-ci.org/floatdrop/bem-object.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/bem-object
[depstat-image]: https://david-dm.org/floatdrop/bem-object.png?theme=shields.io
