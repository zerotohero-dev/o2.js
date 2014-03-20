define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var Promise = require('../promise/core'),

    state = require('./state/core'),

    isPromise = require('../node_modules/o2.validation/core').isPromise,
    noop = require('../node_modules/o2.functional/core').noop,

    privates = require('./privates/core'),
    reject = privates.reject,
    resolve = privates.resolve,
    chain = privates.chain;

/**
 * @method Deferred
 * @constructor
 */
function Deferred() {
    this.state = state.PENDING;
    this.outcome = null;
    this.futures = [];
    this.promise = new Promise(this, Deferred);
}

/**
 * @method resolve
 * @final
 *
 * @param value
 */
Deferred.prototype.resolve = function(value) {
    if (isPromise(value)) {
        chain(this, value);

        return;
    }

    resolve(this, value);

    this.resolve = noop;
};

/**
 * @method reject
 * @static
 * @final
 *
 * @param reason
 */
Deferred.prototype.reject = function(reason) {
    this.state = state.REJECTED;
    this.outcome = reason;

    reject(this, reason);

    this.reject = noop;
};

module.exports = Deferred;

});
