define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var isFunction = require('../node_modules/o2.validation/core').isFunction,
    identity = require('../node_modules/o2.functional/core').identity,

    handle = require('./privates/core').handle;

/**
 * @constructor
 *
 * @param deferred
 * @param onFulfilled
 * @param onRejected
 */
function Future(deferred, onFulfilled, onRejected) {
    this.deferred = deferred;
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
}

/**
 * @param value
 */
Future.prototype.resolve = function(value) {
    handle(
        this.deferred,
        isFunction(this.onFulfilled) ? this.onFulfilled : identity,
        value
    );
};

/**
 * @param reason
 */
Future.prototype.reject = function(reason) {
    handle(
        this.deferred,
        isFunction(this.onRejected) ? this.onRejected : identity,
        reason
    );
};

module.exports = Future;

});
