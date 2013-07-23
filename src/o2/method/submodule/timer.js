(function(framework, fp) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * core
         */
        now = require('now'),

        /*
         * # Timer-Related Constants
         */

        kTimerId       = 'id',
        kDelayCheckMs  = 50;

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

    /**
     * @function o2.Method.debounce
     *
     * <p>Creates a <code>Function</code> that will not be triggered, as long as
     * it continues to get invoked within a certain time window.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var debounceAction = o2.Method.debuonce(function() {
     *      console('if you call me within a second, I will skip.');
     * }, 1000);
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to debounce.
     * @param {Integer} waitMs - the least amount of time (in milliseconds)
     * to wait between calls.
     *
     * @return the debounced <code>Function</code>.
     */
    exports.debounce = def(me, 'debounce', function(delegate, waitMs) {
        var timers = {};

        timers[kTimerId] = null;

        return function() {
            var context = this,
                args    = arguments;

            doTimeout(timers, kTimerId, function() {
                delegate.apply(context, args);
            }, waitMs);
        };
    });

    /**
     * @function {static} o2.Method.defer
     *
     * <p>Defers a <code>Function</code> for a specified amount of time.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var deferAction = o2.Method.defer(function() {
     *      console.log('I will be delayed for 1 second');
     * }, 1000);
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to defer.
     * @param {Integer} interval - the interval to defer in milliseconds.
     * @param {Object} context - the context (this reference) to bind.
     * @param {Array} args - arguments to pass to the function.
     */
    exports.defer = def(me, 'defer', function(delegate, interval, context,
                args) {
        setTimeout(function() {
            return delegate.apply(context, args);
        }, interval);
    });

    /**
     * @function {static} o2.Method.delay
     *
     * <p>An <strong>alias</strong> to {@link o2.Method.defer}.</p>
     *
     * @see o2.Method.defer
     */
    exports.delay = alias(me, 'delay', 'defer');

    /**
     * @function {static} o2.Method.throttle
     *
     * <p>Returns a <code>Function</code> that will execute at most once in a
     * given time window. That is to say, quick repetitive calls to the function
     * are <strong>throttled</strong>.</p>
     *
     * <p>This may be especially useful for asyncronous <strong>AJAX</strong>,
     * requests, preventing the client to bombard the server with too many
     * simultaneous requests.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Method.throttle(function() {
     *      console.log('You can call me at max once within a second');
     * }, 1000);
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to throttle.
     * @param {Integer} waitMs - the least amount of time (in milliseconds)
     * to wait between calls.
     *
     * @return the throttled <code>Function</code>.
     */
    exports.throttle = def(me, 'throttle', function(delegate, waitMs) {
        var timers = {lastCallTime : null},
            queue  = [],
            loop   = null;

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
    });
}(this.o2, this.o2.protecteds));

