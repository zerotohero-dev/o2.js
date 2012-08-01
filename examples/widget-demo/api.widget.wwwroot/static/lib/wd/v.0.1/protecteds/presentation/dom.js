/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-08-01 04:42:44.568276
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

    /**
     * @function {static} getWidgetAnchor
     *
     * Finds a place to append the widget UI.
     */
    me.getWidgetAnchor = function() {
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
    };
}(this, this.document));