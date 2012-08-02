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

    /*
     * Common Constants
     */
    var kDiv          = 'div';
    var kWidgetAnchor = 'data-wd-anchor';

    /**
     * @class {protected} Dom
     *
     * DOM Helpers.
     */
    var me = p.Dom = {};

    /*
     * @function {static} Dom.getWidgetAnchor
     *
     * Finds a place to append the widget UI.
     */
    function getWidgetAnchor() {
        log('Dom.getWidgetAnchor()');

        var div = null;

        // divs is a "live" node list
        var divs = document.getElementsByTagName(kDiv);
        var len = divs.length;
        var i   = 0;

        for (i = 0; i < len; i++) {
            div = divs[i];

            if (div.hasAttribute(kWidgetAnchor)) {
                log(':');
                log(div);

                return div;
            }
        }

        log(':');
        log(null);

        return null;
    }

    /*
     * @function {static} Dom.render
     *
     * Simply sets the <code>innerHTML</code> of the
     * <strong>container</strong>.
     */
    function render(html) {
        log('Dom.render(');
        log(html);
        log(')');

        var container  = getWidgetAnchor();

        if (!container) {
            return;
        }

        container.innerHTML = html;
    }

    /**
     * @function {static} Rendering.subscribe
     *
     * Subscribes to DOM-related custom event handers.
     */
    me.subscribe = function() {

        // Renders to DOM
        p.sub('RENDER_DOM', render);
    };
}(this, this.document));