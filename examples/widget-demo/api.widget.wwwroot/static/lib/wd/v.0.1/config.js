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
    var kPublisherId  = 'pubId';
    var kWidgetAlias  = '_wd';

    /*
     *
     */
    var me = p.Config = {};

    /*
     * Get widget configuration from DOM.
     */
    me.get = function() {
        log('o->getConfiguration()');

        var result = {};

        result[kPublisherId] = window[kWidgetAlias][kPublisherId];

        return result;
    };

}(this));