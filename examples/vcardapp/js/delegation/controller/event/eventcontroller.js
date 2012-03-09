/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-09 08:17:05.167453
 * -->
 */
(function(app, o2, document) {
    'use strict';

    /**
     *
     */
    var me = app.EventController = {};

    /*
     * Common Events
     */
    var kClick = 'click';

    /*
     * Aliases
     */
    var eh             = o2.EventHandler;
    var listen         = eh.addEventListener;

    /*
     * Callbacks
     */
    var document_click = app.EventCallback.document_click;

    /**
     *
     */
    me.bindEventHandlers = function() {
        listen(document, kClick, document_click);
    };
}(this.VCardApp, this.o2, this.document));
