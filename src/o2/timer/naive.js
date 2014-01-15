'use strict';

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

function loop() {
    tick(loop);

    delegateNextCommand();
}

exports.initialize = function() {
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
