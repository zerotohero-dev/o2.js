define(function (require, exports, module) {'use strict';

var isFunction = require('../../validation/core').isFunction,
    identity = require('../../functional/core').identity;

function handle() {}

/**
 * @method Future
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
 * @method resolve
 * @final
 *
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
 * @method reject
 * @final
 *
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
