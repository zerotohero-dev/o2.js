/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-10 12:21:50.548139
 * -->
 */
(function(o2, app) {
    'use strict';

    /**
     *
     */
    var me = app.RenderController = {};

    /*
     * Containers
     */
    var cce           = app.config.constants.element;
    var kActivatorDiv = cce.CONTAINER_VCARD_ACTIVATOR;
    var kContentDiv   = cce.CONTAINER_VCARD_CONTENT;

    /*
     * Aliases
     */
    var $    = o2.$;
    var hide = o2.DomHelper.hide;
    var show = o2.DomHelper.show;
    var log  = app.Logger.log;

    /**
     *
     */
    me.showVCard = function(html) {
        log('app.RenderController.showVCard');

        var contentDiv = $(kContentDiv);
        contentDiv.innerHTML = html;

        show(contentDiv);
        hide(kActivatorDiv);
    };

    me.closeVCard = function() {
        log('app.RenderController.closeVCard');

        hide(kContentDiv);
        show(kActivatorDiv);
    };
}(this.o2, this.VCardApp));