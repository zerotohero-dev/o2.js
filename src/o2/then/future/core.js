'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var validation = require('../../validation/core'),
    functional = require('../../functional/core'),

    handle = require('./privates/core').handle,

    isFunction, identity;

if (!validation) {
    throw new Error('Please run `npm install o2.validation` first.');
}

if (!functional) {
    throw new Error('Please run `npm install o2.functional` first.');
}

isFunction = validation.isFunction;
identity = functional.identity;

function Future(deferred, onFulfilled, onRejected) {
    this.deferred = deferred;
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
}

Future.prototype.resolve = function(value) {
    handle(
        this.deferred,
        isFunction(this.onFulfilled) ? this.onFulfilled : identity,
        value
    );
};

Future.prototype.reject = function(reason) {
    handle(
        this.deferred,
        isFunction(this.onRejected) ? this.onRejected : identity,
        reason
    );
};

module.exports = Future;
