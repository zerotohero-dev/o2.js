/**
 * @module   collection.core
 * @requires core
 * @requires method.core
 * @requires validation.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility <strong>class</strong> to modify collections.</p>
 */
(function(framework, fp, UNDEFINED) {
    'use strict';

    // Ensure that dependencies have been loaded.
    fp.ensure('collection.core', ['core', 'method.core', 'validation.core']);

    var attr    = fp.getAttr,
        alias   = attr(fp, 'alias'),
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * Module Exports
         */
        exports = {},

        /*
         * Module Name
         */
        kModuleName = 'Collection',

        /**
         * @class {static} o2.Collection
         *
         * <p>A <strong>class</strong> to modify collections.</p>
         */
        me = create(kModuleName),

        /*
         * Aliases
         */

        kMethod  = 'Method',
        identity = require(kMethod, 'identity'),
        bind     = require(kMethod, 'bind'),

        kValidation = 'Validation',
        isArguments = require(kValidation, 'isArguments'),
        isArray     = require(kValidation, 'isArray'),
        isFunction  = require(kValidation, 'isFunction'),
        isObject    = require(kValidation, 'isObject'),

        slice = attr(Array.prototype, 'slice'),

        floor  = attr(Math, 'floor'),
        max    = attr(Math, 'max'),
        min    = attr(Math, 'min'),
        random = attr(Math, 'random'),

        /*
         * Common Constants
         */
        kEmpty  = '',
        kLength = 'length',

        /*
         * To be Overridden
         */
        indexOf  = null,
        contains = null,
        isEmpty  = null,
        getMax   = null,
        toArray  = null,
        map      = null,
        unique   = null,
        pluck    = null,
        reduce   = null,
        flatten  = null;

    /**
     * @function {static} o2.Collection.clear
     *
     * <p>Removes all the elements of the <code>Object</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {a:'b'};
     * o2.Collection.clear(obj);
     * // obj is now {}
     * obj = [1,2,3];
     * o2.Collection.clear(obj);
     * // obj is now []
     * </pre>
     *
     * @param {Object} ar - the <code>Object</code> to clear.
     *
     * @return a <strong>reference</strong> to the object itself.
     */
    exports.clear = def(me, 'clear', function(ar) {
        var key = null;

        if (!ar) {return ar;}

        if (isArray(ar)) {
            ar.length = 0;

            return ar;
        }

        if (!isObject(ar)) {return ar;}

        for (key in ar) {
            if (ar.hasOwnProperty(key)) {
                delete ar[key];
            }
        }

        return ar;
    });

    /**
     * @function {static} o2.Collection.copy
     *
     //TODO: shallow copy. add to docs.
     * <p>Creates a clone of the given <code>Object</code>, and returns it;
     * leaving the original intact.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj1 = {a:'b'};
     * var obj2 = o2.Collection.copy(obj1);
     * </pre>
     *
     * @param {Object} ar - the object to clone.
     *
     * @return the copied <code>Object</code>.
     */
    exports.copy = def(me,'copy', function(ar) {
        if (!ar          ) {return [];}
        if (!isObject(ar)) {return [];}

        var theCopy = isArray(ar) ? [] : {},
            key = null;

        if (ar.slice) {
            return ar.slice();
        }

        for (key in ar) {
            if (ar.hasOwnProperty(key)) {
                theCopy[key] = ar[key];
            }
        }

        return theCopy;
    });

    /**
     * @function {static} o2.Collection.clone
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.copy}.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * @see o2.Collection.copy
     */
    exports.clone = alias(me, 'clone', 'copy');

    /**
     * @function {static} o2.Collection.compact
     *
     * <p>Remove <code>null</code>, and <code>undefined</code> members from
     * the <code>Object</code>.
     * This function alters the actual <code>Object</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [null, 1, 2, undefined, '', 3, 4];
     * o2.Collection.compact(ar);
     * // ar is now [1, 2, '', 3, 4]
     * </pre>
     *
     * @param {Object} ar - the <code>Object</code> to clean.
     *
     * @return a reference to the <code>Object</code> itself.
     */
    exports.compact = def(me,'compact', function(ar) {
        var value = null,
            i     = 0,
            len   = 0,
            key   = null;

        if (!ar          ) {return ar;}
        if (!isObject(ar)) {return ar;}

        if (ar.splice) {
            for (i = 0, len = ar.length; i < len; i++) {
                value = ar[i];

                if (value === null || value === UNDEFINED) {
                    ar.splice(i, 1);

                    i = i - 1;
                    len = ar.length;
                }
            }

            return ar;
        }

        for (key in ar) {
            if (ar.hasOwnProperty(key)) {
                value = ar[key];

                if (value === null || value === UNDEFINED) {
                    delete ar[key];
                }
            }
        }

        return ar;
    });

    /**
     * @function {static} o2.Collection.indexOf
     *
     * <p>Gets the index of the element in the given <code>Array</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar [1, 2, 3, 4];
     * var id = o2.Collection.indexOf(ar, 3);
     * // id is 2
     * </pre>
     *
     * @param {Object} ar - the <code>Array</code> or <code>Object</code> to
     * search.
     * @param {Object} elm - the <code>Object</code> to match.
     *
     * @return the index of the element if found, <code>-1</code> otherwise.
     */
    //TODO: check whether "def" actually returns the function.
    exports.indexOf = def(me, 'indexOf', function(ar, elm) {
        var counter = 0,
            i       = 0,
            key     = null,
            len     = 0;

        if (!ar          ) {return -1;}
        if (!isObject(ar)) {return -1;}

        // Array.prototype.indexOf
        if (ar.indexOf) {
            return ar.indexOf(elm);
        }

        if (isArray(ar)) {
            for (i = 0, len = ar.length; i < len; i++) {
                if (elm === ar[i]) {
                    return i;
                }
            }

            return -1;
        }

        for (key in ar) {
            if (ar.hasOwnProperty(key)) {
                if (ar[key] === elm) {
                    return counter;
                }

                counter++;
            }
        }

        return -1;
    });

    /*
     *
     */
    indexOf = require(kModuleName, 'indexOf');

    /**
     * @function {static} o2.Collection.contains
     *
     * <p>An <strong>alias</strong> to <code>o2.Collection.indexOf(ar,
     * elm) &gt; -1</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 2, 3, 4];
     * var isInAr = o2.Collection.contains(ar, 3);
     * // isInAr is true
     * </pre>
     *
     * @param {Array} ar - the <code>Array</code> to search.
     * @param {Object} elm - the <code>Object</code> to match.
     *
     * @return <code>true</code> if the <code>Array</code> contains the item,
     * <code>false</code> otherwise.
     */
    exports.contains = def(me,'contains', function(ar, elm) {
        if (!ar          ) {return -1;}
        if (!isObject(ar)) {return -1;}

        return indexOf(ar, elm) > -1;
    });

    /*
     *
     */
    contains = require(kModuleName, 'contains');

    /**
     * @function {static} o2.Collection.includes
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.contains}
     *
     * @see o2.Collection.contains
     */
    exports.includes = alias(me, 'includes', 'contains');

    /**
     * @function {static} o2.Collection.inArray
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.contains}
     *
     * <p><strong>Usage example:</strong></p>
     *
     * @see o2.Collection.contains
     */
    exports.inArray = alias(me, 'inArray', 'contains');

    /**
     * @function {static} o2.Collection.find
     *
     * <p>Gets the first <strong>collection</strong> item that validates
     * against the given <strong>delegator</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 2, 3, 4];
     *
     * var res = o2.Collection.find(ar, function(value){
     *      return value === 3;
     * });
     *
     * // res will be 3
     * </pre>
     *
     * @param {Object} obj - the <code>Array</code> or an iterable
     * <code>Object</code>.
     * @param delegate - Iterator <code>Function</code> in the form
     * <code>function(value, index, collection)</code>.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that acts as the <code>this</code>
     * reference in the <strong>iterator</strong>.
     *
     * @return the first truthy evaluated item; <code>null</code> if nothing
     * is found.
     */
    exports.find = def(me,'find', function(obj, delegate, context) {
        var i      = 0,
            index  = 0,
            key    = null,
            len    = 0,
            result = null,
            value  = null;

        if (!obj          ) {return null;}
        if (!isObject(obj)) {return null;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                value = obj[i];

                if(delegate.apply(context, [value, i, obj])) {
                    result = value;

                    break;
                }
            }

            return result;
        }

        for(key in obj) {
            if(obj.hasOwnProperty(key)) {
                value = obj[key];

                if(delegate.apply(context, [value, index, obj])) {
                    result = value;

                    break;
                }

                index++;
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.detect
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.find}.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * @see o2.Collection.find
     */
    exports.detect = alias(me, 'detect', 'find');

    /**
     * @function {static} o2.Collection.forEach
     *
     * <p>Executes a delegate of the form
     * <code>fn(item, currentIndex, collection)</code> for each element
     * of the <strong>collection</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     *
     * o2.Collection.forEach(collection, function(item, index, collection) {
     *      log(item);
     * });
     * // will log:
     * 1
     * 2
     * 3
     * 4
     * </pre>
     *
     * @param {Object} obj - the <code>Array</code> or an iterable
     * <code>Object</code>.
     * @param {Function} delegate - the iterator in the form
     * <code>function(item, index, collection)</code>.
     */
    exports.forEach = def(me, 'forEach', function(obj, delegate) {
        var i   = 0,
            key = null,
            len = 0;

        if (!obj          ) {return;}
        if (!isObject(obj)) {return;}

        // Array.prototype.forEach
        if (obj.forEach) {
            obj.forEach(delegate);

            return;
        }

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                delegate(obj[i], i, obj);
            }

            return;
        }

        for (key in obj) {
            if(obj.hasOwnProperty(key)) {
                delegate(obj[key], key, obj);
            }
        }
    });

    /**
     * @function {static} o2.Collection.each
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.forEach}.</p>
     *
     * @see o2.Collection.forEach
     */
    exports.each = alias(me, 'each', 'forEach');

    /**
     * @function {static} o2.Collection.diff
     *
     * <p>Takes the difference between the current collection and a number of
     * other collections. Only items that do not remain in the rest of the
     * collections will be returned.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar1 = [1, 2, 3, 4, 5];
     * var ar2 = [2, 3, 4, 5, 6];
     * var ar3 = o2.Collection.diff(ar1, ar2);
     * // ar3 is [1, 5. 6]
     * </pre>
     *
     * @param {Arguments} ... - variable number of input arguments; each
     * argument should either be an <code>Array</code> or an iterable
     * <code>Object</code>.
     *
     * @return an <code>Array</code> of non-matching items.
     *
     * @see o2.Collection.intersect
     * @see o2.Collection.union
     */
    exports.diff = def(me,'diff', function(collection) {
        var i      = 0,
            key    = null,
            len    = 0,
            rest   = null,
            result = [],
            value  = null;

        if (!collection          ) {return result;}
        if (!isObject(collection)) {return result;}

        rest = slice.call(arguments, 1);

        if (isArray(collection)) {
            for(i = 0, len = collection.length; i < len; i++) {
                value = collection[i];

                if (!contains(rest, value)) {
                    result.push(value);
                }
            }

            return result;
        }

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                value = collection[key];

                if (!contains(rest, value)) {
                    result.push(value);
                }
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.getDifference
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.diff}.</p>
     *
     * @see o2.Collection.diff
     */
    exports.getDifference = alias(me, 'getDifference', 'diff');

    /**
     * @function {static} o2.Collection.every
     *
     * <p>Check whether every element of a collection passes a truth test.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     *
     * var isAllNumeric = o2.Collection.every(collection, function(item) {
     *      return !isNaN(item);
     * });
     * // isAllNumeric will be true
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable collection.
     * @param {Function} delegate - an iterator of the form
     * <code>function(item, index, obj)</code>; where <strong>item</strong> is
     * the current collection item, <strong>index</strong> is the current index
     * and <strong>obj</strong> is the collection itself.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return <code>true</code> if <strong>delegate</strong> returns
     * <code>true</code> for every element of the collection; <code>false</code>
     * otherwise.
     */
    exports.every = def(me,'every', function(obj, delegate, context) {
        var counter = 0,
            i       = 0,
            key     = null,
            len     = 0,
            result  = true;

        if (!obj          ) {return true;}
        if (!isObject(obj)) {return true;}

        // Array.prototype.every
        if (obj.every) {
            return obj.every(delegate, context);
        }

        if (isArray(obj)) {
            for(i = 0, len = obj.length; i < len; i++) {
                result = delegate.apply(context, [obj[i], i, obj]);

                if (!result) {return false;}
            }

            return true;
        }

        counter = 0;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result = delegate.apply(context, [obj[key], counter, obj]);

                if (!result) {return false;}

                counter++;
            }
        }

        return true;
    });

    /**
     * @function {static} o2.Collection.exclude
     *
     * <p>Excludes filtered out items from the collection. Returns a new
     * collection without alterin the initial one.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     *
     * var rest = o2.Collection.exclude(collection, function(item) {
     *      return item % 2 === 0;
     * });
     *
     * // rest will be [1, 3, 5]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - the iterator in the form
     * <code>function(context, value, index, obj)</code> where
     * <strong>value</strong> is the current element of <strong>obj</strong>
     * being iterated over, and <strong>index</strong> is the index of that
     * element.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return a new filtered object.
     *
     * @see o2.Collection.grep
     */
    exports.exclude = def(me,'exclude', function(obj, delegate, context) {
        var counter = 0,
            i       = 0,
            key     = null,
            len     = 0,
            results = [],
            value   = null;

        if (!obj          ) {return results;}
        if (!isObject(obj)) {return results;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                value = obj[i];

                if (!delegate.apply(context, value, i, obj)) {
                    results.push(value);
                }
            }

            return results;
        }

        counter = 0;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];

                if (!delegate.apply(context, value, counter, obj)) {
                    results.push(value);
                }

                counter++;
            }
        }

        return results;
    });

    /**
     * @function {static} o2.Collection.reject
     *
     * <p>An <strong>alıas</strong> to {@link o2.Collection.exclude}.</p>
     *
     * @see o2.Collection.reject
     */
    exports.reject = alias(me, 'reject', 'exclude');

    /**
     * @function {static} o2.Collection.extend
     *
     * <p>Merges two <code>Object</code>s or <code>Array</code>s.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var base = {lorem: 'ipsum'};
     * var child = {dolor: 'sit'};
     *
     * o2.Collection.extend(child, base);
     *
     * // child => {lorem : 'ipsum', dolor : 'sit'}
     * </pre>
     *
     * @param {Object} toObj - the <code>Object</code> to copy values to.
     * @param {Object} fromObj - the <code>Object</code> to copy values from.
     *
     * @return a <strong>reference</strong> to the modified <code>toObj</code>.
     */
    exports.extend = def(me,'extend', function(toObj, fromObj) {
        var i     = 0,
            key   = null,
            len   = 0,
            value = null;

        if (!toObj            ) {return {};}
        if (!isObject(toObj)  ) {return toObj;}
        if (!isObject(fromObj)) {return toObj;}

        if (isArray(toObj)) {
            if(!isArray(fromObj)) {return toObj;}

            i   = 0;
            len = fromObj.length;

            for (i = 0; i < len; i++) {
                value = fromObj[i];

                if(indexOf(toObj, value) === -1) {
                    toObj.push(value);
                }
            }

            return toObj;
        }

        for (key in fromObj) {
            if (fromObj.hasOwnProperty(key)) {
                toObj[key] = fromObj[key];
            }
        }

        return toObj;
    });

    /**
     * @function {static} o2.Collection.merge
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.extend}.</p>
     *
     * @see o2.Collection.extend
     */
    exports.merge = alias(me, 'merge', 'extend');

    /**
     * @function {static} o2.Collection.getFirst
     *
     * <p>Gets the first item in the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return the first item in the collection if exists; <code>null</code>
     * otherwise.
     */
    exports.getFirst = def(me,'getFirst', function(obj) {
        var key = null;

        if (!obj          ) {return null;}
        if (!isObject(obj)) {return null;}

        if (isArray(obj)  ) {
            return obj[0] || null;
        }

        for(key in obj) {
            if(obj.hasOwnProperty(key)) {
                return obj[key];
            }
        }

        return null;
    });

    /**
     * @function {static} o2.Collection.getFirstN
     *
     * <p>Gets the first <strong>n</strong> elements of the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5, 6];
     * var firstFew = o2.Collection.getFirstN(collection, 3);
     * // firstFew will be [1, 2, 3]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Integer} n - the number of items to retrieve.
     *
     * @return the first <strong>n</strong> elements of the collection if
     * the collection has more than <strong>n</strong> items; all of the items
     * in the collection otherwise.
     */
    exports.getFirstN = def(me,'getFirstN', function(obj, n) {
        var i      = 0,
            key    = null,
            len    = 0,
            result = [];

        if (!obj          ) {return [];}
        if (!isObject(obj)) {return [];}

        if (isArray(obj)) {
            for (i = 0; i < len && i < n; i++) {
                result.push(obj[i]);
            }

            return result;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (i < n) {
                    result.push(obj[key]);
                }
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.getFunctions
     *
     * <p>Gets all the <strong>static</strong> methods of the object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {fn1 : function(){}, fn2 : function() {}, lorem : 1};
     * var methods = o2.Collection.getFunctions(obj);
     * // methods now is [fn1, fn2]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return gets all the member <code>Function</code>s in the current
     * object.
     */
    exports.getFunctions = def(me,'getFunctions', function(obj) {
        var i      = 0,
            key    = null,
            len    = 0,
            result = [],
            value  = null;

        if (!obj          ) {return result;}
        if (!isObject(obj)) {return result;}

        if (!isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                value = obj[i];

                if (isFunction(value)) {
                    result.push(value);
                }
            }

            return result;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];

                if (isFunction(value)) {
                    result.push(value);
                }
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.getMethods
     *
     * <p>An <strong>alias</strong> to
     * {@link o2.Collection.getFunctions}.</p>
     *
     * @see o2.Collection.getFunctions
     */
    exports.getMethods = alias(me, 'getMethods', 'getFunctions');

    /**
     * @function {static} o2.Collection.getKeys
     *
     * <p>Gets all the keys of the object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : 'ipsum', dolor : 'sit'};
     * var keys = o2.Collection.getKeys(obj);
     * // keys will be ['lorem', 'dolor']
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return an <code>Array</code> of the object's keys.
     */
    exports.getKeys = def(me,'getKeys', function(obj) {
        var i      = 0,
            key    = null,
            len    = 0,
            result = [];

        if (!obj          ) {return result;}
        if (!isObject(obj)) {return result;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                result.push([kEmpty, i].join(kEmpty));
            }

            return result;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(key);
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.getLast
     *
     * <p>Gets the last item in the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var last = o2.Collection.getLast(collection);
     * // last will be 5
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return the last item in the collection if any; <code>null</code>
     * otherwise.
     */
    exports.getLast = def(me,'getLast', function(obj) {
        var key  = null,
            last = null,
            len  = 0;

        if (!obj          ) {return last;}
        if (!isObject(obj)) {return last;}

        if (isArray(obj)) {
            len = obj.length;

            return len ? obj[len - 1] : null;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                last = obj[key];
            }
        }

        return last;
    });

    /**
     * @function {static} o2.Collection.getLastN
     *
     * <p>Gets the last <strong>n</strong> items in the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var lastFew = o2.Collection.getLastN(collection, 3);
     * // lastFew will be [3, 4, 5]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Integer} n - the number of items to retrieve.
     *
     * @return the last <strong>n</strong> items if the collection has at least
     * <strong>n</strong> items; all the items of the collection otherwise.
     */
    exports.getLastN = def(me,'getLastN', function(obj, n) {
        var i      = 0,
            key    = null,
            len    = 0,
            result = [];

        if (!obj          ) {return result;}
        if (!isObject(obj)) {return result;}
        if (!n            ) {return result;}

        if (isArray(obj)) {
            return slice.apply(obj, [max(obj.length - n, 0)]);
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                len++;
            }
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (i >= len - n) {
                    result.push(obj[key]);
                }
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.isEmpty
     *
     * <p>Check whether the collection contains any members.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * // This will return true:
     * o2.Collection.isEmpty([]);
     *
     * // This will also return true:
     * o2.Collection.isEmpty({});
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return <code>true</code> if the collection is empty; <code>false</code>
     * otherwise.
     */
    exports.isEmpty = def(me,'isEmpty', function (obj) {
         if (!obj          ) {return true;}
         if (!isObject(obj)) {return true;}

         var key = null;

         for (key in obj) {
             if (obj.hasOwnProperty(key)) {
                 return false;
             }
         }

         return true;
    });

    /*
     *
     */
    isEmpty = require(kModuleName, 'isEmpty');

    /**
     * @function {static} o2.Collection.getMax
     *
     * <p>Gets the maximum value of the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 3, 11, 42, 4, 5, 6];
     * var meaningOfLife = o2.Collection.getMax(collection);
     * // meaningOfLife will be 42
     *
     * var meaningOfUniverse = o2.Collection.getMax(collection, function(item) {
     *      return item !== 42 ? Math.PI : 42;
     * });
     * // meaningOfUniverse will also be 42
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - (optional, defaults to
     * <code>undefined</code>) the evaluator <code>Function</code> in the
     * form <code>functon(item, index, obj)</code> where <strong>item</strong>
     * is the current collection item; <strong>index</strong> is the index
     * of that item.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return the maximum value in the collection.
     */
    exports.getMax = def(me,'getMax', function(obj, delegate, context) {
        var calculated = null,
            index      = 0,
            key        = null,
            result     = -Infinity,
            store      = null;

        if (!obj          ) {return result;}
        if (!isObject(obj)) {return result;}

        if (!delegate) {
            if (isEmpty(obj)) {return result;}

            if (isArray(obj)) {
                return max.apply(Math, obj);
            }

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    store = store || obj[key];

                    if (store < obj[key]) {
                        store = obj[key];
                    }
                }
            }

            return store;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                store = obj[key];

                calculated = delegate ? delegate.apply(context,
                    [store, index, obj]) : obj;

                if (calculated >= result) {
                    result = calculated;
                }

                index++;
            }
        }

        return result;
    });

    /*
     *
     */
    getMax = require(kModuleName, 'getMax');

    /**
     * @function {static} o2.Collection.getMin
     *
     * <p>Gets the maximum value of the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [111, 311, 1211, 42, 114, 235, 126];
     * var meaningOfLife = o2.Collection.getMin(collection);
     * // meaningOfLife will be 42
     *
     * var meaningOfUniverse = o2.Collection.getMin(collection, function(item) {
     *      return item !== 42 ? 42 * Math.PI : 42;
     * });
     * // meaningOfUniverse will also be 42
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - (optional, defaults to
     * <code>undefined</code>) the evaluator <code>Function</code> in the
     * form <code>functon(item, index, obj)</code> where <strong>item</strong>
     * is the current collection item; <strong>index</strong> is the index
     * of that item.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return the minimum value in the collection.
     */
    exports.getMin = def(me,'getMin', function(obj, delegate, context) {
        var calculated = null,
            index      = 0,
            key        = null,
            result     = Infinity,
            store      = null;

        if (!obj          ) {return result;}
        if (!isObject(obj)) {return result;}

        if (!delegate) {
            if (isArray(obj)) {
                return min.apply(Math, obj);
            }

            if (isEmpty(obj)) {return result;}

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    store = store || obj[key];

                    if (store >= obj[key]) {
                        store = obj[key];
                    }
                }
            }

            return store;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                store = obj[key];

                calculated = delegate ? delegate.apply(context,
                    [store, index, obj]) : obj;

                if (calculated < result) {
                    result = calculated;
                }

                index++;
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.getRest
     *
     * <p>Gets the elements of the collection after index n.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     *
     * var rest = o2.Collection.getRest(collection);
     * // rest will be [2, 3, 4, 5]
     *
     * rest = o2.Collection.getRest(collection, 2);
     * // rest will be [3, 4, 5];
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Integer} n - (optional; defaults to <code>1</code>) the
     * zero-based index to cut at.
     *
     * @return the items after the index <strong>n</strong> (n<sup>th</sup>
     * item included)
     */
    exports.getRest = def(me,'getRest', function(obj, n) {
        var cutAt  = 0,
            index  = 0,
            key    = null,
            result = [];

        if (!obj          ) {return result;}
        if (!isObject(obj)) {return result;}

        cutAt = n === UNDEFINED ? 1 : n;

        if (obj.slice) {
            return obj.slice(cutAt);
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (index >= cutAt) {
                    result.push(obj[key]);
                }
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.getSize
     *
     * <p>Gets the number of items in the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var size = o2.Collection.getSize(collection);
     * // size will be 5
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return the number of items in the collection.
     */
    exports.getSize = def(me,'getSize', function(obj) {
        var counter = 0,
            key     = null;

        if (!obj                    ) {return 0;}
        if (!isObject(obj)          ) {return 0;}
        if (obj.length !== UNDEFINED) {return obj.length;}

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                counter++;
            }
        }

        return counter;
    });

    /**
     * @function {static} o2.Collection.getCount
     *
     * <p>An <strong>alias</strong> to {o2.Collection.getSize}</p>
     *
     * @see o2.Collection.getSize
     */
    exports.getCount = alias(me, 'getCount', 'getSize');

    /**
     * @function {static} o2.Collection.getLength
     *
     * <p>An <strong>alias</strong> to {o2.Collection.getSize}</p>
     *
     * @see o2.Collection.getSize
     */
    exports.getLength = alias(me, 'getLength', 'getSize');

    /**
     * @function {static} o2.Collection.getSortedIndex
     *
     * <p>Gets an index to insert the item at a sorted <code>Array</code>,
     * so that is not needed to be resorted.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 2, 24, 30, 44, 66, 100];
     * var idx = o2.Collection.getSortedIndex(42);
     * // idx will be 4
     * </pre>
     *
     * @param {Array} array - an <code>Array</code> to work on.
     * @param {Object} item - the item to insert.
     * @param {Function} delegate - (optional, defaults to identity function),
     * a <code>Function</code> that takes the current item as a parameter and
     * returns an <code>Integer</code> value.
     *
     * @return <code>-1</code> if the collection is not an <code>Array</code>;
     * the computed sorted index otherwise.
     */
    exports.getSortedIndex = def(me,'getSortedIndex', function(array, item,
                delegate) {
        if (!isArray(array)) {return -1;}

        var iterator = delegate || identity,
            high     = array.length,
            low      = 0,
            mid      = 0;

        // Binary search:
        while (low < high) {
            mid = (low + high) >> 1;

            if (iterator(array[mid]) < iterator(item)) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    });

    /**
     * @function {static} o2.Collection.getValues
     *
     * <p>Gets the value of an <code>Object</code> that has
     * <code>{key1 : value1, key2 : value2 ... }</code> kind of layout.</p>
     *
     * <p>If an <code>Array</code> is passed, it makes a shallow copy of that
     * array and returns it.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = {lorem : 1, ipsum : 2, dolor : 3};
     * var values = o2.Collection.getValues(collection);
     * // values will be ['lorem', 'ipsum', 'dolor']
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return the values in the collection.
     */
    exports.getValues = def(me,'getValues', function(obj) {
        var key    = null,
            result = [];

        if (!obj          ) {return null;}
        if (!isObject(obj)) {return null;}

        if (obj.slice) {
            return obj.slice();
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(obj[key]);
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.grep
     *
     * <p>Filters the items of a collections using an evaluator delegate
     * and returns the filtered result set.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5, 6];
     * var evens = o2.Collection.grep(collection, function(item) {
     *      return item % 2 === 0;
     * });
     * // evens will be [2, 4, 6]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - the filter <code>Function</code> in the form
     * <code>[Boolean] function(item)</code>.
     *
     * @return the filtered collection.
     */
    exports.grep = def(me,'grep', function(obj, delegate) {
        var i      = 0,
            item   = null,
            key    = null,
            len    = 0,
            result = [];

        if (!obj) {return result;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                item = obj[i];

                if(delegate(item)) {
                    result.push(item);
                }
            }

            return result;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                item = obj[key];

                if(delegate(item)) {
                    result.push(item);
                }
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.select
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.grep}.</p>
     *
     * @see o2.Collection.grep
     */
    exports.select = alias(me, 'select', 'grep');

    /**
     * @function {static} o2.Collection.filter
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.grep}.</p>
     *
     * @see o2.Collection.grep
     */
    exports.filter = alias(me, 'filter', 'grep');

    /**
     * @function {static} o2.Collection.group
     *
     * <p>Groups the items in the collection by a key or an evaluator
     * <code>Function</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [
     *      {lorem : 1},
     *      {lorem : 2},
     *      {lorem : 3},
     *      {ipsum : 1},
     *      {ipsum : 2}
     * ];
     *
     * var lorems = o2.Collection.group(collection, 'lorem')
     * //lorems will be {lorem : [1, 2, 3]}
     *
     * var grouped = o2.Collection.group(collection, function(item) {
     *      for(key in item) {
     *          if (item.hasOwnProperty(key)) {
     *              return key;
     *          }
     *      }
     * });
     * // grouped will be {lorem : [1, 2, 3], ipsum : [1, 2]}
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - A <code>String</code> key that the items
     * in the collection share, or a <code>Function</code> in the form
     * <code>[key] function(item, index)</code> where <strong>item</strong>
     * is the current collection item, <strong>index</strong> if that item's
     * index; and the return value is a key to group.
     *
     * @return an <code>Array</code> of grouped items.
     *
     * @see o2.Collection.pluck
     */
    exports.group = def(me,'group', function(obj, delegate) {
        var i        = 0,
            key      = null,
            ky       = null,
            len      = 0,
            result   = {},
            value    = null,
            iterator = isFunction(delegate) ? delegate :
                function(obj) { return obj[delegate]; };

        if (!obj          ) {return result;}
        if (!isObject(obj)) {return result;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                value = obj[i];
                ky    = iterator(value, i);

                if (!result[ky]) {
                    result[ky] = [];
                }

                result[ky].push(value);
            }

            return result;
         }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];
                ky    = iterator(value, i);

                if (!result[ky]) {
                    result[ky] = [];
                }

                result[ky].push(value);

                i++;
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.toArray
     *
     * <p>Safely converts the <code>Object</code> in question into anarray.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : 1, ipsum : 2};
     * var ar = o2.Collection.toArray(obj);
     * // ar will be [1, 2]
     * </pre>
     *
     * @param {Object} obj - Any <code>Object</code> to convert to an
     * <code>Array</code>. If <strong>obj</strong> is, in deed, an
     * <code>Array</code>, then a shallow copy of it is returned without
     * altering the original <code>Object</code>.
     *
     * @return the generated <code>Array</code>.
     *
     * @see o2.Object.toArray
     */
    exports.toArray = def(me,'toArray', function(obj) {
        var key    = null,
            result = [];

        if (!obj       ) {return result;}
        if (obj.toArray) {return obj.toArray();}

        if (obj.slice) {
            return obj.slice();
        }

        if (isArguments(obj)) {
            return slice.apply(obj);
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(obj[key]);
            }
        }

        return result;
    });

    /*
     *
     */
    toArray = require(kModuleName, 'toArray');

    /**
     * @function {static} o2.Collection.map
     *
     * <p>Calls a <code>Function</code> for each member of the collection,
     * passing the current item as a parameter. Returns an <code>Array</code>
     * containing the results of each call.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var squared = o2.Collection.map(collection, function(item) {
     *      return item*item;
     * });
     * // squared will be [1, 4, 9, 25]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - A mapper in the form
     * <code>function(item, index, collection)</code> where
     * <strong>item</strong> is the current collection element,
     * <strong>index</strong> is its index, and <strong>collection</strong> is
     * the current object <strong>obj</strong>.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return a mapped <code>Array</code>.
     *
     * @see o2.Collection.invoke
     */
    exports.map = def(me,'map', function(obj, delegate, context) {
        var i       = 0,
            key     = null,
            len     = 0,
            results = [],
            value   = null;

        if (!obj          ) {return results;}
        if (!isObject(obj)) {return results;}

        // Array.prototype.map
        if (obj.map) {
            return obj.map(delegate, context);
        }

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                value = obj[i];

                results.push(
                    delegate.apply(context, [value, i, obj])
                );
            }

            return results;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];

                results.push(
                    delegate.apply(context, [value, i, obj])
                );

                i++;
            }
        }

        return results;
    });

    /*
     *
     */
    map = require(kModuleName, 'map');

    /**
     * @function {static} o2.Collection.unique
     *
     * <p>Removes duplicate entries from the collection. Returns a new
     * <code>Array</code>; does not alter the original collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 2, 3, 2, 4, 2, 42];
     * var uniq = o2.Collection.unique(ar);
     * // uniq will be [1, 2, 3, 4, 42]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - (optional,
     * defaults to <code>undefined</code>) a mapper in the form
     * <code>function(item, index, collection)</code> where
     * <strong>item</strong> is the current collection element,
     * <strong>index</strong> is its index, and <strong>collection</strong> is
     * the current object <strong>obj</strong>.
     *
     * @return a copy of the collection containing unique items.
     */
    exports.unique = def(me,'unique', function(array, delegate) {
        var ar     = null,
            cache  = [],
            elm    = null,
            i      = 0,
            len    = 0,
            result = [];

        if (!array) {return result;}

        ar = isArray(array) ? array.slice().sort() : toArray(array).sort();

        if (delegate) {
            ar = delegate ? map(array, delegate) : ar;
        }

        for (i = 0, len = ar.length; i < len; i++) {
            elm = ar[i];

            if (i === 0 || cache[cache.length-1] !== elm) {
                cache.push(elm);
                result.push(elm);
            }
        }

        return result;
    });

    /*
     *
     */
    unique = require(kModuleName, 'unique');

    /**
     * @function {static} o2.Collection.intersect
     *
     * <p>Returns an <code>Array</code> of items that are common in all of
     * the collections passed in as parameters.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar1 = [1, 2, 3, 4, 5];
     * var ar2 = [2, 3, 4, 5, 6];
     * var ar3 = o2.Collection.intersect(ar1, ar2);
     * // ar3 is [2, 3, 4, 5]
     * </pre>
     *
     * @param {...} varargin - the objects to intersect as input arguments.
     *
     * @return an <code>Array</code> containing only the values that are common
     * in all of the collections given.
     *
     * @see o2.Collection.diff
     * @see o2.Collection.union
     */
    exports.intersect = def(me,'intersect', function(ar) {
        var i      = 0,
            item   = null,
            j      = 0,
            jlen   = 0,
            len    = 0,
            peer   = null,
            peers  = slice.apply(arguments, [1]),
            result = unique(ar);

        if (result.length === 0) {return [];}

        for (i = 0, len = peers.length; i < len; i++) {
            peer = unique(peers[i]);

            if (!isObject(peer)) {return [];}

            for (j = 0, jlen = result.length; j < jlen; j++) {
                item = result[j];

                if (!contains(peer, item)) {
                    result.splice(j, 1);
                }

                if (!result.length) {return [];}
            }
        }

        return result;
    });


    /*
     * @param {varargin} -
     */

    /**
     * @function {static} o2.Collection.invoke
     *
     * <p>Calls the delegate <code>Function</code> with an optional set
     * of parametrs for each item in the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * function log(item) { console.log(item); }
     * o2.Collection.invoke(collection, log);
     * // will log:
     * // 1
     * // 2
     * // 3
     * // 4
     * // 5
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Object} delegate - the delegate to invoke in the form
     * delegate(item, ...varargin). If it's a <code>String</code> then
     * <code>item[delegate]</code> will be used instead.
     * @param {varargin} ... - A set of parameters to pass after the delegate.
     *
     * @see o2.Collection.map
     */
    exports.invoke = def(me,'invoke', function(obj, delegate) {
        var i       = 0,
            invoker = null,
            item    = null,
            key     = null,
            len     = 0,

            kCount  = 2,
            args    = null;

        if (arguments.length < kCount ) {return;}
        if (!obj                      ) {return;}
        if (!isObject(obj)            ) {return;}

        args = slice.call(arguments, kCount);

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                item    = obj[i];
                invoker = isFunction(delegate) ? delegate : item[delegate];

                invoker.apply(item, args);
            }

            return;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                item    = obj[key];
                invoker = isFunction(delegate) ? delegate : item[delegate];

                invoker.apply(item, args);
            }
        }
    });

    /**
     * @function {static} o2.Collection.lastIndexOf
     *
     * <p>Returns the last index of the given item.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 4, 2, 42, 2, 4, 42, 21, 12, 1];
     * var idx = o2.Collection.lastIndexOf(collection, 42);
     * // idx will be 7
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Object} item - the item to check the index of.
     *
     * @return the last index of the item if exists, <code>-1</code> otherwise.
     */
    exports.lastIndexOf = def(me,'lastIndexOf', function(obj, item) {
        var i          = 0,
            collection = null;

        if (!obj          ) {return -1;}
        if (!isObject(obj)) {return -1;}

        // Array.prototype.lastIndexOf
        if (obj.lastIndexOf) {
            return obj.lastIndexOf(item);
        }

        collection = isArray(obj) ? obj : toArray(obj);

        for (i = collection.length - 1; i >= 0; i--) {
            if (collection[i] === item) {
                return i;
            }
        }

        return -1;
    });

    /**
     * @function {static} o2.Collection.pluck
     *
     * <p>Hard to explain in words. Let us demonstrate by an example:</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [
     *      {key1 : {lorem1 : 'ipsum1'}, key2 : {dolor1 : 'amet1'}},
     *      {key1 : {lorem2 : 'ipsum2'}, key2 : {dolor2 : 'amet2'}},
     *      {key1 : {lorem3 : 'ipsum3'}, key2 : {dolor3 : 'amet3'}}
     * ];
     *
     * // Will return:
     * // [
     * //    {dolor1 : 'amet1'},
     * //    {dolor2 : 'amet2'},
     * //    {dolor3 : 'amet3'}
     * // ]
     * o2.Collection.pluck(collection, 'key2');
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Object} key - the key to pluck.
     *
     * @return a plucked subset.
     *
     * @see o2.Collection.group
     */
    exports.pluck = def(me,'pluck', function(obj, key) {
        var i      = 0,
            k      = null,
            len    = 0,
            result = [];

        if (!obj          ) {return result;}
        if (!isObject(obj)) {return result;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                result.push(obj[i][key]);
            }

            return result;
        }

        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                result.push(obj[k][key]);
            }
        }

        return result;
    });

    /*
     *
     */
    pluck = require(kModuleName, 'pluck');

    /**
     * @function {static} o2.Collection.reduce
     *
     * <p>Works similar to the <strong>reduce</strong> part of the
     * <a href="http://www.mongodb.org/display/DOCS/MapReduce">Map Reduce</a>
     * algorithm.</p>
     * <p>Reduces a <strong>collection</strong> into a single value by
     * applying a <strong>delegate</strong> of the form
     * <code>function(cache, value, index, collection)</code> where
     * <strong>cache</strong> is the accumulator, <strong>value</strong>
     * is the iterated item, <strong>index</strong> is the item's index,
     * and <strong>collection</strong> is the collection we are working on.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var reduced = o2.Collection.reduce(collection, function(store, value) {
     *      return store + value;
     * }, 0);
     * // reduced will be 15
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Functon} delegate - the reducer <code>Function</code>.
     * @param {Object} store - the initial seed.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return a single reduced value.
     */
    exports.reduce = def(me, 'reduce', function(obj, delegate, store, context) {
        var cache    = store,
            i        = 0,
            index    = 0,
            isSeeded = arguments.length > 2,
            iterator = delegate,
            key      = null,
            len      = 0,
            value    = null;

        if (!obj          ) {return null;}
        if (!isObject(obj)) {return null;}

        // Array.prototype.reduce
        if (obj.reduce) {
            if (context) {
                iterator = bind(context, delegate);
            }

            return isSeeded ?
                obj.reduce(iterator, store) :
                obj.reduce(iterator);
        }

        if (isArray(obj)) {
            for(i = 0, len = obj.length; i < len; i++) {
                value = obj[i];

                if (!isSeeded) {
                    cache    = value;
                    isSeeded = true;
                } else {
                    cache = iterator.apply(context,
                        [cache, value, i, obj]
                    );
                }
            }

            if (!isSeeded) {
                //TODO: const.
                throw 'reduce: empty collection with no seed';
            }

            return cache;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];

                if (!isSeeded) {
                    cache   = value;
                    isSeeded = true;
                } else {
                    cache = iterator.apply(context,
                        [cache, value, index, obj]
                    );
                }

                index++;
            }
        }

        if (!isSeeded) {
            //TODO: const.
            throw 'redude: empty collection with no seed';
        }

        return cache;
    });

    /*
     *
     */
    reduce = require(kModuleName, 'reduce');

    /**
     * @function {static} o2.Collection.fold
     *
     * <p>An <strong>alias</strong> to {o2.Collection.reduce}.</p>
     *
     * @see o2.Collection.reduce
     */
    //TODO: check that "alias" actually returns a function instance.
    exports.fold = alias(me, 'fold', 'reduce');

    /**
     * @function {static} o2.Collection.reduceRight
     *
     * <p>Works similar to {@link o2.Collection.fold}, but goes from
     * the end of the collection to the beginning of the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var reduced = o2.Collection.reduceRight(collection, function(
     *              store, value) {
     *      return store + value;
     * }, 0);
     * // reduced will be 15
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Functon} delegate - the reducer <code>Functon</code>.
     * @param {Object} store - the initial seed.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return a single reduced value.
     *
     * @see o2.Collection.reduce
     */
    exports.reduceRight = def(me,'reduceRight', function(obj, delegate, store,
                context) {
        var isSeeded = arguments.length > 2,
            iterator = delegate,
            reversed = null;

        if (!obj          ) {return null;}
        if (!isObject(obj)) {return null;}

        if (context) {
            iterator = bind(context, delegate);
        }

        // Array.prototype.reduceRight
        if (obj.reduceRight) {
            return isSeeded ?
                obj.reduceRight(iterator, store) :
                obj.reduceRight(iterator);
        }

        reversed = toArray(obj).reverse();

        return isSeeded ? reduce(reversed, iterator, store, context) :
            reduce(reversed, iterator);
    });

    /**
     * @function {static} o2.Collection.foldR
     *
     * <p>An <strong>alias</strong> to
     * {@link o2.Collection.reduceRight}.</p>
     *
     * @see o2.Collection.reduceRight
     */
    exports.foldR = alias(me, 'foldR', 'reduceRight');

    /**
     * @function {static} o2.Collection.removeElement
     *
     * <p>Removes all ocurences of the element from the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5]
     * var result = o2.Collection.removeElement(collection, 3);
     * // result will be [1, 2, 4, 5]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Object} elm - the element to remove.
     */
    exports.removeElement = def(me, 'removeElement', function(obj, elm) {
        var i    = 0,
            item = null,
            key  = null,
            len  = 0;

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                item = obj[i];

                if(item === elm) {
                    obj.splice(i, 1);
                    i--;
                    len = obj.length;
                }
            }

            return;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                item = obj[key];

                if(item === elm) {
                    delete obj[key];
                }
            }
        }
    });

    /**
     * @function {static} o2.Collection.removeElementByValue
     *
     * <p>Removes and element from the collection if it has a property named
     * <strong>name</strong> with a value <strong>value</strong>.</p>
     *
     * <p>This method works by reference, and alters the given collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = { lorem : 1, ipsum : 2, sit : 3}
     * o2.Collection.removeElementByValue(collection, 'sit', 3);
     * // collection will be {lorem : 1, ipsum : 2}
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {String} name - the name of the property.
     * @param {Object} value - the value to compare.
     *
     * @return a reference to <strong>obj</strong> itself.
     */
    exports.removeElementByValue = def(me, 'removeElementByValue', function(obj,
                name, value) {
        var i    = 0,
            item = null,
            key  = null,
            len  = 0;

        if (obj.splice) {
            for (i = 0, len = obj.length; i < len; i++) {
                item = obj[i];

                if(item[name] === value) {
                    obj.splice(i, 1);
                    i--;
                    len = obj.length;
                }
            }

            return obj;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                item = obj[key];

                if(item[name] === value) {
                    delete obj[key];
                }
            }
        }

        return obj;
    });

    /**
     * @function {static} o2.Collection.shuffle
     *
     * <p>Randomizes the collection. Does not alter the original collection,
     * just returns a randomized copy.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 2, 3, 4, 5];
     * var shuffled = o2.Collection.shuffle(ar);
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return an <code>Array</code> that's a shuffled copy of the initial
     * collection.
     */
    exports.shuffle = def(me,'shuffle', function(obj) {
        var collection = null,
            i          = 0,
            index      = null,
            len        = 0,
            result     = [],
            value      = null;

        if (!obj          ) {return result;}
        if (!isObject(obj)) {return result;}

        collection = isArray(obj) ? obj : toArray(obj);

        for (i = 0, len = collection.length; i < len; i++) {
            value = collection[i];

            if (i === 0) {
                result.push(value);
            } else {
                index         = floor(random() * (i + 1));
                result[i]     = result[index];
                result[index] = value;
            }
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.sort
     *
     * <p>Sorts the collection.</p>
     *
     * <p>Contrary to <code>Array.prototype.sort</code>, this function does not
     * sort the collection in place, and therefore it  does not alter the
     * initial object's contents.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 5, 4, 7];
     * var sorted = o2.Collection.sort(collection, function(item) {
     *      return item;
     * });
     * // sorted will be [1, 2, 4, 5, 7]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - (Optional, defaults to an identity function
     * that returns the original item) the sorter in the form
     * <code>function(value, index, collection)</code> where
     * <strong>value</strong> is the current item, <strong>index</strong> is
     * that item's index; and <strong>collection</strong> is
     * <strong>obj</strong>; this delegate should return an <code>Integer</code>
     * value.
     * <code>function(item, index, collection)</code>.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return a sorted copy of the initial collection.
     */
    exports.sort = def(me,'sort', function(obj, delegate, context) {
        var i        = 0,
            iterator = delegate || identity,
            key      = null,
            len      = 0,
            meta     = [],
            result   = null,
            value    = null;

        if (!obj          ) {return meta;}
        if (!isObject(obj)) {return meta;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                meta.push({
                    value : value,
                    order : iterator.apply(context, value, i, obj)
                });
            }
        } else {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    meta.push({
                        value : obj[key],
                        order : iterator.apply(context, value, i, obj)
                    });

                    i++;
                }
            }
        }

        meta.sort(function(left, right) {
            var l = left.order,
                r = right.order;

            if (l < r) {
                return -1;
            }

            if (l > r) {
                return 1;
            }

            return 0;
        });

        result = [];

        for(i = 0, len = meta.length; i < len; i++) {
            result.push(meta[i].value);
        }

        return result;
    });

    /**
     * @function {static} o2.Collection.some
     *
     * <p>Checks whether at least one element of the given
     * <strong>collection</strong> satisfies a condition given with
     * the <strong>delegate</strong>.</p>
     * <p>The <strong>delegate</strong> is in the form
     * <code>function(context, value, index, collection)</code>, iterates
     * through the items of the <strong>collection</strong> and returns
     * a <strong>boolean</strong> value. When this <strong>delegate</strong>
     * returns <code>true</code> in any iteratioin, <strong>some(...)</strong>
     * also returns true; it returns <code>false</code> otherwise.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var isSome = o2.Collection.some(collection, function(item) {
     *      return item > 4;
     * });
     * // isSome will be true
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param delegate - Iterator <code>Function</code> in the form
     * <code>function(value, index, collection)</code>.
     * @param {Object} context - The context to regard as <code>this</code>
     * reference.
     *
     * @return <code>true</code> if the <strong>iterator</strong> returns
     * <code>true</code> for at least one element; returns <code>false</code>
     * otherwise.
     */
    exports.some = def(me,'some', function(obj, delegate, context) {
        var i        = 0,
            index    = 0,
            iterator = delegate || identity,
            key      = null,
            len      = 0,
            result   = false;

        if (!obj) {return false;}

        // Array.prototype.some
        if (obj.some) {
            return obj.some(iterator, context);
        }

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                if (result) {break;}

                result = iterator.apply(context, [obj[i], i, obj]);
            }

            return !!result;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (result) {break;}

                result = iterator.apply(context,
                    [obj[key], index, obj]);

                index++;
            }
        }

        return !!result;
    });

    /**
     * @function {static} o2.Collection.any
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.some}.</p>
     *
     * @see o2.Collection.some
     */
    exports.any = alias(me, 'any', 'some');

    /**
     * @function {static} o2.Collection.flatten
     *
     * <p>Shallow flattens an <code>Array</code>.</p>
     * <p>Does not alter the original object, returns a new flattened object
     * instead.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [[1, 2], [3, 4], 5]
     * var flattened = o2.Object.flatten(ar);
     * // flattened is [1, 2, 3, 4, 5]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return the flattened collection.
     */
    exports.flatten = def(me, 'flatten', function(obj) {
        var i     = 0,
            key   = null,
            len   = 0,
            store = [],
            value = null;

        if (!obj          ) {return store;}
        if (!isObject(obj)) {return store;}

        if (isArray(obj)) {
            for(i = 0, len = obj.length; i < len; i++) {
                value = obj[key];

                if (isArray(value)) {
                    store.concat(value);
                } else {
                    store.push(value);
                }
            }

            return store;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];

                if (isArray(value)) {
                    store.concat(value);
                } else {
                    store.push(value);
                }
            }
        }

        return store;
    });

    /*
     *
     */
    flatten = require(kModuleName, 'flatten');

    /**
     * @function {static} o2.Collection.union
     *
     * <p>Merges several collections into a single <code>Array</code></p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var union = o2.Collection.union([1, 2], [2, 3], [3, 4], [5]);
     * // union will be [1, 2, 3, 4, 5]
     * </pre>
     *
     * @param {...} varargin - the collections to merge as input parameters.
     *
     * @return the merged <code>Array</code>.
     *
     * @see o2.Collection.diff
     * @see o2.Collection.istersect
     */
    exports.union = def(me,'union', function() {
        return unique(flatten(arguments));
    });

    /**
     * @function {static} o2.Collection.zip
     *
     * <p>Takes a set of <code>Array</code>s as parameters and brings together
     * the elements that have the same index.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar1 = [1,2,3];
     * var ar2 = ['a', 'b', 'c', 'd'];
     * var ar3 = [true, false];
     *
     * // returns:
     * // [
     * //       [1, 'a', true],
     * //       [2. 'b', false],
     * //       [3, 'c'],
     * //       ['d']
     * // ]
     * zip(ar1, ar2, ar3);
     * </pre>
     *
     * @param {...} varargin - the <code>Array</code>s to zip as a variable
     * number of input arguments.
     *
     * @return a zipped <code>Array</code>.
     */
    exports.zip = def(me,'zip', function() {
        var args    = slice.call(arguments),
            i       = 0,
            length  = getMax(pluck(args, kLength)),
            results = [];

        for (i = 0; i < length; i++) {
            results[i] = pluck(args, [kEmpty, i].join(kEmpty));
        }

        return results;
    });
}(this.o2, this.o2.protecteds, this));
