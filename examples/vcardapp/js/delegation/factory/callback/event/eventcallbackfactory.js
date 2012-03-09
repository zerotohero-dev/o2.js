/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-09 08:56:14.724803
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
     * Behavior Tier Stub
     */
    var page = app.PageController;

    /**
     *
     */
    me.create = function(src) {
        if (!src) {
            return {callback : null, args : null};
        }

        switch (src.id) {
            case kVCardButton :
                return {callback : page.showVCard, args : {}};

            case kVCardCloseButton :
                return {callback : page.closeVCard, args : {}};
        }

        return {callback : null, args : null};
    };
}(this.VCardApp));
