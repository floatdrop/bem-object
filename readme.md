# bem-object [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

BEM object is abstract definition of directory, that contains files of your site.

```bash
/desktop.blocks
    /index              # bem-object index              (level: /desktop.blocks)
        /__head         # bem-object index__head        (level: /desktop.blocks)
        /__body         # bem-object index__body        (level: /desktop.blocks)
            /_dark      # bem-object index__body_dark   (level: /desktop.blocks)
        /_mobile        # bem-object index_mobile       (level: /desktop.blocks)
```

## Properties

Each object should contain next properties:

 * `block` - name of the block
 * `elem` - name of the element
 * `mod` - name of the modificator
 * `value` - value of the modificator

And may contain these:

* `level` - level of definition of current block (full path to level directory)
* `require`, `expect` - contains `Array` of [deps objects]() (just object will be treated as `Array` with single element).

You can read about how `require` and `expect` affects deps ordering in [`deps-graph` readme](https://github.com/floatdrop/deps-graph#deps-graph----).

## Getters

#### bemObject.id

BEM identifier without a `value`.

#### bemObject.bem

BEM identifier, composed from `block`, `elem`, `mod` and `value`.

#### bemObject.path

Full path to directory, that contains block files. Constructed from `level`, `block`, `elem` and `mod`.

#### bemObject.required

This property will return an array of properly initiated BEM object.

#### bemObject.expected

Same as `required`, but for `expect` property.

## Helpers

This methods helps you create BEM object from different sources (like `level` directory in case of `stream` method).

#### stream(path)

Streams all BEM objects under `path`, `path/_*`, `path/__*` and `path/__*/_*`.

###### path
Type: `String`  

Contains path to directory (we passing `levels` directories in `gulp-bem`) in which method should find all BEM object that correcsponds to blocks, blocks elements, blocks modificators and blocks elements modificators.

#### create(path, cb)

Constructs BEM object from path with `fromPath` method and reads `{bem}.deps.js` to override properties defined in it (also expands `deps.js` file by the [specification](https://github.com/floatdrop/bem-object#.deps.js)).

###### path
Type: `String`

Direct path to directory that may contain `{bem}.deps.js` file.

#### fromPath(path, [ext])

Constructs BEM object from path to block. It will parse path to extract `block`, `elem`, `mod`, `level`.

##### path
Type: `String`

Path to block __directory__.

##### ext
Type: `Object`

Object with properties, which will be assigned to constructed BEM object.

## .deps.js

File with name composed from `bem` property and `.deps.js` extension considered `deps` file of current BEM object. It contains links to other BEM objects, that should be included/excluded with this BEM object.

Even thou it has `js` extension, conceptually it is `json` with [properties](https://github.com/floatdrop/bem-object#properties) for BEM object.

## deps objects

This is equivalent of BEM object, but with additional properties, that reduces boilerplate code:

 * `elems` - contains `Array` of `String`
 * `mods` - contains `Object` with keys as modificators names and values as modificators values. Values can be `String` or `Array` of `String`.

If deps object contain `elems` or `mods` it will be splitted in multiple BEM objects. It will not take multiplication of `elems` and `mods`, if both are present in deps object. Instead it will be interpretated as to deps objects: one with `elems` and other with `mods`.

```js
// b.deps.js file:

({
    require: { elems: ['e1', 'e2'], mods: {m1: 1, m2: [2, 3]} }
})

// Will be translated to:

({
    require: [
        { block: 'b', elem: 'e1' },
        { block: 'b', elem: 'e2' },
        { block: 'b', mod: 'm1', value: 1 },
        { block: 'b', mod: 'm2', value: 2 },
        { block: 'b', mod: 'm2', value: 3 }
    ]
})
```

`level`, `block` and `elem` properties will be taken from current BEM object, that described with `{bem}.deps.js` file. If deps object contains `block` and `mod`/`mods` - then `elem` will not be taken from BEM object.

__Note:__ you can not have `elem` with `elems` in one deps object (same applies to `mod` and `mods`).

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/bem-object
[npm-image]: https://badge.fury.io/js/bem-object.png

[travis-url]: http://travis-ci.org/floatdrop/bem-object
[travis-image]: https://travis-ci.org/floatdrop/bem-object.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/bem-object
[depstat-image]: https://david-dm.org/floatdrop/bem-object.png?theme=shields.io

[coveralls-url]: https://coveralls.io/r/floatdrop/bem-object
[coveralls-image]: https://coveralls.io/repos/floatdrop/bem-object/badge.png
