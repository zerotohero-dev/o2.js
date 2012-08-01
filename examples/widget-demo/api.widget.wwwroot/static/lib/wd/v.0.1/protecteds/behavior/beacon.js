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

    /**
     * @class {protected} Beacon
     *
     * Controls the cache-revalidation JavaScript beacon.
     */
    var me = p.Beacon = {};

    /**
     * @function {static} Beacon.check
     *
     * Revalidates cache for this bootloader script, if there's a newer
     * version available. The changes will take effect only AFTER the user
     * refreshes the page.
     */
    me.check = function() {
        log('Beacon.checK()');

        // B -> Pr
        p.Rendering.insertBeaconScript();
    };
}(this));