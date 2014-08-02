'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var debug = require('o2.debug');

debug.initialize('./test.log');

debug.log('Hello world');

var i, len;

for (i = 0, len = 450; i < len; i++) {
    debug.log('Hello stars ' + i);
}
