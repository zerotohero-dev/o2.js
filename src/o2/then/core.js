'use strict';

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
 * @class o2.then.core
 * @static
 */

var Deferred = require('./deferred/core');

/**
 * Returns a `Deferred` **d**.
 *
 * * `d.resolve(value)` resolves the deferred,
 * * `d.reject(reason)` rejects the deferred.
 * * `d.promise` is a "thenable"  Promises/A+ compliant promise interface.
 *
 * @method defer
 * @static
 * @final
 *
 * @returns {Deferred}
 */
exports.defer = function() {
    return new Deferred();
};
