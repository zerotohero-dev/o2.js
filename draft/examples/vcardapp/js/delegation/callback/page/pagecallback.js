/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-10 12:21:50.548139
 * -->
 */
(function(app) {
    'use strict';

    /**
     *
     */
    var me = app.PageCallback = {};

    /*
     * Stubs to the Behavior Tier
     */
    var pc         = app.PageController;
    var showVCard  = pc.showVCard;
    var closeVCard = pc.closeVCard;

    /*
     * Logger
     */
    var log = app.Logger.log;

    /**
     *
     */
    me.showVCard = function() {
        log('app.PageCallback.showVCard');

        showVCard();
    };

    /**
     *
     */
    me.closeVCard = function() {
        log('app.PageCallback.closeVCard');

        closeVCard();
    };
}(this.VCardApp));