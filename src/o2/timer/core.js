require([
], function(
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * Aliases
         */

        /*
         * string.core
         */
        concat = require('String', 'concat'),

        /*
         * # Common Constants
         */

        kPrefix = 't',

        /*
         * # Static State
         */

        timers = {},

        /*
         * # To Be Overridden
         */

        start,
        stop;

    exports.start = function(id) {
        var timerId = concat(kPrefix, id),
            meta = timers[timerId];

        if (!meta) {return;}

        if (meta.shouldRepeat) {
            clearInterval(meta.id);

            meta.id = setInterval(meta.delegate, meta.timeout);

            return;
        }

        clearTimeout(meta.id);

        meta.id = setTimeout(meta.delegate, meta.timeout);
    };

    /*
     *
     */
    start = exports.start;

    exports.stop = function(id) {
        var timerId = concat(kPrefix, id),
            meta = timers[timerId];

        if (!meta) {return;}

        if (meta.shouldRepeat) {
            clearInterval(meta.id);

            return;
        }

        clearTimeout(meta.id);
    };

    /*
     *
     */
    stop = exports.stop;

    exports.set = function(id, delegate, timeout, options) {
        var timerId = concat(kPrefix, id);

        if (timers[timerId]) {
            stop(timerId);

            delete timers[timerId];
        }

        options = options || {};

        if (options.start === undefined) {
            options.start = true;
        }

        options.repeat = !!options.repeat;
        options.start = !!options.start;

        timers[timerId] = {
            delegate : delegate,
            timeout : timeout,
            id : null,
            shouldRepeat : options.repeat
        };

        if (options.start) {
            start(id);
        }
    };
});
