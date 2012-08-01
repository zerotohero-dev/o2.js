/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-08-02 01:11:38.551023
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

    /**
     * @class {protected} Config
     *
     * Gets widget configuration from DOM.
     */
    var me = p.Config = {};

    /**
     * @function {static} Config.get
     *
     * Gets widget configuration from DOM.
     */
    me.get = function() {
        log('Config.getConfiguration()');

        var result = {};

        result[kPublisherId] = window[kWidgetAlias][kPublisherId];

        return result;
    };

}(this));