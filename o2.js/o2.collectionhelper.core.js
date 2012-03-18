/**
 * @module   collectionhelper.core
 * @requires core
 * @requires methodhelper.core
 * @requires validator.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-18 17:09:55.394486
 * -->
 *
 * <p>A utility <strong>class</strong> to modify collections.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var alias     = attr(_, 'alias');
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'CollectionHelper';

    /**
     * @class {static} o2.CollectionHelper
     *
     * <p>A <strong>class</strong> to modify collections.</p>
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var kMethodHelper = 'MethodHelper';
    var identity      = require(kMethodHelper, 'identity');
    var bind          = require(kMethodHelper, 'bind');

    var kValidator = 'Validator';
    var isArguments = require(kValidator, 'isArguments');
    var isArray     = require(kValidator, 'isArray');
    var isFunction  = require(kValidator, 'isFunction');
    var isObject    = require(kValidator, 'isObject');

    var slice = attr(Array.prototype, 'slice');

    var floor  = attr(Math, 'floor');
    var max    = attr(Math, 'max');
    var min    = attr(Math, 'min');
    var random = attr(Math, 'random');

    /*
     * Common Constants
     */
    var kEmpty  = '';
    var kLength = 'length';

    /**
     * @function {static} o2.CollectionHelper.clear
     *
     * <p>Removes all the elements of the <code>Object</code>.</p>
     *
     * @param {Object} ar - the <code>Object</code> to clear.
     *
     * @return a <strong>reference</strong> to the object itself.
     */
    def(me, 'clear', function(ar) {
        var key = null;

        if (!ar) {
            return null;
        }

        if (isArray(ar)) {
            ar.length = 0;

            return ar;
        }

        if (!isObject(ar)) {
            return ar;
        }

        for (key in ar) {
            if (ar.hasOwnProperty(key)) {
                delete ar[key];
            }
        }

        return ar;
    });

    /**
     * @function {static} o2.CollectionHelper.copy
     *
     * <p>Creates a clone of the given <code>Object</code>, and returns it;
     * leaving the original intact.</p>
     *
     * @param {Object} ar - the object to clone.
     *
     * @return the copied <code>Object</code>.
     */
    def(me,'copy', function(ar) {
        if (!ar) {
            return [];
        }

        if (!isObject(ar)) {
            return ar;
        }

        var theCopy = isArray(ar) ? [] : {};
        var key = null;

        if (isArray(ar)) {
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
     * @function {static} o2.CollectionHelper.clone
     *
     * <p>An <strong>alias</strong> to {@link o2.CollectionHelper.copy}.</p>
     *
     * @see o2.CollectionHelper.copy
     */
    alias(me, 'clone', 'copy');

    /**
     * @function {static} o2.CollectionHelper.compact
     *
     * <p>Remove <code>null</code>, and <code>undefined</code> members from
     * the <code>Object</code>.
     * This function alters the actual <code>Object</code>.</p>
     *
     * @param {Object} ar - the <code>Object</code> to clean.
     *
     * @return a reference to the <code>Object</code> itself.
     */
    def(me,'compact', function(ar) {
        var value = null;
        var i = 0;
        var len = 0;
        var key = null;

        if (!ar) {
            return null;
        }

        if (!isObject(ar)) {
            return ar;
        }

        if (isArray(ar)) {
            for (i = 0, len = ar.length; i < len; i++) {
                value = ar[i];

                if (value === null || value === undefined) {
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

                if (value === null || value === undefined) {
                    delete ar[key];
                }
            }
        }

        return ar;
    });

    /**
     * @function {static} o2.CollectionHelper.indexOf
     *
     * <p>Gets the index of the element in the given <code>Array</code>.</p>
     *
     * @param {Object} ar - the <code>Array</code> or <code>Object</code> to
     * search.
     * @param {Object} elm - the <code>Object</code> to match.
     *
     * @return the index of the element if found, <code>-1</code> otherwise.
     */
    def(me, 'indexOf', function(ar, elm) {
        if (!ar) {
            return -1;
        }

        // Array.prototype.indexOf
        if (ar.indexOf) {
            return ar.indexOf(elm);
        }

        var i = 0;
        var len = 0;

        if (!isObject(ar)) {
            return -1;
        }

        if (isArray(ar)) {
            for (i = 0, len = ar.length; i < len; i++) {
                if (elm === ar[i]) {
                    return i;
                }
            }

            return -1;
        }

        var key = null;
        var counter = 0;

        if (!isObject(ar)) {
            for (key in ar) {
                if (ar.hasOwnProperty(key)) {
                    if (ar[key] === elm) {
                        return counter;
                    }

                    counter++;
                }
            }

            return -1;
        }

        return -1;
    });

    /*
     *
     */
    var indexOf = require(kModuleName, 'indexOf');

    /**
     * @function {static} o2.CollectionHelper.contains
     *
     * <p>An <strong>alias</strong> to <code>o2.CollectionHelper.indexOf(ar,
     * elm) &gt; -1</code>.</p>
     *
     * @param {Array} ar - the <code>Array</code> to search.
     * @param {Object} elm - the <code>Object</code> to match.
     *
     * @return <code>true</code> if the <code>Array</code> contains the item,
     * <code>false</code> otherwise.
     */
    def(me,'contains', function(ar, elm) {
        if (!ar) {
            return -1;
        }

        if (!isObject(ar)) {
            return -1;
        }

        return indexOf(ar, elm) > -1;
    });

    /**
     * @function {static} o2.CollectionHelper.includes
     *
     * <p>An <strong>alias</strong> to {@link o2.CollectionHelper.contains}
     *
     * @see o2.CollectionHelper.contains
     */
    alias(me, 'includes', 'contains');

    var contains = require(kModuleName, 'contains');

    /**
     * @function {static} o2.CollectionHelper.inArray
     *
     * <p>An <strong>alias</strong> to {@link o2.CollectionHelper.contains}
     *
     * @see o2.CollectionHelper.contains
     */
    alias(me, 'inArray', 'contains');

    /**
     * @function {static} o2.CollectionHelper.find
     *
     * <p>Gets the first <strong>collection</strong> item that validates
     * against the given <strong>delegator</strong>.</p>
     *
     * @param {Object} collection - the <code>Array</code> or an iterable
     * <code>Object</code>.
     * @param delegate - Iterator <code>Function</code> in the form
     * <code>function(context, value, index, collection)</code>.
     * @param {Object} context - the context that acts as the <code>this</code>
     * reference in the <strong>iterator</strong>.
     *
     * @return the first truthy evaluated item; <code>null</code> if nothing
     * is found.
     */
    def(me,'find', function(collection, delegate, context) {
        var result = null;
        var index = 0;
        var key = null;
        var i = 0;
        var value = null;
        var len = 0;

        if (!collection) {
            return null;
        }

        if (!isObject(collection)) {
            return null;
        }

        if (isArray(collection)) {
            for (i = 0, len = collection.length; i < len; i++) {
                value = collection[i];

                if(delegate.apply(context, [value, i, collection])) {
                    result = value;

                    break;
                }
            }

            return result;
        }

        for(key in collection) {
            if(collection.hasOwnProperty(key)) {
                value = collection[key];
                if(delegate.apply(context, [value, index, collection])) {
                    result = value;

                    break;
                }

                index++;
            }
        }

        return result;
    });

    /**
     * @function {static} o2.CollectionHelper.detect
     *
     * <p>An <strong>alias</strong> to {@link o2.CollectionHelper.find}.</p>
     *
     * @see o2.CollectionHelper.find
     */
    alias(me, 'detect', 'find');

    /**
     * @function {static} o2.CollectionHelper.forEach
     *
     * <p>Executes a delegate of the form
     * <code>fn(item, currentIndex, collection)</code> for each element
     * of the <strong>collection</strong>.</p>
     *
     * @param {Object} collection - the current object to iterate.
     * @param {Function} delegate - the iterator in the form
     * <code>function(item, index, collection)</code>.
     */
    def(me, 'forEach', function(collection, delegate) {
        if (!collection) {
            return;
        }

        if (!isObject(collection)) {
            return;
        }

        if (collection.forEach) {
            collection.forEach(delegate);

            return;
        }

        var i = 0;
        var len = 0;

        if (isArray(collection)) {
            for (i = 0, len = collection.length; i < len; i++) {
                delegate(collection[i], i, collection);
            }

            return;
        }

        var key = null;

        for (key in collection) {
            if(collection.hasOwnProperty(key)) {
                delegate(collection[key], key, collection);
            }
        }
    });

    /**
     * @function {static} o2.CollectionHelper.each
     *
     * <p>An alias to {@link o2.CollectionHelper.forEach}.</p>
     *
     * @see o2.CollectionHelper.forEach
     */
    alias(me, 'each', 'forEach');

    /**
     * @function {static} o2.CollectionHelper.diff
     *
     * <p>Takes the difference between the current collection and a number of
     * other collections. Only items that do not remain in the rest of the
     * collections will be returned.</p>
     *
     * @param {Arguments} ... - variable number of input arguments; each
     * argument should either be an <code>Array</code> or an iterable
     * <code>Object</code>.
     *
     * @return an <code>Array</code> of non-matching items.
     */
    def(me,'diff', function(collection) {
        var result = [];
        var rest = null;
        var value = null;
        var i = 0;
        var len = 0;
        var key = null;

        if (!collection) {
            return result;
        }

        if (!isObject(collection)) {
            return result;
        }

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
     * @function {static} o2.CollectionHelper.getDifference
     *
     * <p>An <strong>alias</strong> to {@link o2.CollectionHelper.diff}.</p>
     *
     * @see o2.CollectionHelper.diff
     */
    alias(me, 'getDifference', 'diff');

    /**
     * @function {static} o2.CollectionHelper.every
     *
     * <p>Check whether every element of a collection passes a truth test.</p>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable collection.
     * @param {Function} delegate - an iterator of the form
     * <code>function(item, index, obj)</code>; where <strong>item</strong> is
     * the current collection item, <strong>index</strong> is the current index
     * and <strong>obj</strong> is the collection itself.
     * @param {Object} context - the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return <code>true</code> if <strong>delegate</strong> returns
     * <code>true</code> for every element of the collection; <code>false</code>
     * otherwise.
     */
    def(me,'every', function(obj, delegate, context) {
        var result = true;
        var i = 0;
        var len = 0;
        var key = null;

        if (!obj) {
            return true;
        }

        if (!isObject(obj)) {
            return;
        }

        // Array.prototype.every
        if (obj.every) {
            return obj.every(delegate, context);
        }

        if (isArray(obj)) {
            for(i = 0, len = obj.length; i < len; i++) {
                result = delegate.apply(context, [obj[i], i, obj]);

                if (!result) {
                    return false;
                }
            }

            return true;
        }

        var counter = 0;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result = delegate.apply(context, [obj[key], counter, obj]);

                if (!result) {
                    return false;
                }

                counter++;
            }
        }

        return true;
    });

    /**
     * @function {static} o2.CollectionHelper.exclude
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Function} delegate -
     * @param {Object} context -
     */
    def(me,'exclude', function(obj, delegate, context) {
         var results = [];
         var key = null;
         var i = 0;
         var len = 0;
         var value = null;

         if (!obj) {
             return results;
         }

         if (!isObject(obj)) {
            return results;
         }

         if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                value = obj[i];
                if (!delegate.apply(context, value, i, obj)) {
                    results.push(value);
                }
            }

             return results;
         }

         var counter = 0;

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
     * @function {static} o2.CollectionHelper.reject
     *
     * <p></p>
     *
     * @see
     */
    alias(me, 'reject', 'exclude');

    /**
     * @function {static} o2.CollectionHelper.extend
     *
     * <p>Merges two <code>Object</code>s or <code>Array</code>s.</p>
     *
     * @param {Object} toObj - the <code>Object</code> to copy values to.
     * @param {Object} fromObj - the <code>Object</code> to copy values from.
     *
     * @return a <strong>reference</strong> to the modified
     * <code>toObj</code>.
     */
    def(me,'extend', function(toObj, fromObj) {
         var value = null;
         var key = null;
         var i = 0;
         var len = 0;

        if (!toObj) {
            return {};
        }

        if (!isObject(toObj)) {
            return toObj;
        }

        if (!isObject(fromObj)) {
            return toObj;
        }

         if (isArray(toObj)) {
             if(!isArray(fromObj)) {
                 return toObj;
             }

             i = 0;
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
     * @function {static} o2.CollectionHelper.merge
     *
     * <p></p>
     *
     * @see
     */
    alias(me, 'merge', 'extend');

    /**
     * @function {static} o2.CollectionHelper.getFirst
     *
     * <p></p>
     *
     * @param {Object} obj -
     *
     * @return
     */
    def(me,'getFirst', function(obj) {
        var key = null;

        if (!obj) {
            return null;
        }

        if (!isObject(obj)) {
            return null;
        }

        if (isArray(obj)) {
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
     * @function {static} o2.CollectionHelper.getFirstN
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Integer} n -
     */
    def(me,'getFirstN', function(obj, n) {
        var i = 0;
        var len = 0;
        var key = null;
        var result = [];

        if (!obj) {
            return [];
        }

        if (!isObject(obj)) {
            return [];
        }

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
     * @function {static} o2.CollectionHelper.getFunctions
     *
     * <p></p>
     *
     * @param {Object} obj -
     */
    def(me,'getFunctions', function(obj) {
        var result = [];
        var key = null;
        var value = null;

        if (!obj) {
            return result;
        }

        if (!isObject(obj)) {
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
     * @function {static} o2.CollectionHelper.getMethods
     *
     * <p></p>
     *
     * @see
     */
    alias(me, 'getMethods', 'getFunctions');

    /**
     * @function {static} o2.CollectionHelper.getKeys
     *
     * <p></p>
     *
     * @param {Object} obj -
     */
    def(me,'getKeys', function(obj) {
        var key = null;
        var result = [];

        if (!obj) {
            return result;
        }

        if (!isObject(obj)) {
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
     * @function {static} o2.CollectionHelper.getLast
     *
     * <p></p>
     *
     * @param {Object} obj -
     */
    def(me,'getLast', function(obj) {
        var last = null;
        var key = null;

        if (!obj) {
            return last;
        }

        if (!isObject(obj)) {
            return last;
        }

        if (isArray(obj)) {
            return obj.length ? obj[obj.length - 1] : null;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                last = obj[key];
            }
        }

        return last;
    });

    /**
     * @function {static} o2.CollectionHelper.getLastN
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Integer} n -
     *
     * @return
     */
    def(me,'getLastN', function(obj, n) {
        var len = 0;
        var i = 0;
        var key = null;
        var result = [];

        if (!obj) {
            return result;
        }

        if (!isObject(obj)) {
            return result;
        }

        if (!n) {
            return result;
        }

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
     * @function {static} o2.CollectionHelper.isEmpty
     *
     * <p></p>
     *
     * @param {Object} collection
     *
     * @return
     */
    def(me,'isEmpty', function (collection) {
         if (!collection) {
             return true;
         }

         if (!isObject(collection)) {
            return true;
         }

         var key = null;

         for (key in collection) {
             if (collection.hasOwnProperty(key)) {
                 return false;
             }
         }

         return true;
    });

    /*
     *
     */
    var isEmpty = require(kModuleName, 'isEmpty');

    /**
     * @function {static} o2.CollectionHelper.getMax
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Function} calculator -
     * @param {Object} context -
     *
     * @return
     */
    def(me,'getMax', function(obj, calculator, context) {
        var key = null;
        var store = null;
        var result = -Infinity;
        var calculated = null;
        var index = 0;

        if (!obj) {
            return result;
        }

        if (!isObject(obj)) {
            return result;
        }

        if (!calculator) {
            if (isArray(obj)) {
                return max.apply(Math, obj);
            }

            if (isEmpty(obj)) {
                return result;
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

                calculated = calculator ? calculator.apply(context,
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
    var getMax = require(kModuleName, 'getMax');

    /**
     * @function {static} o2.CollectionHelper.getMin
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Function} calculator -
     * @param {Object} context -
     *
     * @return
     */
    def(me,'getMin', function(obj, calculator, context) {
        var key = null;
        var store = null;
        var result = Infinity;
        var calculated = null;
        var index = 0;

        if (!obj) {
            return result;
        }

        if (!isObject(obj)) {
            return result;
        }

        if (!calculator) {
            if (isArray(obj)) {
                return min.apply(Math, obj);
            }

            if (isEmpty(obj)) {
                return result;
            }

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

                calculated = calculator ? calculator.apply(context,
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
     * @function {static} o2.CollectionHelper.getRest
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Integer} n -
     *
     * @return
     */
    def(me,'getRest', function(obj, n) {
        var result = [];
        var key = null;
        var index = 0;
        var cutAt = 0;

        if (!obj) {
            return result;
        }

        if (!isObject(obj)) {
            return result;
        }

        cutAt = n || 1;

        if (isArray(obj)) {
            return slice.apply(obj, [cutAt]);
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
     * @function {static} o2.CollectionHelper.getSize
     *
     * @param {Object} obj -
     *
     * @return
     */
    def(me,'getSize', function(obj) {
        var counter = 0;
        var key = null;

        if (!obj) {
            return 0;
        }

        if (!isObject(obj)) {
            return 0;
        }

        if (obj.length !== undefined) {
            return obj.length;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                counter++;
            }
        }

        return counter;
    });

    /**
     * @function {static} o2.CollectionHelper.getCount
     *
     * <p></p>
     *
     * @see
     */
    alias(me, 'getCount', 'getSize');

    /**
     * @function {static} o2.CollectionHelper.getLength
     *
     * <p></p>
     *
     * @see
     */
    alias(me, 'getLength', 'getSize');

    /**
     * @function {static} o2.CollectionHelper.getSortedIndex
     *
     * <p></p>
     *
     * @param {Array} array -
     * @param {Object} item -
     * @param {Function} delegate -
     *
     * @return
     */
    def(me,'getSortedIndex', function(array, item, delegate) {
        if (!isArray(array)) {
            return -1;
        }

        var iterator = delegate || identity;

        var low = 0;
        var high = array.length;
        var mid = 0;

        // Binary search:
        while (low < high) {
            mid = (low + high) >> 1;

            if (iterator(array[mid]) < iterator(item)) {
                low = mid +1;
            } else {
                high = mid;
            }
        }

        return low;
    });

    /**
     * @function {static} o2.CollectionHelper.getValues
     *
     * @param {Object} obj -
     *
     * @return
     */
    def(me,'getValues', function(obj) {
        var key = null;
        var result = [];

        if (!obj) {
            return null;
        }

        if (!isObject(obj)) {
            return null;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(obj[key]);
            }
        }

        return result;
    });

    /**
     * @function {static} o2.CollectionHelper.grep
     *
     * <p></p>
     *
     * @param {Object} collection -
     * @param {Function} delegate -
     *
     * @return
     */
    def(me,'grep', function(collection, delegate) {
        var result = [];

        var item = null;
        var key = null;
        var len = 0;
        var i = 0;

        if (!collection) {
            return result;
        }

        if (isArray(collection)) {
            for (i = 0, len = collection.length; i < len; i++) {
                item = collection[i];

                if(delegate(item)) {
                    result.push(item);
                }
            }

            return result;
        }

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                item = collection[key];

                if(delegate(item)) {
                    result.push(item);
                }
            }
        }

        return result;
    });

    /**
     * @function {static} o2.CollectionHelper.select
     *
     * <p></p>
     *
     * @see
     */
    alias(me, 'select', 'grep');

    /**
     * @function {static} o2.CollectionHelper.filter
     *
     * <p></p>
     *
     * @see
     */
    alias(me, 'filter', 'grep');

    /**
     * @function {static} o2.CollectionHelper.group
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Function} delegate -
     *
     * @return
     */
    def(me,'group', function(obj, delegate) {
        var result = {};
        var i = 0;
        var len = 0;
        var value = null;
        var key = null;
        var ky = null;
        var iterator = isFunction(delegate) ? delegate :
            function(obj) { return obj[delegate]; };

        if (!obj) {
            return result;
        }

        if (!isObject(obj)) {
            return result;
        }

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                value = obj[i];
                ky = iterator(value, i);

                if (!result[ky]) {
                    result[ky] = [];
                }

                result[ky].push(value);
            }
         } else {
            i = 0;

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    value = obj[key];
                    ky = iterator(value, i);

                    if (!result[ky]) {
                        result[ky] = [];
                    }

                    result[ky].push(value);

                    i++;
                }
            }
         }

         return result;
    });

    /**
     * @function {static} o2.CollectionHelper.toArray
     *
     * @param {Object} obj -
     *
     * @return
     */
    def(me,'toArray', function(obj) {
        var key = null;
        var result = [];

        if (!obj) {
            return result;
        }

        if (obj.toArray) {
            return obj.toArray();
        }

        if (isArray(obj)) {
            return slice.apply(obj);
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
    var toArray = require(kModuleName, 'toArray');

    /**
     * @function {static} o2.CollectionHelper.map
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Function} delegate -
     * @param {Object} context -
     *
     * @return
     */
    def(me,'map', function(obj, delegate, context) {
        var results = [];
        var i = 0;
        var len = 0;
        var value = null;
        var key = null;

        if (!obj) {
            return results;
        }

        if (!isObject(obj)) {
            return results;
        }

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
    var map = require(kModuleName, 'map');

    /**
     * @function {static} o2.CollectionHelper.unique
     *
     * @param {Object} array -
     * @param {Function} delegate -
     *
     * @return
     */
    def(me,'unique', function(array, delegate) {
        var result = [];
        var cache = [];
        var ar = null;
        var elm = null;
        var i = 0;
        var len = 0;

        if (!array) {
            return result;
        }

        if (isArray(array)) {
            ar = array.slice().sort();
        } else {
            ar = toArray(array).sort();
        }

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
     var unique = require(kModuleName, 'unique');

    /**
     * @function {static} o2.CollectionHelper.intersect
     *
     * @param {...} varargin -
     *
     * @return
     */
    def(me,'intersect', function(ar) {
        var result = unique(ar);
        var peers = slice.apply(arguments, [1]);
        var peer = null;
        var item = null;
        var i = 0;
        var len = 0;
        var j = 0;
        var jlen = 0;

        if (result.length === 0) {
            return [];
        }

        for (i = 0, len = peers.length; i < len; i++) {
            peer = unique(peers[i]);

            if (!isObject(peer)) {
                return [];
            }

            for (j = 0, jlen = result.length; j < jlen; j++) {
                item = result[j];

                if (!contains(peer, item)) {
                    result.splice(j, 1);
                }

                if (result.length === 0) {
                    return [];
                }
            }
        }

        return result;
    });

    /**
     * @function {static} o2.CollectionHelper.invoke
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Function} delegate -
     *
     * @return
     */
    def(me,'invoke', function(obj, delegate) {
        var i = 0;
        var len = 0;
        var item = null;
        var invoker = null;
        var key = null;

        if (arguments.length < 2) {
            return;
        }

        if (!obj) {
            return;
        }

        if (!isObject(obj)) {
            return;
        }

        var args = slice.apply(arguments, [2]);

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                item = obj[i];
                invoker = isFunction(delegate) ? delegate : item[delegate];
                invoker.apply(item, args);
            }

            return;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                item = obj[key];
                invoker = isFunction(delegate) ? delegate : item[delegate];
                invoker.apply(item, args);
            }
        }
    });

    /**
     * @function {static} o2.CollectionHelper.lastIndexOf
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Object} item -
     *
     * @return
     */
    def(me,'lastIndexOf', function(obj, item) {
        var i = 0;

        if (!obj) {
            return -1;
        }

        if (!isObject(obj)) {
            return -1;
        }

        // Array.prototype.lastIndexOf
        if (obj.lastIndexOf) {
            return obj.lastIndexOf(item);
        }

        var collection = isArray(obj) ? obj : toArray(obj);

        for (i = collection.length - 1; i >= 0; i--) {
            if (collection[i] === item) {
                return i;
            }
        }

        return -1;
    });

    /**
     * @function {static} o2.CollectionHelper.pluck
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Object} key -
     *
     * @return
     */
    def(me,'pluck', function(obj, key) {
        var result = [];
        var i = 0;
        var len = 0;
        var k = null;

        if (!obj) {
            return result;
        }

        if (!isObject(obj)) {
            return result;
        }

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
    var pluck = require(kModuleName, 'pluck');

    /**
     * @function {static} o2.CollectionHelper.reduce
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
     * @param {Object} collection - an <code>Array</code> or an iterable
     * <code>Object</code> to iterate.
     * @param {Functon} delegate - the reducer <code>Functon</code>.
     * @param {Object} store - the initial seed.
     * @param {Object} context - the context to be used as the <code>this</code>
     * reference in the iterator <strong>delegate</strong>.
     *
     * @return a single reduced value.
     */
    def(me, 'reduce', function(collection, delegate, store, context) {
        var isSeeded = arguments.length > 2;
        var value = null;
        var key = null;
        var cache = store;
        var iterator = delegate;
        var index = 0;
        var i = 0;
        var len = 0;
        var obj = null;

        if (!collection) {
            return null;
        }

        if (!isObject(collection)) {
            return null;
        }

        obj = collection || [];

        // Array.prototype.reduce
        if (obj.reduce) {
            if (context) {
                iterator = bind(context, delegate);
            }

            return isSeeded ?
                obj.reduce(iterator, store) :
                obj.reduce(iterator);
        }

        if (isArray(collection)) {
            for(i = 0, len = collection.length; i < len; i++) {
                value = collection[i];

                if (!isSeeded) {
                    cache = value;
                    isSeeded = true;
                } else {
                    cache = iterator.apply(context,
                        [cache, value, i, collection]
                    );
                }
            }

            if (!isSeeded) {
                throw 'redude: empty collection with no seed';
            }

            return cache;
        }

        for(key in collection) {
            if(collection.hasOwnProperty(key)) {
                value = collection[key];

                if (!isSeeded) {
                    cache = value;
                    isSeeded = true;
                } else {
                    cache = iterator.apply(context,
                        [cache, value, index, collection]
                    );
                }

                index++;
            }
        }

        if (!isSeeded) {
            throw 'redude: empty collection with no seed';
        }

        return cache;
    });

    /*
     *
     */
    var reduce = require(kModuleName, 'reduce');

    /**
     * @function {static} o2.CollectionHelper.fold
     *
     * <p></p>
     *
     * @see
     */
    alias(me, 'fold', 'reduce');

    /**
     * @function {static} o2.CollectionHelper.reduceRight
     *
     * @param {Object} collection -
     * @param {Function} delegate -
     * @param {Object} store -
     * @param {Object} context -
     *
     * @return
     */
    def(me,'reduceRight', function(collection, delegate, store, context) {
        var isSeeded = arguments.length > 2;
        var obj = collection || [];
        var iterator = delegate;

        if (!isObject(obj)) {
            return null;
        }

        if (context) {
            iterator = bind(context, delegate);
        }

        // Array.prototype.reduceRight
        if (obj.reduceRight) {
            return isSeeded ?
                obj.reduceRight(iterator, store) :
                obj.reduceRight(iterator);
        }

        var reversed = toArray(obj).reverse();

        return isSeeded ? reduce(reversed, iterator, store, context) :
            reduce(reversed, iterator);
    });

    /**
     * @function {static} o2.CollectionHelper.foldR
     *
     * <p></p>
     *
     * @see
     */
    alias(me, 'foldR', 'reduceRight');

    /**
     * @function {static} o2.CollectionHelper.reject
     *
     * <p></p>
     *
     * @param {Object} obj -
     * @param {Function} delegate -
     * @param {Object} context -
     *
     * @return
     */
    def(me,'reject', function(obj, delegate, context) {
        var results = [];
        var i = 0;
        var len = 0;
        var value = null;
        var key = null;

        if (!obj) {
            return results;
        }

        if (!isObject(obj)) {
            return results;
        }

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                value = obj[i];

                if (!delegate.apply(context, [value, i, obj])) {
                    results.push(value);
                }
            }

            return results;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];

                if (!delegate.apply(context, [value, i, obj])) {
                    results.push(value);
                }

                i++;
            }
        }

        return results;
    });

    /**
     * @function {static} o2.CollectionHelper.removeElement
     *
     * <p></p>
     *
     * @param {Object} collection -
     * @param {Object} elm -
     */
    def(me, 'removeElement', function(collection, elm) {
        var item = null;
        var i = 0;
        var len = 0;
        var key = null;

        if (isArray(collection)) {
            for (i = 0, len = collection.length; i < len; i++) {
                item = collection[i];

                if(item === elm) {
                    collection.splice(i, 1);
                    i--;
                    len = collection.length;
                }
            }

            return;
        }

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                item = collection[key];

                if(item === elm) {
                    delete collection[key];
                }
            }
        }
    });

    /**
     * @function {static} o2.CollectionHelper.removeElementByValue
     *
     * <p>Removes and element from the collection if it has a property named
     * <strong>name</strong> with a value <strong>value</strong>.</p>
     *
     * @param {Object} collection - an <code>Object</code> or an
     * <code>Array</code> to update.
     * @param {String} name - the name of the property.
     * @param {Object} value - the value to compare.
     */
    me.removeElementByValue = function(collection, name, value) {
        var item = null;
        var i = 0;
        var len = 0;
        var key = null;

        if (isArray(collection)) {
            for (i = 0, len = collection.length; i < len; i++) {
                item = collection[i];

                if(item[name] === value) {
                    collection.splice(i, 1);
                    i--;
                    len = collection.length;
                }
            }

            return;
        }

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                item = collection[key];

                if(item[name] === value) {
                    delete collection[key];
                }
            }
        }
    };

    /**
     * @function {static} o2.CollectionHelper.shuffle
     *
     * @param {Object} -
     *
     * @return
     */
    def(me,'shuffle', function(obj) {
        var result = [];
        var i = 0;
        var len = 0;
        var value = null;
        var index = null;
        var collection = null;

        if (!obj) {
            return result;
        }

        if (!isObject(obj)) {
            return result;
        }

        if (!isArray(obj)) {
            collection = toArray(obj);
        } else {
            collection = obj;
        }

        for (i = 0, len = collection.length; i < len; i++) {
            value = collection[i];

            if (i === 0) {
                result.push(value);
            } else {
                index = floor(random() * (i + 1));
                result[i] = result[index];
                result[index] = value;
            }
        }

        return result;
    });

    /**
     * @function {static} o2.CollectionHelper.sort
     *
     * <p>Contrary to array.sort, this does not sort in place, and does
     * not alter the initial object</p>
     *
     * @param {Object} obj -
     * @param {Function} delegate -
     * @param {Object} context -
     *
     * @return
     */
    def(me,'sort', function(obj, delegate, context) {
        var meta = [];
        var i = 0;
        var len = 0;
        var value = null;

        if (!obj) {
            return meta;
        }

        if (!isObject(obj)) {
            return meta;
        }

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                meta.push({
                    value : value,
                    order : delegate.apply(context, value, i, obj)
                });
            }
        }

        meta.sort(function(left, right) {
            var l = left.order;
            var r = right.order;

            if (l < r) {
                return -1;
            }

            if (l > r) {
                return 1;
            }

            return 0;
        });

        var result = [];

        for(i = 0, len = meta.length; i < len; i++) {
            result.push(meta[i].value);
        }

        return result;
    });

    /**
     * @function {static} o2.CollectionHelper.some
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
     * @param {Object} collection - An <code>Array</code>, or an iterable
     * <code>Object</code>.
     * @param delegate - Iterator <code>Function</code> in the form
     * <code>function(context, value, index, collection)</code>.
     * @param {Object} - The context to regard as <code>this</code> reference.
     *
     * @return  <code>true</code> if the <strong>iterator</strong> returns
     * <code>true</code> for at least one element; returns <code>false</code>
     * otherwise.
     */
    def(me,'some', function(collection, delegate, context) {
        var iterator = delegate || identity;

        if (!collection) {
            return false;
        }

        // Array.prototype.some
        if (collection.some) {
            return collection.some(iterator, context);
        }

        var index = 0;
        var key = null;
        var result = false;

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                if (result) {
                    break;
                }

                result = iterator.apply(context,
                    [collection[key], index, collection]);

                index++;
            }
        }

        return !!result;
    });

    /**
     * @function {static} o2.CollectionHelper.any
     *
     * <p>An <strong>alias</strong> to {@link o2.CollectionHelper.some}.</p>
     *
     * @see o2.CollectionHelper.some
     */
    alias(me, 'any', 'some');

    /**
     * @function {static} o2.CollectionHelper.touch
     *
     * @param {Object} obj -
     * @param {Function} delegate -
     *
     * @return
     */
    def(me,'touch', function(obj, delegate) {
        if (!obj) {
            return null;
        }

        if (!isObject(obj)) {
            return null;
        }

        delegate(obj);

        return obj;
    });

    /**
     * @function {static} o2.CollectionHelper.flatten
     *
     * <p>Shallow flattens an <code>Array</code>.</p>
     *
     * @param {Array} collection - an <code>Array</code> of <code>Array>
     *
     * @return
     */
    def(me, 'flatten', function(collection) {
        var store = [];
        var i = 0;
        var len = 0;
        var value = null;
        var key = null;

        if (!collection) {
            return store;
        }

        if (!isObject(collection)) {
            return store;
        }

        if (isArray(collection)) {
            for(i = 0, len = collection.length; i < len; i++) {
                value = collection[key];

                if (isArray(value)) {
                    store.concat(value);
                } else {
                    store.push(value);
                }
            }

            return store;
        }

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                value = collection[key];

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
    var flatten = require(kModuleName, 'flatten');

    /**
     * @function {static} o2.CollectionHelper.union
     *
     * <p></p>
     *
     * @param {...} varargin -
     *
     * @return
     */
    def(me,'union', function() {
        return unique(flatten(arguments));
    });

    /**
     * @function {static} o2.CollectionHelper.zip
     *
     * <p></p>
     *
     * @param {...} varargin -
     *
     * @return
     */
    def(me,'zip', function() {
        var args = slice.call(arguments);
        var length = getMax(pluck(args, kLength));
        var results = [];
        var i = 0;

        for (i = 0; i < length; i++) {
            results[i] = pluck(args, [kEmpty, i].join(kEmpty));
        }

        return results;
    });
}(this.o2, this));
