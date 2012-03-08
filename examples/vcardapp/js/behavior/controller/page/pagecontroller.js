/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-08 08:36:18.241130
 * -->
 */
(function(app, document) {
    'use strict';

    /**
     *
     */
    var me = app.PageController = {};

    /*
     * Aliases
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
}(this.VCardApp, this.document));
