# bem-object [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status](https://coveralls.io/repos/floatdrop/bem-object/badge.png)](https://coveralls.io/r/floatdrop/bem-object)

BEM object contains definition of BEM "blocks" in notion, that it could be either block itself, or element of a block, or block with modificator, etc...

Each object should contain next properties:

 * `block` - name of the block
 * `elem` - name of the element
 * `mod` - name of the modificator
 * `value` - value of the modificator

And may contain these:

* `level` - level of definition of current block (it will be `default` by default)
* `require` - array of BEM blocks, that will be included before current block
* `expect` - array of BEM blocks, that should be included after current block
* `ignore` - array of BEM blocks, that should be ignored

## Getters

#### bemObject.id
> alias bem

Valid BEM identifier, composed from `block`, `elem`, `mod` and `value`.

#### bemObject.path

Full path to directory, that contains block files. Constructed from `level`, `block`, `elem` and `mod`.

#### bemObject.required

This property will return an array of properly initiated BEM object.

#### bemObject.expected

Same as `required`, but for `expect` property.

## Helpers

#### stream(path)

Streams all BEM objects under `path`, `path/_*`, `path/__*` and `path/__*/_*`.

#### create(path, cb)

Constructs BEM object from path with `fromPath` method and reads `{bem}.deps.js` to override properties defined in it.

#### fromPath(path, [ext])

Constructs BEM object from path to block. It will parse path to extract `block`, `elem`, `mod`, `level`.

##### path
Type: `String`

Path to block __directory__.

##### ext
Type: `Object`

Object with properties, which will be assigned to constructed BEM object.

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/bem-object
[npm-image]: https://badge.fury.io/js/bem-object.png

[travis-url]: http://travis-ci.org/floatdrop/bem-object
[travis-image]: https://travis-ci.org/floatdrop/bem-object.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/bem-object
[depstat-image]: https://david-dm.org/floatdrop/bem-object.png?theme=shields.io
