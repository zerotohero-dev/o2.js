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
    var kAsyncInitDelegate = '_wdAsyncInit';

    /*
     *
     */
    var me = p.Init = {};

    /*
     * Fired when initial widget state is ready.
     */
    function processPostInitialization(state) {
        log('o->processPostInitialization(');
        log(state);
        log(')');

        var o2 = p.o2;

        //TODO: consolidate all these event names to a common place.
        o2.Event.publish('wd-begin-render', [state]);
    }

    /*
     * Load initial widget state data from the server.
     */
    me.loadState = function(config) {
        log('o->loadInitialState(');
        log(config);
        log(')');

        var o2 = p.o2;

        o2.Jsonp.get(
            o2.String.concat(p.url.API_ROOT, p.path.PARAMS),
            config,

            //TODO: raise events for decoupling.
            processPostInitialization
        );
    };

    /*
     * Fires _wdAsyncInit if there's such a function defined
     * by the publisher.
     */
    me.fireAsyncInit = function() {
        if(window[kAsyncInitDelegate]) {
            window[kAsyncInitDelegate]();
        }

        me.fireAsyncInit = p.noop;
    };
}(this));