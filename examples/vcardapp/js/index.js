/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */
(function(document){
    'use strict';

    function showVCard() {
        document.getElementById('VCardActivator').style.display = 'none';
        document.getElementById('VCardContent').style.display = 'block';
        document.getElementById('VCardContent').innerHTML =
            ['<h1>Volkan Özçelik</h1>',
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
            ' title="close"><span>back to home</span></a></p>'].join('');

    }

    function closeVCard() {
        document.getElementById('VCardActivator').style.display = 'block';
        document.getElementById('VCardContent').style.display = 'none';
    }

    document.getElementById('vcard-volkan').onclick = function() {
        showVCard();

        document.getElementById('vcard-volkan-close').onclick = function() {
            closeVCard();
            return false;
        };

        return false;
    };
}(this.document));
