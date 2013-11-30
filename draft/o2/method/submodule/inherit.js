define([
], function(
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
         * string.core
         */
        format = require('String', 'format'),

        /*
         * # Common Constants
         */

        kEmpty                 = '',
        kArgumentCountMismatch = ['Method: Argument count mismatch. ',
            'Expecting: {0}, provided: {1}'].join(kEmpty),
        kFunction              = 'function';

    exports.overload = function(object, name, fn) {
        var old = object[name];

        object[name] = function() {

            // If both functions have identical # of arguments,
            // then call the cached function.
            if (fn.length === arguments.length) {
                return fn.apply(this, arguments);
            }

            // Otherwise try to call the old function, if any.
            if (typeof old === kFunction) {
                return old.apply(this, arguments);
            }
        };
    };

    exports.requireAllArguments = function(fn) {
        return function() {

            // throw an error if the arguments' length do not match.
            if (arguments.length < fn.length) {
                throw format(kArgumentCountMismatch, fn.length,
                    arguments.length);
            }

            return fn.apply(this, arguments);
        };
    };
});
