/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-31 14:34:59.075931
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

    var kVersion = 'v';

    /*
     * Query Formation
     */
    var kAnd    = '&';
    var kEmpty  = '';
    var kEquals = '=';
    var kQuery  = '?';
    var kRandom = 'r';

    /*
     *
     */
    var me = p.Dom = {};

    /*
     * Find a place to append the widget UI.
     */
    me.getWidgetAnchor = function() {
        log('o->getWidgetAnchor()');

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

    /*
     * Inserts beacon script.
     */
    me.insertBeaconScript = function() {
        var url  = p.url;
        var path = p.path;

        p.insertScript(url.API_ROOT, [path.BEACON, kQuery,
            kVersion,  kEquals, p.timestamp , kAnd,
            kRandom, kEquals, (new Date()).getTime()
        ].join(kEmpty), p.noop);
    };
}(this, this.document));