define([
], function(
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {};

    exports.all = function() {
        var i = 0,
            len = 0;

        for (i = 0, len = arguments.length; i < len; i++) {
            try {
                arguments[i]();
            } catch(ignore) {}
        }
    };

    exports.these = function() {
        var i = 0,
            len = 0;

        for (i = 0, len = arguments.length; i < len; i++) {
            try {
                arguments[i]();

                return;
            } catch(ignore) {}
        }
    };

    return exports;
});
