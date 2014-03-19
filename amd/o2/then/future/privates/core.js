define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var next = require('../../node_modules/o2.functional/core').next,

    kCircularResolution = 'Cannot resolve a promise with itself';

/**
 * @param deferred
 * @param handler
 * @param value
 */
exports.handle = function(deferred, handler, value) {
    next(function() {
        var returnValue;

        try {
            returnValue = handler(value);
        } catch (e) {
            deferred.reject(e);

            return;
        }

        if (returnValue === deferred.promise) {
            deferred.reject(
                new TypeError(kCircularResolution)
            );
        } else {
            deferred.resolve(returnValue);
        }
    });
};

});
