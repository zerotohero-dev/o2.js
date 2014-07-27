define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var kArrayTypeString = '[object Array]',
    kFunctionTypeString = '[object Function]';

exports.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === kArrayTypeString;
};

exports.isFunction = function(obj) {
    return Object.prototype.toString.call(obj) === kFunctionTypeString;
};

exports.isPromise = function(obj) {
    return obj && obj.then && exports.isFunction(obj.then);
};

});
