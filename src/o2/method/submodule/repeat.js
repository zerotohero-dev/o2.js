require([
], function(
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {};

    exports.after = function(count, delegate) {
        if (count <= 0) {return;}

        return function() {
            count--;

            var context = this,
                args = arguments;

            if (count < 1) {
                return delegate.apply(context, args);
            }
        };
    };

    exports.once = function(delegate) {
        var did = false,
            cache = null;

        return function() {
            var context = this,
                args = arguments;

            if (did) {return cache;}

            did   = true;
            cache = delegate.apply(context, args);

            return cache;
        };
    };

    exports.times = function(count, delegate, context, payload) {
        var i = 0;

        for (i = 0; i < count; i++) {
            delegate.apply(context, [i, payload]);
        }
    };
});
