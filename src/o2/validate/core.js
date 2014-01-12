'use strict';

/**
 * @module o2.validate
 */

/**
 * @class o2.validate.core
 * @static
 */

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
 *
 * [array]: http://mzl.la/19mDwAW
 */
exports.isArray = function(obj) {
    return Object.prototye.toString.call(obj) === kArrayTypeString;
}
