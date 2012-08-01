/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-08-01 23:41:46.995047
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
     * @class {protected} Callback
     *
     * Callbacks for DOM events, and API custom events.
     */
    var me = p.Callback = {};

    /*
     * Global event handler on document's click event.
     */
    me.event = {

        /*
         *
         */
        document_click : function(evt) {
            log('Callback.event.document_click()');

            var o2 = p.o2;

            var target = o2.Event.getTarget(evt);

            var id = target.id;

            if (!id) {
                return;
            }

            // Just for demonstration.
            var params = {};
            params[p.param.USERNAME] = 'dummy';
            params[p.param.PASSWORD] = 'dummy';

            if (id.indexOf(p.elm.LOGIN_BUTTON) === -1) {
                return;
            }

            // Delegation -> Behavior
            p.pub('USER_LOGIN', [params]);
        }
    };

    /*
     * API Response Handlers
     */
    me.widget = {

        /*
         * Initial widget state is ready.
         */
        getParams_complete : function(response) {
            log('Callback.widget.getParams_complete(');
            log(response);
            log(')');

            // Delegation -> Behavior
            p.pub('BEGIN_RENDER', [response]);
        },

        /*
         * User login server response callback.
         */
        sendUserLogin_complete : function(response) {
            log('Callback.widget.sendUserLogin_complete(');
            log(response);
            log(')');

            // Delegation -> Behavior
            p.pub('USER_LOGGED_IN', [response]);
        },

        /*
         * Widget CSS has been loaded.
         */
        loadCss_complete : function(params) {
            log('Callback.widget.loadCss_complete(');
            log(params);
            log(')');

            // Delegation -> Behavior
            p.pub('CSS_LOADED', [params]);
        }
    };
}(this));
