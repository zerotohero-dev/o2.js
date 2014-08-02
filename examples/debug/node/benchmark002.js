'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var winston = require('winston'),

    transports = [],
    handlers = [];

transports.push(new winston.transports.File(
    {filename: 'aggr.log'}
));
handlers.push(new winston.transports.File(
    {filename: 'exception.log'}
));

var logger = new (winston.Logger)({
    transports: transports,
    exceptionHandlers: handlers
});

var data = '...................................................';

for (var i = 0, l = 22; i < l; i++) {
    data += data;
}

var start = Date.now();

logger.log('info', data);

console.log('wrote %d bytes in %dms', data.length, Date.now() - start);

process.on('exit', function() {
    console.log('exited');
    console.log('Total processing time: ' + (Date.now() - start) + 'ms.');
});


