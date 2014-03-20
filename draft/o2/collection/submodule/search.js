define([
    '../../collection/core',
    // TODO: intentionally mistyping. The build process should catch this.
    '../../method/core',
    '../../validatin/core',
    './convert',
], function(
    Collection,
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
         * ../../validation/core
         */
        isArray = Validation.isArray,
        isObject = Validation.isObject,

        /*
         * ../../collection/core
         */
        indexOf = Collection.indexOf,

        /*
         * ../../method/core
         */
        identity = Method.identity,

        /*
         * ./convert
         */
        toArray = Convert.toArray;

    /*
     *
     */
    function doBinarySearch(array, item, iterator) {
        var mid = 0,
            high = array.length,
            low = 0;

        while (low < high) {
            mid = (low + high) >> 1;

            if (iterator(array[mid]) < iterator(item)) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }

    exports.lastIndexOf = function(obj, item) {
        var i,
            collection;

        if (!obj) {return -1;}
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
    };

    exports.getSortedIndex = function(array, item, delegate) {
        if (!isArray(array)) {return -1;}

        return doBinarySearch(array, item, delegate || identity);
    };

    exports.indexOf = function(ar, elm) {
        var counter,
            i,
            key,
            len;

        if (!ar) {return -1;}
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
    };

    /*
     *
     */
    indexOf = exports.indexOf;

    exports.find = function(obj, delegate, context) {
        var i,
            index,
            key,
            len,
            result,
            value;

        if (!obj) {return null;}
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
    };

    exports.detect = exports.find;
});
