(function(o2, app, document) {
    'use strict';

    var me = app.RenderController = {};

    var kActivatorDiv     = 'VCardActivator';
    var kContentDiv       = 'VCardContent';

    /*
     * Common constants.
     */
    var kBlock = 'block';
    var kNone  = 'none';

    /*
     * Aliases
     */
    var $    = o2.$;
    var hide = o2.DomHelper.hide;
    var show = o2.DomHelper.show;

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
}(this.o2, this.VCardApp, this.document));