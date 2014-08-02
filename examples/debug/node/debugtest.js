'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var debug = require('o2.debug/core');

debug.initialize('./test.log');

var data = '...................................................';

for (var i = 0, l = 22; i < l; i++) {
    data += data;
}

var start = Date.now();

console.log('1: ' + Date.now());
debug.log(data);
console.log('2:' + Date.now());

console.log('wrote %d bytes in %dms', data.length, Date.now() - start);

process.on('exit', function() {
    console.log('exited');
    console.log('Total processing time: ' + (Date.now() - start) + 'ms.');
});
