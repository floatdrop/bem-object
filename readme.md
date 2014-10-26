# bem-object

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

## Properties

Each object will contain next properties:

 * `block` - name of the block
 * `elem` - name of the element
 * `modName` - name of the modificator
 * `modVal` - value of the modificator
 * `level` - level of definition of current block (full path to level directory)

## Getters

#### bemObject.id
###### alias bem

BEM identifier, composed from `block`, `elem`, `mod` and `val`.

## API

### object(props)

Constructs BEM Object.

`props` can be:

 * String - specifies level and properties: `some/level/block__elem_mod_val`
 * Object - contains [properties](#properties) to assign

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/bem-object
[npm-image]: http://img.shields.io/npm/v/bem-object.svg?style=flat

[travis-url]: http://travis-ci.org/floatdrop/bem-object
[travis-image]: http://img.shields.io/travis/floatdrop/bem-object.svg?branch=master&style=flat

[depstat-url]: http://david-dm.org/floatdrop/bem-object
[depstat-image]: http://img.shields.io/david/floatdrop/bem-object.svg?style=flat

[coveralls-url]: https://coveralls.io/r/floatdrop/bem-object
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/bem-object.svg?style=flat
