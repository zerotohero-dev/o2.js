define([
    '../../validation/core'
], function(
    Validation
) {
    'use strict';

    // TODO: create an AMDLint project to sanitize o2.js AMD modules
    // 1. constructor fn must always return
    // 2. argument count should match.
    // 3. modules should actually exists in the filesystem.

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
        isArray = Validation.isArray;

    exports.grep = function(obj, delegate) {
        var result = [],
            i,
            item,
            key,
            len;

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
    };

    exports.select = exports.grep;

    exports.filter = exports.grep;

    return exports;
});
