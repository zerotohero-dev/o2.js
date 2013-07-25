require([
], function() {
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
        slice  = Array.prototype.slice;

    //TODO: pass an optional context parameter.
    exports.compose = function(invoker, delegate) {
        return function() {
            return invoker.apply(this, [delegate.apply(this, arguments)]);
        };
    };

    exports.flip = function(fn, index1, index2) {
        return function() {
            var args = slice.call(arguments),
                temporary = args[index1];

            args[index1] = args[index2];
            args[index2] = temporary;

            return fn.apply(this, args);
        };
    };

    //TODO: pass an optional context parameter.
    exports.wrap = function(delegate, wrapper) {
        return function() {
            return wrapper.apply(this,
                [delegate].concat(slice.call(arguments)));
        };
    };

    return exports;
});
