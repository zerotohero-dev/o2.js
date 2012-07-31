/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-31 22:56:57.638192
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

    var kBeginRender  = 'wd-begin-render';

    /*
     *
     */
    me.subscribe = function() {
        var o2  = p.o2;
        var sub = o2.Event.subscribe;

        sub(p.event.USER_LOGGED_IN, function(response) {
            //TODO: rendering.
            var div = p.Dom.getWidgetAnchor();
            div.innerHTML = response.data;
        });

        //TODO:
        sub(kBeginRender, function(state) {
            p.setReadyState('BEGIN_RENDER');
            p.Rendering.render(state);
        });
    };

    /*
     * Use event delegation to bind widget events.
     */
    me.delegate = function() {
        log('o->delegateEvents()');

        p.o2.Event.addEventListener(
            document, kClick, p.Callback.event.document_click
        );
    };
}(this, this.document));