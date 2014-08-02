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

    methodNames = ['log', 'warn', 'info'],

    isEnabled = true,

    stream;

function noop() {}

function print(label, args) {
    var buffer = [],
        i, len;

    for (i = 0, len = args.length; i < len; i++) {
        buffer.push(args[i]);
    }

    stream.write(label + ': ' + buffer.join(',') + '\n');
}

function doPrint(name, args) {print('[' + name + ']', args);}

function doLog(name, args) {console[name].apply(console, args);}

function exec(method, name, args) {
    if (!isEnabled) {return;}

    method(name, args);
}

exports.enable = function() {isEnabled = true;};

exports.disable = function() {isEnabled = false;};

exports.initialize = function(file) {

    // To trick grunt-contrib-jasmine.
    var fs = require(kFs);

    if (typeof file === 'string') {
        stream = fs.createWriteStream(
            file, {flags: 'a+', encoding: 'utf8'}
        );

        return;
    }

    stream = file;
};

methodNames.forEach(function(name) {
    exports[name] = isNode ?
    function() {exec(doPrint, name, arguments);} : (
        isConsoleAvailable ?
        function() {exec(doLog, name, arguments);} :
        noop
    );
});
