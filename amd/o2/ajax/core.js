define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

/**
 *  An **XMLHttpRequest** helper module.
 *
 * @module o2.ajax
 * @requires o2.string
 */

var stringCore = require('./node_modules/o2.string/core');

/**
 * @class o2.ajax.core
 * @uses o2.string.core
 */

/**
 * Returns a welcome `String`.
 *
 * Usage example:
 *
 * @example
 *     var ajaxUtil = require('ajax/core');
 *
 *     // `greeting` will be a welcome text of type `String`.
 *     var greeting = ajaxUtil.sayHi();
 *
 * @method sayHi
 * @static
 *
 * @returns {String} The welcome `String`.
 */
exports.sayHi = function() {
    return stringCore.sayHi();
};

});
