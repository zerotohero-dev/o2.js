/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-19 16:36:19.884686
 * -->
 */
(function(app) {
    'use strict';

    // NOTE:
    // This module belongs to the "Behavior Tier"; it cannot access to DOM
    // or render-related method directly (i.e. it cannot get elements'
    // innerHTML, it cannot alter element contents, show an alert, or
    // a confirm dialog etc.). All of these
    // actions should be delegated to the "RenderController".

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
