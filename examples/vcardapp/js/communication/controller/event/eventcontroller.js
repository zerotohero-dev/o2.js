/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-08 08:04:46.842332
 * -->
 */
(function(app, document) {
    'use strict';

    /**
     *
     */
    var me = app.EventController = {};

    /*
     * Common Elements
     */
    var kVCardButton      = 'vcard-volkan';
    var kVCardCloseButton = 'vcard-volkan-close';

    /*
     * Behavior Tier Stub
     */
    var page = app.PageController;

    /**
     *
     */
    me.bindEventHandlers = function() {

        document.onclick = function(evt) {
            var src = window.event ? window.event.srcElement : evt.target;

            switch (src.id) {
                case kVCardButton :
                    page.showVCard();

                    break;
                case kVCardCloseButton :
                    page.closeVCard();

                    break;
                default :

                    break;
            }

            return false;
        };
    };
}(this.VCardApp, this.document));
