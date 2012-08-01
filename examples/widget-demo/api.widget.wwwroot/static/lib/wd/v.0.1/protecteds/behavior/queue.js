/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-08-01 04:48:22.263210
 * -->
 */
(function(window) {
    'use strict';

    if (!window._wd) { return; }

    var wd = window._wd;
    var p  = wd.protecteds;

    /*
     * Aliases
     */
    function log(stuff) { p.log(stuff); }

    /*
     * Common Constants
     */
    var kWidgetQueueAlias = '_wdq';
    var kAction           = 'action';
    var kPayload          = 'payload';

    /*
     * Action Enums
     */
    var kEcho = 'echo';

    /*
     *
     */
    var me = p.Queue = {};

    /*
     * Executes the job queue asyncronously.
     */
    function execute(item) {
        log('Queue.execute()');

        var action = item[kAction];

        if (action === kEcho) {
            log('ECHO: ');
            log(item[kPayload]);

            return;
        }

        log('ERROR: no mapping for action "' + action + '"');
    }

    /*
     * An overridden version of the async job queue.
     */
    var queue = {
        push : function(item) {
            log('Queue.queue.push()');

            execute(item);
        }
    };

    /*
     * Processes the initial job queue.
     */
    me.process = function() {
        log('Queue.process()');

        // B -> Pe
        p.setReadyState(p.readyState.BEGIN_PROCESS_QUEUE);

        var o2 = p.o2;

        var q = window[kWidgetQueueAlias];

        if (o2.Validation.isArray(q)) {
            while (q.length) {
                execute(q.pop());
            }
        }

        me.process = p.noop;
    };

    /*
     * Overrides <code>window._wdq</code> implementation.
     */
    me.override = function() {
        log('Queue.override()');

        // B -> Pe
        window[kWidgetQueueAlias] = queue;
    };
}(this));