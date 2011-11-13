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

    //TODO: add documentation.

    var timers = {};
    var kPrefix = 't';

    var concat = framework.StringHelper.concat;

    /*
    o2.Timer.set(kCheckId, doStuff, 500, {start: true, repeat: true});
    o2.Timer.stop(kCheckId);
    o2.Timer.start(kCheckId);
     */

    //TODO: add documentation.
    framework.Timer = {

        //TODO: add documentation.
        set : function(id, delegate, timeout, options) {
            window.clearTimeout(id);

            var timerId = concat(kPrefix, id);

            if (timers[timerId]) {
                framework.Timer.stop(timerId);
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
                framework.Timer.start(id);
            }
        },

        //TODO: add documentation.
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

        //TODO: add documentation.
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
