define(function (require, exports, module) {'use strict';

/**
 * @module o2.ajax
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
