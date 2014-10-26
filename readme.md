# bem-object

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

BEM object is abstract definition of group of files, that matching to BEM naming conventions. For example:

```bash
/block              # bem-object (1)
    block.css       # file, that described by (1)
    /_mod               # bem-object (2)
        block_mod.css   # file, that described by (2)
        block_mod_val1.css      # bem-object (3)
        block_mod_val2.css      # bem-object (4)
```

As you can see, modificator values can't be accessed by `(2)`, so we generate additional `(3)` and `(4)` to access them.

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
