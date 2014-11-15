# bem-object

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

## Properties

Each object will contain next properties:

 * `block` - name of the block
 * `elem` - name of the element
 * `modName` - name of the modificator
 * `modVal` - value of the modificator
 * `level` - level of definition of current block (full path to level directory)
 * `tech` - postfix of file (`index.deps.js` tech is `deps.js`)

Functions:

 * `path` - function, that should return full path to file, that described by this bem object.

## Getters

#### bemObject.id
###### alias bem

BEM identifier, composed from `block`, `elem`, `mod` and `val`.

## API

### object(props, [options])

Constructs BEM Object.

`props` can be:

 * String - specifies level and properties: `some/level/block__elem_mod_val.js` (extension is __required__)
 * Object - contains [properties](#properties) to assign

`options` will be passed to [bem-naming](https://github.com/bem/bem-naming) instance.

### object.copy(target)

Copy properties `block`, `elem`, `modName`, `modVal` in this order. That means, if `target` has `modName` only - `block` and `elem` will be copied.

`tech` property always copied, if not defined in target.

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/bem-object
[npm-image]: http://img.shields.io/npm/v/bem-object.svg?style=flat

[travis-url]: http://travis-ci.org/getbem/bem-object
[travis-image]: http://img.shields.io/travis/getbem/bem-object.svg?branch=master&style=flat

[depstat-url]: http://david-dm.org/getbem/bem-object
[depstat-image]: http://img.shields.io/david/getbem/bem-object.svg?style=flat

[coveralls-url]: https://coveralls.io/r/getbem/bem-object
[coveralls-image]: http://img.shields.io/coveralls/getbem/bem-object.svg?style=flat
