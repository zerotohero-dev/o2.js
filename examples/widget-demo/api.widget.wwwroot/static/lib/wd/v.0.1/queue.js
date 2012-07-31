/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-31 22:56:57.638192
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
        log('o->execute()');

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
            log('o->queue.push()');

            execute(item);
        }
    };

    /*
     * Processes the initial job queue.
     */
    me.process = function() {
        log('o->processQueue()');

        p.setReadyState(p.readyState.BEGIN_PROCESS_QUEUE);

        var o2 = p.o2;

        var q = null;

        if (window[kWidgetQueueAlias] &&
                    o2.Validation.isArray(window[kWidgetQueueAlias])) {
            q = window[kWidgetQueueAlias];

            while (q.length) {
                execute(q.pop());
            }
        }

        p.Queue.process = p.noop;
    };

    /*
     * Overrides <code>window._wdq</code> implementation.
     */
    me.override = function() {
        window[kWidgetQueueAlias] = queue;
    };
}(this));