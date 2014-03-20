define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var state = require('../state/core'),

    isPromise = require('../../node_modules/o2.validation/core').isPromise,

    privates = require('./privates/core'),
    resolveFutures = privates.resolveFutures,
    rejectFutures = privates.rejectFutures;

/**
 * @param deferred
 * @param reason
 */
exports.reject = function(deferred, reason) {
    deferred.state = state.REJECTED;
    deferred.outcome = reason;

    rejectFutures(deferred, reason);
};

/**
 * @param deferred
 * @param value
 */
exports.resolve = function(deferred, value) {
    deferred.state = state.FULFILLED;
    deferred.outcome = value;

    resolveFutures(deferred, value);
};

/**
 * @param deferred
 * @param promise
 */
exports.chain = function(deferred, promise) {
    var processed = false,
        resolve = exports.resolve,
        reject = exports.reject,
        chain = exports.chain;

    try {
        promise.then(
            function(value) {
                if (processed) {return;}

                processed = true;

                if (isPromise(value)) {
                    chain(deferred, value);

                    return;
                }

                resolve(deferred, value);
            },
            function(reason) {
                if (processed) {return;}

                processed = true;

                reject(deferred, reason);
            }
        );
    } catch (exception) {
        (function() {
            processed = true;

            reject(deferred, exception);
        }());
    }
};

});
