'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var fs = require('fs');

function log(stuff) {
    fs.appendFile(
        'out.log',
        stuff + '\n',
        {flags: 'a+', encoding: 'utf8'},
        function(err) {
            if (!err) {return;}

            setTimeout(function() {
                console.log(err);
            });
        }
    );
}

var i, len;

log('Hello world.');

for (i = 0, len = 250; i < len; i++) {
    log('Hello ' + i);
}

process.on('exit', function() {
    console.log('All done!');
});

process.on('error', function() {
    console.log('errored');
});
