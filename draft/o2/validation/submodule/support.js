define([
    '../../core',
], function(
    o2
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Module Definition
         */

        /*
         * # Aliases
         */

        /*
         * core
         */
        myName = o2.name,

        /*
         * # Feature Detection
         */

        /*
         * `true` if there's an adequate level of
         * `DOM` support.
         */
        isDomSupported = document.getElementById &&
            document.createElement && document.getElementsByTagName,

        /*
         * # Common Constants
         */

        kEmpty = '',
        kTestCookiePrefix = 'tst';

    exports.ajax = function() {
        var Ajax = require('../../ajax/core');

        return !!(Ajax.createXhr());
    };

    exports.cookie = function() {
        var Cookie = require('../../cookie/core'),
            testCookieName = [myName, kTestCookiePrefix].join(kEmpty),
            value = null,
            save = Cookie.save,
            read = Cookie.read,
            remove = Cookie.remove;

        save(testCookieName, testCookieName, 1);

        try {
            value = read(testCookieName);
        } catch(ignore) {}

        if (value) {
            remove(testCookieName);

            return true;
        }

        return false;
    };

    exports.dom = function() {
        return isDomSupported;
    };
});
