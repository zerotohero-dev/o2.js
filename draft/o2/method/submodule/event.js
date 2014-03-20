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
         * Array.prototype
         */
        slice = Array.prototype.slice;

    exports.bindAsEventListener = function() {
        var args = slice.call(arguments),
            context = args.shift(),
            fn = args.shift();

        return function(e) {
            args.unshift(e);

            return fn.apply(context, args);
        };
    };

    return exports;
});
