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

    /**
     * @class {protected} Proxy
     *
     * Proxy layer that abstracts the communication w
     * with the server.
     */
    var me = p.Proxy = {};

    /**
     * @function {static} Proxy.subscribe
     *
     * Subscribes to relevant events.
     */
    me.subscribe = function() {
        log('Proxy.subscribe()');

        var o2 = p.o2;

        var callback = p.Callback.widget;
        var concat   = o2.String.concat;
        var get      = o2.Jsonp.get;
        var loadCss  = o2.Dom.loadCss;
        var path     = p.path;
        var sub      = p.sub;
        var url      = p.url;

        // Get widget parameters from the server.
        sub('GET_PARAMS', function(params) {
            log('event<GET_PARAMS');
            log(params);
            log('>');

            get(
                concat(url.API_ROOT, path.PARAMS),
                params,
                callback.getParams_complete
            );
        });

        // Send user login event.
        sub('SEND_USER_LOGIN', function(params) {
            log('event<SEND_USER_LOGIN');
            log(params);
            log('>');

            get(
                 concat(url.API_ROOT, path.LOGIN),
                 params,
                 callback.sendUserLogin_complete
            );
        });

        // Load widget CSS.
        sub('LOAD_CSS', function(params) {
            log('event<LOAD_CSS');
            log(params);
            log('>');

            loadCss(
                concat(url.API_ROOT, path.CSS),
                function() {
                    callback.loadCss_complete(params);
                }
            );
        });
    };
}(this));