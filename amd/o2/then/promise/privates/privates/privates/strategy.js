define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var state = require('../../../../deferred/state/core'),
    resolutionStrategy = {};

resolutionStrategy[state.PENDING] = function(future, outcome) {
    void future;
    void outcome;
};

resolutionStrategy[state.FULFILLED] = function(future, outcome) {
    future.resolve(outcome);
};

resolutionStrategy[state.REJECTED] = function(future, outcome) {
    future.reject(outcome);
};

exports.resolution = resolutionStrategy;

});
