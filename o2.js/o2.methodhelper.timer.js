/**
 * @module   methodhelper.timer
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-20 09:11:14.837157
 * -->
 *
 * <p>A <code>Function</code> helper for timer-related actions, like delaying
 * a <code>Function</code> call.</p>
 */
(function(framework, window) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var alias     = attr(_, 'alias');
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'MethodHelper';

    /*
     * MethodHelper (timer)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */
    var now = require('now');

    var clearTimeout = attr(window, 'clearTimeout');
    var setTimeout   = attr(window, 'setTimeout');

    /*
     * Timer-Related
     */
    var kTimerId       = 'id';
    var kDelayCheckMs  = 50;

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

        if (!item) {
            return;
        }

        timers.lastCallTime = now();

        try {
            delegate.apply(item.context, item.args);
        } catch (ignore) {
        }
    }

    /*
     *
     */
    function execIfWaitedEnough(timers, queue, waitMs, delegate) {
        if (!isTimeExceeded(timers.lastCallTime, waitMs)) {
            return;
        }

        exec(timers, queue, delegate);
    }

    /**
     * @function o2.MethodHelper.debounce
     *
     * <p>Creates a <code>Function</code> that will not be triggered, as long as
     * it continues to get invoked within a certain time window.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to debounce.
     * @param {Integer} waitMs - the least amount of time (in milliseconds)
     * to wait between calls.
     *
     * @return the debounced <code>Function</code>.
     */
    def(me, 'debounce', function(delegate, waitMs) {
        var timers = {};

        timers[kTimerId] = null;

        return function() {
            var context = this;
            var args = arguments;

            doTimeout(timers, kTimerId, function() {
                delegate.apply(context, args);
            }, waitMs);
        };
    });

    /**
     * @function {static} o2.MethodHelper.defer
     *
     * <p>Defers a <code>Function</code> for a specified amount of time.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to defer.
     * @param {Integer} interval - the interval to defer in milliseconds.
     * @param {Object} context - the context (this reference) to bind.
     * @param {Array} args - arguments to pass to the function.
     */
    def(me, 'defer', function(delegate, interval, context, args) {
        setTimeout(function() {
            return delegate.apply(context, args);
        }, interval);
    });

    /**
     * @function {static} o2.Methodhelper.delay
     *
     * <p>An <strong>alias</strong> to {@link o2.MethodHelper.defer}.</p>
     *
     * @see o2.MethodHelper.defer
     */
    alias(me, 'delay', 'defer');

    /**
     * @function {static} o2.MethodHelper.throttle
     *
     * <p>Returns a <code>Function</code> that will execute at most once in a
     * given time window. That is to say, quick repetitive calls to the function
     * are <strong>throttled</strong>.</p>
     *
     * <p>This may be especially useful for asyncronous <strong>AJAX</strong>,
     * requests, preventing the client to bombard the server with too many
     * simultaneous requests.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to throttle.
     * @param {Integer} waitMs - the least amount of time (in milliseconds)
     * to wait between calls.
     *
     * @return the throttled <code>Function</code>.
     */
    def(me, 'throttle', function(delegate, waitMs) {
        var timers = {
            lastCallTime : null
        };

        timers[kTimerId] = null;

        var queue = [];

        var loop = function() {
            execIfWaitedEnough(timers, queue, waitMs, delegate);

            if (!queue.length) {
                return;
            }

            doTimeout(timers, kTimerId, loop, kDelayCheckMs);
        };

        return function() {
            queue.push({context : this, args : arguments});

            loop();
        };
    });
}(this.o2, this));
