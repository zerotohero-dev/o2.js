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
        isArguments = Validation.isArguments,

        /*
         * Array.prototoype
         */
        slice = Array.prototype.slice,

        /*
         * # To Be Overridden
         */

        toArray;

    exports.toArray = function(obj) {
        var result = [],
            key;

        if (!obj) {return result;}
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
    };

    /*
     *
     */
    toArray = exports.toArray;

    return exports;
});
