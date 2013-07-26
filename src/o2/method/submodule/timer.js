define([
    '../../core'
], function(
    o2
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * ../../core
         */
        now = o2.now,

        /*
         * # Timer-Related Constants
         */

        kTimerId = 'id',
        kDelayCheckMs = 50;

    /*
     *
     */
    function isTimeExceeded(currentTime, lastCallTime, waitMs) {
        return !!currentTime && (now() - lastCallTime > waitMs);
    }

    /*
     *
     */
    function doTimeout(timerContext, timerId, delegate, ms) {
        clearTimeout(timerContext[timerId]);

        timerContext[timerId] = setTimeout(delegate, ms);
    }

    /*
     *
     */
    function exec(timers, queue, delegate) {
        var item = queue.pop();

        if (!item) {return;}

        timers.lastCallTime = now();

        try {
            delegate.apply(item.context, item.args);
        } catch (ignore) {}
    }

    /*
     *
     */
    function execIfWaitedEnough(timers, queue, waitMs, delegate) {
        if (!isTimeExceeded(timers.lastCallTime, waitMs)) {return;}

        exec(timers, queue, delegate);
    }

    exports.debounce = function(delegate, waitMs) {
        var timers = {};

        timers[kTimerId] = null;

        return function() {
            var context = this,
                args    = arguments;

            doTimeout(timers, kTimerId, function() {
                delegate.apply(context, args);
            }, waitMs);
        };
    };

    exports.defer = function(delegate, interval, context, args) {
        setTimeout(function() {
            return delegate.apply(context, args);
        }, interval);
    };

    exports.delay = exports.defer;

    exports.throttle = function(delegate, waitMs) {
        var timers = {lastCallTime : null},
            queue = [],
            loop;

        timers[kTimerId] = null;

        loop = function() {
            execIfWaitedEnough(timers, queue, waitMs, delegate);

            if (!queue.length) {return;}

            doTimeout(timers, kTimerId, loop, kDelayCheckMs);
        };

        return function() {
            queue.push({context : this, args : arguments});

            loop();
        };
    };

    return exports;
});
