/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-11 05:55:27.065468
 * -->
 */
(function(app) {
    'use strict';

    /**
     *
     */
    var me = app.EventCallbackFactory = {};

    /*
     * Common Elements
     */
    var cce               = app.config.constants.element;
    var kVCardButton      = cce.BTN_VCARD;
    var kVCardCloseButton = cce.BTN_VCARD_CLOSE;

    /*
     * Page Callback
     */
    var pc                       = app.PageCallback;
    var callbacks                = {};
    callbacks[kVCardButton]      = {callback : pc.showVCard,  args: []};
    callbacks[kVCardCloseButton] = {callback : pc.closeVCard, args: []};

    var defaultCallback = {callback : null, args : null};

    /*
     * Logger
     */
    var log = app.Logger.log;

    /**
     *
     */
    me.create = function(src) {
        log('app.EventCallbackFactory.create');

        if (!src) {
            return defaultCallback;
        }

        return callbacks[src.id] || defaultCallback;
    };
}(this.VCardApp));
