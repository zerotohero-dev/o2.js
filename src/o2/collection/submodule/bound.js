define([
    '../../validation/core'
], function(
    Validation
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
        isArray = Validation.isArray,
        isEmpty = Validation.isEmpty,
        isObject = Validation.isObject,

        /*
         * Math
         */
        max = Math.max,
        min = Math.min,

        /*
         * # To Be Overridden
         */

        getMax;

    exports.getSize = function(obj) {
        var counter = 0,
            key;

        if (!obj) {return counter;}
        if (!isObject(obj)) {return counter;}
        if (obj.length !== undefined) {return obj.length;}

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                counter++;
            }
        }

        return counter;
    };

    exports.getCount = exports.getSize;

    exports.getLength = exports.getSize;

    exports.getMax = function(obj, delegate, context) {
        var index = 0,
            result = -Infinity,
            calculated,
            key,
            store;

        if (!obj) {return result;}
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
    };

    /*
     *
     */
    getMax = exports.getMax;

    exports.getMin = function(obj, delegate, context) {
        var index = 0,
            result = Infinity,
            calculated,
            key,
            store;

        if (!obj) {return result;}
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
    };

    return exports;
});

