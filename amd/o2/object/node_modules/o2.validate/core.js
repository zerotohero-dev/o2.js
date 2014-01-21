define(function (require, exports, module) {'use strict';

/**
 * @module o2.validate
 */

/**
 * @class o2.validate.core
 * @static
 */

var kArrayTypeString = '[object Array]';

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
    return Object.prototype.toString.call(obj) === kArrayTypeString;
};

});
