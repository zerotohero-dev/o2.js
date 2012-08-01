/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-08-01 22:58:30.545663
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

    /**
     * @class {protected} Queue
     *
     * Used as an event queue.
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
    function process() {
        log('Queue.process()');

        // Behavior -> Persistence
        p.setReadyState('BEGIN_PROCESS_QUEUE');

        var o2 = p.o2;

        var q = window[kWidgetQueueAlias];

        if (o2.Validation.isArray(q)) {
            while (q.length) {
                execute(q.pop());
            }
        }

        me.process = p.noop;
    }

    /*
     * Overrides <code>window._wdq</code> implementation.
     */
    function override() {
        log('Queue.override()');

        // Behavior -> Persistence
        window[kWidgetQueueAlias] = queue;
    }

    /**
     * @function {static} subscribe
     *
     * Subscribes to relevant events.
     */
    me.subscribe = function() {
        log('Queue.subscribe()');

        var sub = p.sub;

        sub('PROCESS_QUEUE' , process);
        sub('OVERRIDE_QUEUE', override);
    };
}(this));
