define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var privates = require('./privates/core'),
    isPending = privates.isPending,
    enqueue = privates.enqueue,
    handleNext = privates.handleNext;

/**
 * @constructor
 *
 * @param ownerDeferred
 * @param DeferredConstructor
 */
function Promise(ownerDeferred, DeferredConstructor) {
    this.deferred = ownerDeferred;
    this.Deferred = DeferredConstructor;
}

/**
 * @param {Function} [onFulfilled]
 * @param {Function} [onRejected]
 *
 * @returns {Promise}
 */
Promise.prototype.then = function(onFulfilled, onRejected) {
    if (isPending(this)) {
        return enqueue(this, onFulfilled, onRejected);
    }

    return handleNext(this, onFulfilled, onRejected);
};

module.exports = Promise;

});
