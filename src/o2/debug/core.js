'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var isNode = (typeof module !== 'undefined' && !!module.exports),
    isConsoleAvailable = (typeof console !== 'undefined'),

    kFs = 'fs',

    stream;

function print(label, args) {
    var buffer = [],
        i, len;

    for (i = 0, len = args.length; i < len; i++) {
        buffer.push(args[i]);
    }

    stream.write(label + ': ' + buffer.join(','));
}

if (isNode) {
    exports.initialize = function(file) {

        // To trick grunt-contrib-jasmine.
        var fs = require(kFs);

        if (typeof file === 'string') {
            stream = fs.createFileStream(
                file, {flags: 'a+', encoding: 'utf8'}
            );

            return;
        }

        stream = file;
    };

    exports.log = function() {
        if (!stream) {
            throw new Error(
                'o2.debug: Please call `o2.debug.initialize` first.'
            );
        }

        print('[LOG ]', arguments);
    };

    exports.warn = function() {
        if (!stream) {
            throw new Error(
                'o2.debug: Please call `o2.debug.initialize` first.'
            );
        }

        print('[WARN]', arguments);
    };
} else {
    if (isConsoleAvailable) {
        exports.log = function() {
            console.log.apply(console, arguments);
        };

        exports.warn = function() {
            console.warn.apply(console, arguments);
        };
    } else {
        exports.log = function() {};
        exports.warn = function() {};
    }
}
