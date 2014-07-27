define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var stringCore = require('../string/core');

if (!stringCore) {
    throw new Error('Please run `npm install o2.string` first.');
}

exports.sayHi = function() {
    return stringCore.sayHi();
};

});
