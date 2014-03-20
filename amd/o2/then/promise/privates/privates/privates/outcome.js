define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

/**
 * @param promise
 * @returns {*}
 */
exports.get = function(promise) {
    return promise.deferred.outcome;
};

});
