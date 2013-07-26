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
        isFunction = Validation.isFunction,
        isObject = Validation.isObject,


        /*
         * Array.prototype
         */
        slice = Array.prototype.slice;

    exports.forEach = function(obj, delegate) {
        var i,
            key,
            len;

        if (!obj) {return;}
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
    };

    exports.each = exports.forEach;

    exports.invoke = function(obj, delegate) {
        var kCount = 2,
            args,
            i,
            invoker,
            item,
            key,
            len;

        if (arguments.length < kCount) {return;}
        if (!obj) {return;}
        if (!isObject(obj)) {return;}

        args = slice.call(arguments, kCount);

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
    };

    return exports;
});
