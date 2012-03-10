/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-10 08:09:06.723901
 * -->
 */
(function(app, window) {
    'use strict';

    var me = app.AjaxCallback = {};

    /*
     * Stubs to the Behavior Tier
     */

    function renderVCardUi(result) {
        app.PageController.renderVCardUi(result)
    }

    /*
     * Logger
     */
    var log = app.Logger.log;

    /*
     *
     */
    var kEmpty = '';

    /**
     *
     */
    me.handleShowVCardRequestComplete = function(result) {
        log('app.ajaxcallback.handleShowVCardRequestComplete');

        if (!result) {
            return;
        }

        renderVCardUi(result);
    };

    /**
     *
     */
    me.handleShowVCardRequestError = function(status, statusText) {
        log(['ajaxcallback:handleShowVCardRequestError status: "',
            status ,'" statusText: "', statusText ,'".'
        ].join(kEmpty));
    };

    /**
     *
     */
    me.handleShowVCardRequestException = function(ex){
        log(['ajaxcallback:handleShowVCardException message: "',
            ex.message ,'" ex: "', ex.toString() ,'".'
        ].join(kEmpty));
    };
}(this.VCardApp, this));