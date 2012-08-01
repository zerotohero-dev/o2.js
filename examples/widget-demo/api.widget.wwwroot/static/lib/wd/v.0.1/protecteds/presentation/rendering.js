/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-08-01 04:42:44.568276
 * -->
 */
(function(window) {
    'use strict';

    if (!window._wd) { return; }

    var wd = window._wd;
    var p  = wd.protecteds;

    /*
     * Aliases
     */
    function log(stuff) { p.log(stuff); }

    /*
     *
     */
    var me = p.Rendering = {};

    var kVersion = 'v';

    /*
     * Query Formation
     */
    var kAnd    = '&';
    var kEmpty  = '';
    var kEquals = '=';
    var kQuery  = '?';
    var kRandom = 'r';

    /*
     * Things done after the initial view is rendered.
     */
    function processPostRenderActions() {
        log('Rendering.processPostRenderActions()')
        p.Event.delegate();

        p.Queue.process();

        p.Queue.override();

        p.setReadyState('COMPLETE');

        p.Init.fireAsyncInit();
    }

    /*
     * Does the actual rendering.
     */
    function renderWidget(container, html) {
        log('Rendering.renderWidget(');
        log(container);
        log(html);
        log(')');

        if (!container) {
            return;
        }

        //TODO: to p.Dom
        container.innerHTML = html;
    }

    /*
     * Renders the widget
     */
    me.render = function(state) {
        log('Rendering.render(');
        log(state);
        log(')');

        var div  = p.Dom.getWidgetAnchor();
        var o2   = p.o2;
        var url  = p.url;
        var path = p.path;

        if (!div) {
            return;
        }

        //TODO: to p.dom
        o2.Dom.loadCss(
            o2.String.concat(url.API_ROOT, path.CSS),
            function() {
                renderWidget(div, state.data);

                //TODO: use events.
                processPostRenderActions();
            }
        );
    };

    /*
     * Inserts beacon script.
     */
    me.insertBeaconScript = function() {
        log('Rendering.insertBeaconScript()');

        var url  = p.url;
        var path = p.path;

        p.insertScript(url.API_ROOT, [path.BEACON, kQuery,
            kVersion,  kEquals, p.timestamp , kAnd,
            kRandom, kEquals, (new Date()).getTime()
        ].join(kEmpty), p.noop);
    };
}(this));