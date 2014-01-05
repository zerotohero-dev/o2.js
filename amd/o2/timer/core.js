define(function (require, exports, module) {'use strict';

/*
 *  This program is distributed under the terms of the MIT license.
 *  Please see the LICENSE.md file for details.
 */

if (!window) {
    throw new Error('o2.timer should run in a browser');
}

var tick = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function( delegate ) {
                    return window.setTimeout( delegate, 17 );
                },
    commandQueue = [];


function loop() {
    tick(loop);
}

exports.initialize = function() {
    console.log('tick');

    loop();

    if (!commandQueue.length) {return;}

    commandQueue.shift()();
};

exports.delay = function(delegate, timeout) {
    return setTimeout(function() {
        commandQueue.push(delegate);
    }, timeout || 0);
};

});
