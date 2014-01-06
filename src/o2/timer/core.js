'use strict';

/*
 *  This program is distributed under the terms of the MIT license.
 *  Please see the LICENSE.md file for details.
 */

var log = require('./node_modules/o2.debug/core').log;

var kTooManyCommandsInLine = 50;

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
 */
function loop() {
    tick(loop);

    if ( commandQueue.length > kTooManyCommandsInLine ) {
        log( 'There are "' + commandQueue.length + '" waiting commands in' +
            ' the pipe. This might be a performance issue!' );
    }

    var meta = getMetaInfoFromQueueItem(commandQueue.shift());

    if ( meta && meta.delegate ) {
        meta.delegate();
    }
}

/**
 *
 */
exports.initialize = function() {
    loop();

    if (!commandQueue.length) {return;}

    commandQueue.shift()();
};

/**
 * Defers tasks to `requestAnimationFrame`. Use this instead of
 * `window.setTimeout`.
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
