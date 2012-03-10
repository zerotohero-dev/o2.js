/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-10 12:41:01.457409
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
     * Logger
     */
    var log = app.Logger.log;

    /*
     * Stubs for the Communication Tier
     */
    var show = app.AjaxController.showVCard;


    /**
     *
     */
    me.renderVCardUi = function(html) {
        log('app.pagecontroller.renderVCardUi');

        showCard(html);
    };

    /**
     *
     */
    me.showVCard = function() {
        log('app.pagecontroller.showVCard');

        show();
    };

    /**
     *
     */
    me.closeVCard = function() {
        log('app.pagecontroller.closeVCard');

        close();
    };
}(this.VCardApp));
