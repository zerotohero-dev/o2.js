'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

exports.resolveFutures = function(deferred, value) {
    var futures = deferred.futures,
        i, len;

    for (i = 0, len = futures.length; i < len; i++) {
        futures[i].resolve(value);
    }

    deferred.futures = null;
};

exports.rejectFutures = function(deferred, reason) {
    var futures = deferred.futures,
        i, len;

    for(i = 0, len = futures.length; i < len; i++) {
        futures[i].reject(reason);
    }

    deferred.futures = null;
};
