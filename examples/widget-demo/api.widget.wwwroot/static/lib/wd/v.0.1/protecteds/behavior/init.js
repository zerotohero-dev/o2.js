/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-08-03 00:27:49.751926
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
    var kAsyncInitDelegate = '_wdAsyncInit';

    /**
     * @class {protected} Init
     *
     * State and initialization controller.
     */
    var me = p.Init = {};

    /*
     * Fires _wdAsyncInit if there's such a function defined
     * by the publisher.
     */
    var fireAsyncInit = function() {
        log('Init.fireAsyncInit()');

        // Behavior -> Delegation
        (window[kAsyncInitDelegate] || p.noop)();
        fireAsyncInit = p.noop;
    };

    /*
     * Load initial widget state data from the server.
     */
    function loadState(config) {
        log('Init.loadState(');
        log(config);
        log(')');

        // Behavior -> Communication
        p.pub('GET_PARAMS', [config]);
    }

    /**
     * @function {static} Init.subscribe
     *
     * Subscribes to relevant events.
     */
    me.subscribe = function() {
        log('Init.subscribe()');

        var sub = p.sub;

        // Everything is ready. Fire async init to the client.
        sub('FIRE_ASYNC_INIT', fireAsyncInit);

        // Load widget state from server.
        sub('LOAD_STATE', loadState);
    };
}(this));
