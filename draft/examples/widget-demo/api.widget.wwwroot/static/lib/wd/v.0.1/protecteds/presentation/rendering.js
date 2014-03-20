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
     * @class {protected} Rendering
     *
     * UI Controller.
     */
    var me = p.Rendering = {};

    /*
     * Does the actual rendering.
     */
    function renderWidget(html) {
        log('Rendering.renderWidget(');
        log(html);
        log(')');

        p.pub('RENDER_DOM', [html]);
    }

    /*
     * Renders the widget.
     */
    function render(state) {
        log('Rendering.render(');
        log(state);
        log(')');

        renderWidget(state.data);
    }

    /*
     * Renders logged in UI.
     */
    function renderLoggedIn(response) {
        log('Rendering.renderLoggedIn(');
        log(response);
        log(')');

        renderWidget(response.data);
    }

    /**
     * @function {static} Rendering.subscribe
     *
     * Subscribes to render-related custom event handers.
     */
    me.subscribe = function() {
        log('Rendering.subscribe()');

        // Render initial widget.
        p.sub('RENDER_WIDGET'   , render);

        // Render logged in state.
        p.sub('RENDER_LOGGED_IN', renderLoggedIn);
    };
}(this));