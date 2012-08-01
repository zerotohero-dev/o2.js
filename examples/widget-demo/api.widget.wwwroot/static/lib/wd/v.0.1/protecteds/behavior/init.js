/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-08-01 22:55:58.645517
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

        sub('FIRE_ASYNC_INIT', fireAsyncInit);
        sub('LOAD_STATE'     , loadState);
    };
}(this));
