/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-31 14:34:02.527566
 * -->
 */
(function(window, document) {
    'use strict';

    if (!window._wd) { return; }

    var wd = window._wd;
    var p  = wd.protecteds;

    /*
     * Aliases
     */
    function log(stuff) { p.log(stuff); }

    var me = p.Event = {};

    /*
     * Events
     */
    var kClick = 'click';

    /*
     * Parameter Names
     */
    var kUsername = 'u';
    var kPassword = 'p';

    /*
     * Element IDs
     */
    var kLoginButtonId = 'wd_btnLogin';

    /*
     * User login JSONP callback.
     */
    function processUserLogin(response) {
        var div = p.Dom.getWidgetAnchor();
        div.innerHTML = response.data;
    }

    /*
     * Global event handler on document's click event.
     */
    //TODO:
    function document_click(evt) {
        log('document_click()');

        var o2   = p.o2;
        var url  = p.url;
        var path = p.path;

        var target = o2.Event.getTarget(evt);

        var id = target.id;

        if (!id) {
            return;
        }

        // Just for demonstration.
        var params = {};
        params[kUsername] = 'dummy';
        params[kPassword] = 'dummy';

        if (id.indexOf(kLoginButtonId) > -1) {
            o2.Jsonp.get(
                o2.String.concat(url.API_ROOT, path.LOGIN),
                params,
                //TODO:
                processUserLogin
            );
        }
    }

    /*
     * Use event delegation to bind widget events.
     */
    me.delegate = function() {
        log('o->delegateEvents()');

        var o2 = p.o2;

        o2.Event.addEventListener(document, kClick, document_click);
    };
}(this, this.document));