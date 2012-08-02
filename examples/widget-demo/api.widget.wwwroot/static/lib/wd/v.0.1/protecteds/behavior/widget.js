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
     * @class {protected} Widget
     *
     * Main controller class for the widget.
     */
    var me = p.Widget = {};

    /**
     * @function {static} Widget.subscribe
     *
     * Subscribes to relevant events.
     */
    me.subscribe = function() {
        log('Widget.subscribe()');

        // Start rendering of the widget.
        p.sub('BEGIN_RENDER', function(state) {
            log('event<BEGIN_RENDER');
            log(state);
            log('>');

            p.setReadyState('BEGIN_RENDER');

            // Behavior -> Presentation
            p.pub('LOAD_CSS', [state]);
        });

        // User login action from UI.
        p.sub('USER_LOGIN', function(params) {
            log('event<USER_LOGIN');
            log(params);
            log('>');

            // Behavior -> Communication
            p.pub('SEND_USER_LOGIN', [params]);
        });

        // Login response from server.
        p.sub('USER_LOGGED_IN', function(response) {
            log('event<USER_LOGGED_IN');
            log(response);
            log('>');

            // Behavior -> Presentation
            p.pub('RENDER_LOGGED_IN', [response]);
        });

        // Widget CSS is loaded.
        p.sub('CSS_LOADED', function(params) {
            log('event<CSS_LOADED');
            log(params);
            log('>');

            // Behavior -> Presentation
            p.pub('RENDER_WIDGET', [params]);

            // Once the widget is rendered, it's responsive and complete:
            p.setReadyState('COMPLETE');

            // Behavior -> Delegation
            p.pub('DELEGATE_EVENTS', []);

            // Behavior -> Behavior
            p.pub('PROCESS_QUEUE', []);

            // Behavior -> Behavior
            p.pub('OVERRIDE_QUEUE', []);

            // Behavior -> Behavior
            p.pub('FIRE_ASYNC_INIT', []);
        });
    };
}(this));