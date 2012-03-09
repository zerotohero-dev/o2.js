/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 22012-03-09 19:17:51.023992
 * -->
 */
(function(app) {
    'use strict';

    /**
     *
     */
    var me = app.PageCallback = {};

    /*
     * Stub to the Behavior Tier
     */
    var pc         = app.PageController;
    var showVCard  = pc.showVCard;
    var closeVCard = pc.closeVCard;

    /**
     *
     */
    me.showVCard = function() {
        showVCard();
    };

    /**
     *
     */
    me.closeVCard = function() {
        closeVCard();
    };
}(this.VCardApp));