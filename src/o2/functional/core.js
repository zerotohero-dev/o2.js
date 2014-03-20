'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

/**
 * @module o2.functional
 */

/**
 * @class o2.functional.core
 */

/**
 * Does nothing.
 *
 * @method noop
 * @static
 * @final
 */
exports.noop = function() {};

/**
 * An identity method.
 * Returns the original argument, without changing it.
 *
 * @method identity
 *
 * @param x
 *
 * @returns {*} - the passed argument **x**.
 */
exports.identity = function(x) {return x;};
