'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

/**
 * @module o2.validate
 */

/**
 * @class o2.validate.core
 * @static
 */

var kArrayTypeString = '[object Array]',
    kFunctionTypeString = '[object Function]';

/**
 * Checks whether the object is an [Array][array].
 *
 * [array]: http://mzl.la/19mDwAW
 *
 * @method isArray
 * @static
 * @final
 *
 * @param {*} obj
 *
 * @returns {boolean} - `true` if **obj** is an [Array][array];
 * `false` otherwise.
 */
exports.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === kArrayTypeString;
};

/**
 * Checks whether the object is an [Function][function].
 *
 * [function]: http://mzl.la/1gJspj2
 *
 * @method isFunction
 * @static
 * @final
 *
 * @param {*} obj
 *
 * @returns {boolean} - `true` if **obj** is a [Function][function];
 * `false` otherwise.
 */
exports.isFunction = function(obj) {
    return Object.prototype.toString.call(obj) === kFunctionTypeString;
};

/**
 * Checks whether the object is [Promise][spec]-like.
 *
 * This is a quick and dirty check. The method returning `true` does not
 * necessarily mean that the object will satisfy the [Promise Contract][spec].
 *
 * [spec]: https://github.com/promises-aplus/promises-spec
 *
 * @param obj
 *
 * @return {boolean} - `true` if the object is [Promise][spec]-like; `false`
 * otherwise.
 */
exports.isPromise = function(obj) {
    return obj && obj.then && exports.isFunction(obj.then);
};
