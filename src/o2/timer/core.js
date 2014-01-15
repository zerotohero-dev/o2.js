'use strict';

/*
 *  This program is distributed under the terms of the MIT license.
 *  Please see the LICENSE.md file for details.
 */

/**
 * @module o2.timer
 * @require o2.object
 */

/**
 * @class o2.timer.core
 * @static
 */

var rConfig = require('./config'),

    o = require('./node_modules/o2.object/core'),
    clone = o.clone,
    extend = o.extend,

    config,

    misses = 0,
    hits = 0;


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
        if (typeof item === 'string') {
            return JSON.parse(item);
        } else {
            return item;
        }
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
    var len = Math.pow(2, misses),
        i;

    for(i = 0; i < len; i++) {
        if (!delegateNextCommand()) {break;}
    }
}

/**
 *
 * @returns {boolean}
 */
function executeMultiplex() {
    if (commandQueue.length > config.multiplexThreshold) {
        hits = 0;
        misses++;

        multiplex();

        return true;
    }

    return false;
}

/**
 *
 */
function adjustHitCount() {
    if (misses <= 0) {return;}

    hits++;

    if (hits >= config.batchSizeDecreaseThreshold) {
        misses--;
        hits = 0;
    }
}

/**
 * The main event loop.
 */
function loop() {
    tick(loop);

    var didProcessQueue = executeMultiplex();

    if (didProcessQueue) {return;}

    adjustHitCount();

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
 *
 * @param {Object} newConfig - configuration to override.
 */
exports.initialize = function(newConfig) {
    config = clone(rConfig);

    extend(config, newConfig);

    loop();

    exports.initialize = noop;
};

// TODO: add usage examples to all public methods
// TODO: remove sample 'sayhello' methods.

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
