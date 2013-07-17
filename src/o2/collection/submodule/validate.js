require([
], function(
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {};

    exports.some = function(obj, delegate, context) {
        var iterator = delegate || identity,
            result = false,
            i,
            index,
            key,
            len;

        if (!obj) {return result;}

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
    };

    exports.any = exports.some;

    exports.isEmpty = function (obj) {
         var key;

         if (!obj) {return true;}
         if (!isObject(obj)) {return true;}

         for (key in obj) {
             if (obj.hasOwnProperty(key)) {
                 return false;
             }
         }

         return true;
    };

    /*
     *
     */
    isEmpty = exports.isEmpty;

    exports.every = function(obj, delegate, context) {
        var counter,
            i,
            key,
            len,
            result;

        if (!obj) {return true;}
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
    };

    exports.contains = function(ar, elm) {
        if (!ar) {return -1;}
        if (!isObject(ar)) {return -1;}

        return indexOf(ar, elm) > -1;
    };

    /*
     *
     */
    contains = exports.contains;

    exports.includes = exports.contains;

    exports.inArray = exports.contains;

    return exports;
});
