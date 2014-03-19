define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

/**
 * @module o2.then
 */

/**
 * @class o2.then.Promise
 */

var privates = require('./privates/core'),
    isPending = privates.isPending,
    enqueue = privates.enqueue,
    handleNext = privates.handleNext;

/**
 * @method Promise
 * @constructor
 */
function Promise() {
}

/**
 * @method then
 * @final
 *
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
