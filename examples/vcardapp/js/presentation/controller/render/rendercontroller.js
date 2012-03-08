(function(app, document) {
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
     * Common HTML
     */
    var vCardHtml = [
        '<h1>Volkan Özçelik</h1>',
        '<dl>',
        '<dt>Web</dt>',
        '<dd><a href="http://o2js.com">o2js.com</a></dd>',
        '<dt>Email</dt>',
        '<dd><a href="mailto:volkan@o2js.com">volkan@o2js.com</a></dd>',
        '<dt>twitter</dt>',
        '<dd><a href="http://twitter.com/linkibol">@linkibol</a></dd>',
        '<dt>LinkedIn</dt>',
        '<dd><a href="http://linkedin.com/in/volkanozcelik"',
        '>linkedin.com/in/volkanozcelik</a></dd>',
        '</dl>',
        '<p class="clear"><a href="/" id="vcard-volkan-close" class="close"',
        ' title="close"><span>back to home</span></a></p>'
    ].join('');

    me.showVCard = function() {
        document.getElementById(kContentDiv).innerHTML = vCardHtml;
        document.getElementById(kContentDiv).style.display = kBlock;
        document.getElementById(kActivatorDiv).style.display = kNone;
    };

    me.closeVCard = function() {
        document.getElementById(kActivatorDiv).style.display = kBlock;
        document.getElementById(kContentDiv).style.display = kNone;
    };
}(this.VCardApp, this.document));