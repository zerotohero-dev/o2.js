/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */
(function(app, document){
    'use strict';

    /*
     * Common elements.
     */
    var kVCardButton      = 'vcard-volkan';
    var kVCardCloseButton = 'vcard-volkan-close';

    var showVCard  = app.RenderController.showVCard;
    var closeVCard = app.RenderController.closeVCard;

    document.getElementById(kVCardButton).onclick = function() {
        showVCard();

        document.getElementById(kVCardCloseButton).onclick = function() {
            closeVCard();
            return false;
        };

        return false;
    };
}(this.VCardApp, this.document));
