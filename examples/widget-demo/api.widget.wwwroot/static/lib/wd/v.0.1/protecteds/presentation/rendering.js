/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-08-02 01:10:28.658250
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
    function renderWidget(container, html) {
        log('Rendering.renderWidget(');
        log(container);
        log(html);
        log(')');

        if (!container) {
            return;
        }

        p.Dom.render(container, html);
    }

    /*
     * Renders the widget.
     */
    function render(state) {
        log('Rendering.render(');
        log(state);
        log(')');

        var div  = p.Dom.getWidgetAnchor();

        if (!div) {
            return;
        }

        renderWidget(div, state.data);
    }

    /*
     * Renders logged in UI.
     */
    function renderLoggedIn(response) {
        var div = p.Dom.getWidgetAnchor();
        div.innerHTML = response.data;
    }

    /**
     * @function {static} Rendering.subscribe
     *
     * Subscribes to render-related custom event handers.
     */
    me.subscribe = function() {
        log('Rendering.subscribe()');

        p.sub('RENDER_WIDGET'   , render);
        p.sub('RENDER_LOGGED_IN', renderLoggedIn);
    };
}(this));