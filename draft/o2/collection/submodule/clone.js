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
        isObject = Validation.isObject;


    exports.copy = function(ar) {
        if (!ar) {return [];}
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
    };

    exports.clone = exports.copy;

    return exports;
});


