/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */
(function(document){
    'use strict';

    /*
     * Common constants.
     */
    var kNone = 'none';
    var kBlock = 'block';

    /*
     * Common elements.
     */
    var kActivatorDiv = 'VCardActivator';
    var kContentDiv = 'VCardContent';
    var kVCardButton = 'vcard-volkan';
    var kVCardCloseButton = 'vcard-volkan-close';

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

    function showVCard() {
        document.getElementById(kContentDiv).innerHTML = vCardHtml;
        document.getElementById(kContentDiv).style.display = kBlock;
    }

    function closeVCard() {
        document.getElementById(kActivatorDiv).style.display = kBlock;
        document.getElementById(kContentDiv).style.display = kNone;
    }

    document.getElementById(kVCardButton).onclick = function() {
        showVCard();

        document.getElementById(kVCardCloseButton).onclick = function() {
            closeVCard();
            return false;
        };

        return false;
    };
}(this.document));
