define(function (require, exports, module) {'use strict';

/*
 *  This program is distributed under the terms of the MIT license.
 *  Please see the LICENSE.md file for details.
 */

/**
 * @module o2.debug
 */

/**
 * @class o2.debug.core
 * @static
 */

var isConsoleAvailable = (typeof console !== 'undefined');

if (isConsoleAvailable) {

    /**
     * Logs the arguments to the console.
     *
     * @method log
     * @static
     * @final
     */
    exports.log = function() {
        console.log.apply(console, arguments);
    };

    /**
     * Displays a warning message on the console.
     *
     * @method warn
     * @static
     * @final
     */
    exports.warn = function() {
        console.warn.apply(console, arguments);
    };
} else {
    exports.log = function() {};
    exports.warn = function() {};
}

});
