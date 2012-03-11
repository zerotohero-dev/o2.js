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
     * Loading...
     */
    var kProgress = app.config.constants.template.LOADING;

    /*
     * Stubs for the Presentation Tier
     */
    var close    = app.RenderController.closeVCard;
    var showCard = app.RenderController.showVCard;

    /*
     * Stubs for the Communication Tier
     */
    var show = app.AjaxController.showVCard;

    /*
     * Logger
     */
    var log = app.Logger.log;



    /*
     * Stubs for the Delegation Tier
     */
    var bindEventHandlers = function() {
        app.EventController.bindEventHandlers();
    };

    /**
     *
     */
    me.renderVCardUi = function(html) {
        log('app.PageController.renderVCardUi');

        showCard(html);
    };

    /*
     *
     */
    var renderVCardUi = me.renderVCardUi;

    /*
     *
     */
    function showLoading() {
        renderVCardUi(kProgress);
    }

    /**
     *
     */
    me.showVCard = function() {
        log('app.PageController.showVCard');

        showLoading();
        show();
    };

    /**
     *
     */
    me.closeVCard = function() {
        log('app.PageController.closeVCard');

        close();
    };

    /**
     *
     */
    me.init = function() {
        log('app.PageController.init');

        bindEventHandlers();
    }
}(this.VCardApp));
