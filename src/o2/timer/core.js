'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var rConfig = require('./config'),

    o = require('../object/core'),

    clone, extend, tick, commandQueue,

    config,

    misses = 0,
    hits = 0;

if (!o) {
    throw new Error('Please run `npm install o2.object` first.');
}

clone = o.clone;
extend = o.extend;

if (!window) {
    throw new Error('o2.timer should run in a browser.');
}

tick = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( delegate ) {
                return window.setTimeout( delegate, 17 );
            };
commandQueue = [];

function noop() {}

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

function getMetaInfoFromQueueItem(item) {
    var parsed = parse(item);

    if (!parsed.delegate) {
        parsed.delegate = noop;
    }

    return parsed;
}

function delegateCommand(command) {
    if (!command) {return false;}

    getMetaInfoFromQueueItem(command).delegate();

    return true;
}

function getNextCommand() {
    return commandQueue.shift();
}

function delegateNextCommand() {
    return delegateCommand(getNextCommand());
}

function multiplex() {
    var len = Math.pow(2, misses),
        i;

    for(i = 0; i < len; i++) {
        if (!delegateNextCommand()) {break;}
    }
}

function executeMultiplex() {
    if (commandQueue.length > config.multiplexThreshold) {
        hits = 0;
        misses++;

        multiplex();

        return true;
    }

    return false;
}

function adjustHitCount() {
    if (misses <= 0) {return;}

    hits++;

    if (hits >= config.batchSizeDecreaseThreshold) {
        misses--;
        hits = 0;
    }
}

function loop() {
    tick(loop);

    var didProcessQueue = executeMultiplex();

    if (didProcessQueue) {return;}

    adjustHitCount();

    delegateNextCommand();
}

exports.initialize = function(newConfig) {
    config = clone(rConfig);

    extend(config, newConfig);

    loop();

    exports.initialize = noop;
};

exports.setTimeout = function(delegate, timeout) {
    return setTimeout(function() {
        commandQueue.push({delegate: delegate});
    }, timeout || 0);
};

exports.clearTimeout = function(id) {
    clearTimeout(id);
};
