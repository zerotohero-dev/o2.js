(function(window) {
    'use strict';

    if (!window._wd) {
        return;
    }

// 2012-07-30 22:35:29.425704

    var wd = window._wd;

    var p = wd.protecteds;

//    alert(p);

    /*
     * Aliases
     */
    function log(stuff) { p.log(stuff); }

    /*
     *
     */
    var me = p.Init = {};


    /*
     * Fired when initial widget state is ready.
     */
    function processPostInitialization(state) {
        log('o->processPostInitialization(');
        log(state);
        log(')');

        p.setReadyState(p.readyState.BEGIN_RENDER);

        window.alert('render');
        //render(state);
    }

    /*
     * Load initial widget state data from the server.
     */
    me.loadState = function(config) {
        log('o->loadInitialState(');
        log(config);
        log(')');

        var o2 = p.o2;

        o2.Jsonp.get(
            o2.String.concat(p.url.API_ROOT, p.path.PARAMS),
            config,

            //TODO: raise events for decoupling.
            processPostInitialization
        );
    };
}(this));