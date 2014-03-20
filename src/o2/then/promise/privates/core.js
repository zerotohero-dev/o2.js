'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var Future = require('../../future/core'),

    state = require('../../deferred/state/core'),

    privates = require('./privates/core'),
    getState = privates.getState,
    enqueue = privates.queue,
    handleNext = privates.handleNext;

/**
 * @param promise
 */
exports.isPending = function(promise) {
    return getState(promise) === state.PENDING;
};

/**
 * @param promise
 * @param onFulfilled
 * @param onRejected
 */
exports.enqueue = function(promise, onFulfilled, onRejected) {
    var newDeferred = new promise.Deferred();

    enqueue(promise, new Future(newDeferred, onFulfilled, onRejected));

    return newDeferred.promise;
};

/**
 * @param promise
 * @param onFulfilled
 * @param onRejected
 */
exports.handleNext = function(promise, onFulfilled, onRejected) {
    var newDeferred = new promise.Deferred();

    handleNext(promise, new Future(newDeferred, onFulfilled, onRejected));

    return newDeferred.promise;
};
