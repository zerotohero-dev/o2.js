/**
 * @module timer
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A static class for timeout related operations.</p>
 */
(function(framework, window) {
    'use strict';

    /*
     * A collection of timers.
     */
    var timers = {};
    var me = framework;

    /*
     * Common constants.
     */
    var kPrefix = 't';

    /*
     * Method aliases.
     */
    var concat = framework.StringHelper.concat;

    /*
    o2.Timer.set(kCheckId, doStuff, 500, {start: true, repeat: true});
    o2.Timer.stop(kCheckId);
    o2.Timer.start(kCheckId);
     */

    /**
     * @class {static} o2.Timer
     *
     * <p>A class for executing repeated timed actions.</p>
     */
    me.Timer = {

        /**
         * @function {static} o2.Timer.set
         *
         * <p>Sets and optionally starts a new timer.</p>
         *
         * @param {String} id - a unique identifier for the timer.
         * @param {Function} delegate - action to be done when the timer ticks.
         * @param {Integer} timeout - interval of the timer in milliseconds.
         * @param {Object} option - optional configuration in the form
         * <code>{start: true, repeat: true}</code>, if <strong>start</strong>
         * is <code>true</code> timer will start after being set; otherwise
         * it should be explicitly started using the
         * {@link o2.Timer.start} method. If <strong>repeat</strong> is
         * <code>false</code> the delegate will be executed only once, othwerwise
         * it will be executed at each interval until {@link o2.Timer.stop}
         * is called.
         */
        set : function(id, delegate, timeout, options) {
            window.clearTimeout(id);

            var timerId = concat(kPrefix, id);

            if (timers[timerId]) {
                me.Timer.stop(timerId);

                delete timers[timerId];
            }

            options = options || {};

            if (options.start === undefined) {
                options.start = true;
            }

            options.repeat = !!options.repeat;

            timers[timerId] = {};
            timers[timerId].delegate = delegate;
            timers[timerId].timeout = timeout;
            timers[timerId].id = null;
            timers[timerId].shouldRepeat =  options.repeat;

            timers[concat(kPrefix, id)] = {};

            var shouldStart = options.start;

            if (!!shouldStart) {
                me.Timer.start(id);
            }
        },

        /**
         * @function {static} o2.Timer.start
         *
         * <p>Starts/restarts the timer with the given id.
         *
         * @param {String} id - the id of the timer to start.
         */
        start: function(id) {
            var timerId = concat(kPrefix, id);
            var meta = timers[timerId];

            if (meta) {
                if (meta.shouldRepeat) {
                    window.clearInterval(meta.id);

                    meta.id = window.setInterval(function(){
                        meta.delegate();
                    }, meta.timeout);

                    return;
                }

                window.clearTimeout(meta.id);

                meta.id = window.setTimeout(function(){
                    meta.delegate();
                }, meta.timeout);
            }
        },

        /**
         * @function {static} o2.Timer.stop
         *
         * <p>Stops the timer with the given id.</p>
         *
         * @param {String} id - the id of the timer to stop.
         */
        stop: function(id) {
            var timerId = concat(kPrefix, id);
            var meta = timers[timerId];

            if (meta) {
                if (meta.shouldRepeat) {
                    window.clearInterval(meta.id);

                    return;
                }

                window.clearTimeout(meta.id);
            }
        }
    };
}(this.o2, this));
