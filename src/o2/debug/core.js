'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var isConsoleAvailable = (typeof console !== 'undefined');

if (isConsoleAvailable) {
    exports.log = function() {
        console.log.apply(console, arguments);
    };

    exports.warn = function() {
        console.warn.apply(console, arguments);
    };
} else {
    exports.log = function() {};
    exports.warn = function() {};
}
