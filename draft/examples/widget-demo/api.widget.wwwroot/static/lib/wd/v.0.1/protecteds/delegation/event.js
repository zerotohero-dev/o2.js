/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-08-03 00:27:49.751926
 * -->
 */
(function(window, document) {
    'use strict';

    if (!window._wd) { return; }

    var wd = window._wd;
    var p  = wd.protecteds;

    /*
     * Aliases
     */
    function log(stuff) { p.log(stuff); }

    /**
     * @class {protected} Event
     *
     * Event controller.
     */
    var me = p.Event = {};

    /*
     * Events
     */
    var kClick = 'click';

    /*
     * Use event delegation to bind widget events.
     */
    function delegate() {
        log('Event.delegate()');

        p.o2.Event.addEventListener(
            document, kClick, p.Callback.event.document_click
        );
    }

    /**
     * @function {static} Event.subscribe
     *
     * Subscribes to API-specific custom event handers.
     */
    me.subscribe = function() {
        log('Event.subscribe()');

        var sub = p.sub;

        // Delegate DOM events.
        sub('DELEGATE_EVENTS', delegate);
    };
}(this, this.document));