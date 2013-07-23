require([
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

        /*
         * # Static State
         */

        cache = {};

    exports.publish = function(name, argv) {
        if (!name) {return;}

        var delegates = cache[name],
            args = argv || [],
            i,
            len;

        if (!delegates) {return;}
        if (!isArray(args)) {args = [args];}

        for (i = 0, len = delegates.length; i < len; i++) {
            try {
                delegates[i].apply(null, args);
            } catch (ignore) {}
        }
    };

    exports.subscribe = function(name, callback) {
        if (!name) {return;}

        if (!cache[name]) {
            cache[name] = [];
        }

        cache[name].push(callback);

        var handle = {
            name: name,
            callback: callback
        };

        return handle;
    };

    exports.unsubscribe = function(handle) {
        var name = handle.name,
            callback = handle.callback,
            delegates = cache[name],
            i,
            len,
            delegate;

        if (!delegates) {return;}

        for (i = 0, len = delegates.length; i < len; i++) {
            delegate = delegates[i];

            if (delegate === callback) {
                delegates.splice(i, 1);
                len = delegates.length;
                i--;
            }
        }
    };

    return exports;
});
