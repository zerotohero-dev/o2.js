/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-09 09:02:25.561067
 * -->
 */
(function(app) {
    'use strict';

    /**
     *
     */
    var me = app.PageController = {};

    /*
     * Stubs for the Presentation Tier
     */
    var show  = app.RenderController.showVCard;
    var close = app.RenderController.closeVCard;

    /**
     *
     */
    me.showVCard = function() {
        show();
    };

    /**
     *
     */
    me.closeVCard = function() {
        close();
    };
}(this.VCardApp));
