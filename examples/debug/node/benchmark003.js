'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var fs = require('fs'),

    stream;

function initialize(file) {
    if (typeof file === 'string') {
        stream = fs.createWriteStream(
            file, {flags: 'a+', encoding: 'utf8'}
        );

        return;
    }

    stream = file;
}

initialize('out.log');

function log(stuff) {
    stream.write(stuff + '\n');
}

var data = '...................................................';

for (var i = 0, l = 22; i < l; i++) {
    data += data;
}

var start = Date.now();

log(data);
log(data);
log(data);
log(data);
log(data);
log(data);
log(data);
log(data);
log(data);

console.log('wrote %d bytes in %dms', data.length, Date.now() - start);

process.on('exit', function() {
    console.log('exited');
    console.log('Total processing time: ' + (Date.now() - start) + 'ms.');
});


