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
 *  lastModified: 2012-01-29 22:00:03.013716
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


    /**
     * @class {static} o2.CollectionHelper
     *
     * <p>A <strong>class</strong> to modify collections.</p>
     */
    var me = create('CollectionHelper');

    /*
     * Aliases
     */

    var kMethodHelper = 'MethodHelper';
    var identity      = require(kMethodHelper, 'identity');
    var bind          = require(kMethodHelper, 'bind');


//////////////////////////
    var slice = Array.prototype.slice;

    var isArray  = require('Validator', 'isArray');

    /*
     * Common Constants
     */
    var kObject = 'object';

    /**
     * @function {static} o2.CollectionHelper.clear
     *
     * <p>Removes all the elements of the <code>Object</code>.</p>
     *
     * @param {Object} ar - the <code>Object</code> to clear.
     *
     * @return a <strong>reference</strong> to the object itself.
     */
    def(me,'clear', function(ar) {
        var key = null;

        if (!ar) {
            return null;
        }

        if (isArray(ar)) {
            ar.length = 0;

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
        if (typeof ar !== 'object') {
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
    me.indexOf = function(ar, elm) {
        if (!ar) {
            return -1;
        }

        // Array.prototype.indexOf
        if (ar.indexOf) {
            return ar.indexOf(elm);
        }

        var i = 0;
        var len = 0;

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

        if (typeof ar === kObject) {
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
    };

    /*
     *
     */
    var indexOf = require('CollectionHelper', 'indexOf');

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

    var contains = require('CollectionHelper', 'contains');

    /**
     * @function {static} o2.CollectionHelper.inArray
     *
     * <p>An <strong>alias</strong> to {@link o2.CollectionHelper.contains}
     *
     * @see o2.CollectionHelper.contains
     */
    alias(me, 'inArray', 'contains');

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

        var obj = collection || [];

        var iterator = delegate;

        // Array.prototype.reduce
        if (obj.reduce) {
            if (context) {
                iterator = bind(context, delegate);
            }

            return isSeeded ?
                obj.reduce(iterator, store) :
                obj.reduce(iterator);
        }

        var value = null;
        var key = null;
        var cache = store;
        var index = 0;
        var i = 0;
        var len = 0;

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

    alias(me, 'fold', 'reduce');

    /**
     * @function {static} o2.CollectionHelper.flatten
     *
     * <p>Shallow flattens an <code>Array</code>.</p>
     *
     * @param {Array} collection - an <code>Array</code> of <code>Array>
     */
    def(me, 'flatten', function(collection) {
        var store = [];
        var i = 0;
        var len = 0;
        var value = null;
        var key = null;

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
        var rest = slice.call(arguments, 1);

        var result = [];
        var value = null;
        var i = 0;
        var len = 0;
        var key = null;

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
     * @function {static} o2.CollectionHelper.difference
     *
     * <p>An <strong>alias</strong> to {@link o2.CollectionHelper.diff}.</p>
     *
     * @see o2.CollectionHelper.diff
     */
    alias(me, 'difference', 'diff');

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
     *
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
     *
     */
    alias(me, 'reject', 'exclude');

    /**
     *
     */
    def(me,'extend', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'find', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getFirst', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getFirstN', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getFunctions', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getKeys', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getLast', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getLastN', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getMax', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getMethods', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getMin', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getRest', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getSize', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getSortedIndex', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'getValues', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'grep', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'group', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'intersect', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'invoke', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'isEmpty', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'lastIndexOf', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'map', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'pluck', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'reduce', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'reduceRight', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'reject', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'removeElement', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'select', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'shuffle', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'sort', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
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
     *
     */
    def(me,'tap', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'toArray', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'touch', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'union', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'unique', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });

    /**
     *
     */
    def(me,'zip', function() {
        //TODO: implement me!
        throw 'IMPLEMENT ME!';
    });
}(this.o2, this));
