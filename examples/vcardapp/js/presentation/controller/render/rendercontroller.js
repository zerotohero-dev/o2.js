/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-08 08:04:46.842332
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

    /**
     *
     */
    me.showVCard = function(html) {
        var contentDiv = $(kContentDiv);
        contentDiv.innerHTML = html;

        show(contentDiv);
        hide(kActivatorDiv);
    };

    me.closeVCard = function() {
        hide(kContentDiv);
        show(kActivatorDiv);
    };
}(this.o2, this.VCardApp));