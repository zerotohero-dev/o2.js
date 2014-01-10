define(function (require, exports, module) {'use strict';

/*
 *  This program is distributed under the terms of the MIT license.
 *  Please see the LICENSE.md file for details.
 */

/**
 * @module o2.timer
 */

/**
 * @class o2.timer.core
 * @static
 */

var rConfig = require('./config'),

    config = {},

    misses = 0,
    hits = 0,

    key;


for (key in rConfig) {
    if (rConfig.hasOwnProperty(key)) {
        config[key] = rConfig[key];
    }
}

if (!window) {
    throw new Error('o2.timer should run in a browser.');
}

var tick = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function( delegate ) {
                    return window.setTimeout( delegate, 17 );
                },
    commandQueue = [];

/**
 *
 */
function noop() {}

/**
 *
 * @param item
 */
function parse(item) {
    if (item) {
        return typeof item === 'string' ? JSON.parse(item) : item;
    }

    return {};
}

/**
 *
 * @param item
 *
 * @returns {Object}
 */
function getMetaInfoFromQueueItem(item) {
    var parsed = parse(item);

    if (!parsed.delegate) {
        parsed.delegate = noop;
    }

    return parsed;
}

/**
 *
 * @param command
 *
 * @returns {boolean}
 */
function delegateCommand(command) {
    if (!command) {return false;}

    getMetaInfoFromQueueItem(command).delegate();

    return true;
}

/**
 *
 * @returns {*}
 */
function getNextCommand() {
    return commandQueue.shift();
}

/**
 *
 * @returns {*}
 */
function delegateNextCommand() {
    return delegateCommand(getNextCommand());
}

/**
 *
 */
function multiplex() {
    var i,
        len = Math.pow(2, misses);

    for(i = 0; i < len; i++) {
        if (!delegateNextCommand()) {break;}
    }
}

/**
 *
 */
function loop() {
    tick(loop);

    if (commandQueue.length > config.multiplexThreshold) {
        hits = 0;
        misses++;

        multiplex();

        return;
    }

    if (misses > 0) {
        hits++;

        if (hits >= config.batchSizeDecreaseThreshold) {
            misses--;
            hits = 0;
        }
    }

    delegateNextCommand();
}

/**
 * Initializes `o2.timer.core`.
 *
 * Call this method, before using other methods of `o2.timer.core`.
 *
 * @method initialize
 * @static
 * @final
 */
exports.initialize = function() {
    loop();

    exports.initialize = noop;
};

/**
 * Defers tasks to `requestAnimationFrame`.
 *
 * Use this instead of `window.setTimeout`.
 *
 * @method setTimeout
 * @static
 * @final
 *
 * @example
 *     var timer = require('amd/o2/timer/core');
 *
 *     var id = timer.setTimeout(function() {
 *         console.log('This will run at least after a second');
 *     }, 1000);
 *
 * @param {Function} delegate - the delegate to execute in the future.
 * @param {Number} timeout - timeout in milliseconds.
 *
 * @returns {Number} - a timeout id that we can use to clear the timeout.
 */
exports.setTimeout = function(delegate, timeout) {
    return setTimeout(function() {
        commandQueue.push({delegate: delegate});
    }, timeout || 0);
};

/**
 * Clears the timer scheduled with the given id.
 *
 * @method clearTimeout
 * @static
 * @final
 *
 * @example
 *     var timer = require('amd/o2/timer/core');
 *
 *     var id = timer.setTimeout(function() {
 *         console.log('This will run at least after a second');
 *     }, 1000);
 *
 *     ...
 *
 *     // Now the task won't run.
 *     timer.clearTimeout(id);
 *
 * @param {Number} id - the **id** of the timer.
 */
exports.clearTimeout = function(id) {
    clearTimeout(id);
};

});
