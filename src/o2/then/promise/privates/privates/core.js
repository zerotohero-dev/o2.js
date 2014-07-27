'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var resolution = require('./privates/strategy').resolution,

    getOutcome = require('./privates/outcome').get;

exports.getState = function(promise) {
    return promise.deferred.state;
};

exports.enqueue = function(promise, future) {
    promise.deferred.futures.push(future);
};

exports.handleNext = function(promise, future) {
    var currentState = exports.getState(promise),
        currentOutcome = getOutcome(promise),
        resolve = resolution[currentState];

    if (!resolve) {return;}

    resolve(future, currentOutcome);
};
