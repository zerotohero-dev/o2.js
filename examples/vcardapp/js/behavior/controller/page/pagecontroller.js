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
    var close    = app.RenderController.closeVCard;
    var showCard = app.RenderController.showVCard;

    /*
     * Stubs for the Communication Tier
     */
    var show = app.AjaxController.showVCard;


    me.renderVCardUi = function(html) {
        showCard(html);
    };

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
