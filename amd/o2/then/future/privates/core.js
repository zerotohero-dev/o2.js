define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var functional = require('../../../functional/core'),

    kCircularResolution = 'Cannot resolve a promise with itself',

    next;

if (!functional) {
    throw new Error('Please run `npm install o2.functional` first.');
}

next = functional.next;


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
