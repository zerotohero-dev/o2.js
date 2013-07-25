require([
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
        ap     = Array.prototype,
        concat = ap.concat,
        slice  = ap.slice,

        /*
         * Function.prototype
         */
        bind   = Function.prototype.bind;

    if (bind) {
        exports.bind = function() {
            var args = slice.call(arguments),
                context = args.shift(),
                fn = args.shift();

            return fn.bind(context, args);
        };
    } else {
        exports.bind = function() {
            var args = slice.call(arguments),
                context = args.shift(),
                 fn = args.shift();

            return function() {
                return fn.apply(
                    context, concat.call(args, slice.call(arguments))
                );
            };
        };
    }

    exports.curry = function() {
        var args = slice.call(arguments),
            context = args.shift(),
            fn = args.shift();

        return function() {
            return fn.apply(context,
                args.concat(
                    slice.call(arguments)
                )
            );
        };
    };

    exports.identity = function(value) {
        return value;
    };

    exports.memoize = function() {
        var pad = {},
            args = slice.call(arguments),
            self = args.shift(),
            obj = args.length > 0 ? args[0] : null,

            memoizedFn = function() {

                // Copy the arguments object into an array:
                // this allows it to be used as a cache key.
                var args = [],
                    i = 0;

                for (i = 0; i < arguments.length; i++) {
                    args[i] = arguments[i];
                }

                // Evaluate the memoized function if it hasn't
                // been evaluated with these arguments before.
                if (!pad.hasOwnProperty(args)) {
                    pad[args] = self.apply(obj, arguments);
                }

                return pad[args];
            };

        return memoizedFn;
    };

    exports.partial = function() {
        var args = slice.call(arguments),
            context = args.shift(),
            fn = args.shift();

        return function() {
            var arg = 0,
                i = 0;

            for (i = 0; i < args.length && arg < arguments.length; i++) {
                if (args[i] === undefined) {
                    args[i] = arguments[arg++];
                }
            }

            return fn.apply(context, args);
        };
    };
});

