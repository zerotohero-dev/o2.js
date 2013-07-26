define([
    '../../method/core',
    '../../validation/core',
    './convert'
], function(
    Method,
    Validation,
    Convert
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * ../../validation/core
         */
        isObject = Validation.isObject,
        isArray = Validation.isArray,

        /*
         * ../../method/core
         */
        bind = Method.bind,

        /*
         * ./convert
         */
        toArray = Convert.toArray,

        /*
         * # To Be Overridden
         */

        map,
        reduce;

    exports.map = function(obj, delegate, context) {
        var results = [],
            i,
            key,
            len,
            value;

        if (!obj) {return results;}
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
    };

    /*
     *
     */
    map = exports.map;

    exports.reduce = function(obj, delegate, store, context) {
        var cache = store,
            isSeeded = arguments.length > 2,
            iterator = delegate,
            i,
            index,
            key,
            len,
            value;

        if (!obj) {return null;}
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
            throw 'reduce: empty collection with no seed';
        }

        return cache;
    };

    /*
     *
     */
    reduce = exports.reduce;

    exports.fold = exports.reduce;

    exports.reduceRight = function(obj, delegate, store, context) {
        var isSeeded = arguments.length > 2,
            iterator = delegate,
            reversed;

        if (!obj) {return null;}
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
    };

    exports.foldR = exports.reduceRight;

    return exports;
});
