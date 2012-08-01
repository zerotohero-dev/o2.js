/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-08-01 04:42:44.568276
 * -->
 */
(function(window, document, isDebugMode) {
    'use strict';

    /*
     * Should match beacon version timestamp.
     */
    var versionTimestamp = '20120720135547909116';

    /*
     * Resources to be loaded asynchronously.
     */
    var scriptQueue = [];

    /*
     * This will be set after resource initialization.
     */
    var o2 = null;

    /*
     * Query Formation
     */
    var kAnd    = '&';
    var kEmpty  = '';
    var kEquals = '=';
    var kQuery  = '?';

    /*
     * Regular Expression
     */
    var kCompleteRegExp = /loaded|complete/;

    /*
     * Tags
     */
    var kHead   = 'head';
    var kScript = 'script';

    /*
     * Mime Types
     */
    var kScriptType = 'text/javascript';

    /*
     * Globals
     */
    var kO2Alias     = '_wd_o2';
    var kWidgetAlias = '_wd';

    /*
     * Common Widget Keys
     */
    var kReadyState = 'readyState';

    /*
     * Parameter Names
     */
    var param = {
        GUID     : 'guid',
        RANDOM   : 'r',
        VERSION  : 'v',
        USERNAME : 'u',
        PASSWORD : 'p',
        ACTION   : 'action',
        PAYLOAD  : 'payload'
    };

    /*
     * Element IDs
     */
    var elm = {
        LOGIN_BUTTON : 'wd_btnLogin'
    };

    /*
     * Widget Ready States
     */
    var readyState = {
        LOADED               : 1,
        LOADING_DEPENDENCIES : 2,
        LOADED_DEPENDENCIES  : 3,
        BEGIN_PROCESS_QUEUE  : 4,
        BEGIN_RENDER         : 5,
        COMPLETE             : 6
    };

    /*
     * URL
     */
    var url = {
        API_ROOT        : 'http://api.widget.www/',
        O2_ROOT         : 'http://api.widget.www/lib/o2.js/',
        WIDGET_LIB_ROOT : 'http://api.widget.www/lib/wd/v.0.1/',
        LIB_ROOT        : 'http://api.widget.www/lib/'
    };

    /*
     * Path
     */
    var path = {
        BEACON : 'api/v.0.1/beacon',
        CSS    : 'css/v.0.1/widget.css',
        LOGIN  : 'api/v.0.1/login',
        PARAMS : 'api/v.0.1/params'
    };

    /*
     * Custom Events (used for inter-module messaging)
     */
    var event = {
        BEGIN_RENDER     : 'wd-begin-render',
        CSS_LOADED       : 'wd-css-loaded',
        DELEGATE_EVENTS  : 'wd-delegate-events',
        FIRE_ASYNC_INIT  : 'wd-fire-async-init',
        GET_PARAMS       : 'wd-get-params',
        INSERT_BEACON    : 'wd-insert-beacon',
        LOAD_CSS         : 'wd-load-css',
        LOAD_STATE       : 'wd-load-state',
        OVERRIDE_QUEUE   : 'wd-override-queue',
        PROCESS_QUEUE    : 'wd-process-queue',
        RENDER_LOGGED_IN : 'wd-render-logged-in',
        RENDER_WIDGET    : 'wd-render-widget',
        SEND_USER_LOGIN  : 'wd-send-user-login',
        USER_LOGGED_IN   : 'wd-user-logged-in',
        USER_LOGIN       : 'wd-user-login'
    };

    /*
     * Does nothing, and that's the point.
     */
    function noop() {}

    /*
     * Logs to console for debug mode.
     * Does nothing in release mode.
     */
    var log = function(stuff) {
        if (!!isDebugMode && !!window.console) {
            log = function(stuff) {
                window.console.log(stuff);
            };

            log(stuff);

            return;
        }

        log = noop;
    };

    // Publisher has forgotten to provide initialization data.
    if (!window[kWidgetAlias]) {
        log('Widget namespace cannot be found; exiting.');

        return;
    }

    // To avoid re-defining everything if the bootloader is included in
    // more than one place in the publisher's website.
    if (window[kWidgetAlias][kReadyState]) {
        log('Widget has already been loaded; exiting.');

        return;
    }

    /*
     * The "protected" methods are shared across modules, but they
     * are not intended for public use.
     */
    window[kWidgetAlias].protecteds = {};

    /*
     * Sets the internal ready state.
     */
    function setReadyState(state) {
        window[kWidgetAlias][kReadyState] = readyState[state];
    }

    // When the script is "loaded" readyState is LOADED.
    //
    // At the end of the initialization flow, readyState will be finally
    // set to COMPLETE. When the readyState is COMPLETE, it means that
    // the widget UI has been rendered, the events have been bound,
    // widget job queue has been processed, and the widget is completely
    // ready and responsive.
    setReadyState('LOADED');

    /*
     * Asynchronously inserts a script element to the head
     * of the document.
     */
    function insertScript(root, src) {
        var s = document.createElement(kScript);
        var x = document.getElementsByTagName(kScript)[0] ||
            document.getElementsByTagName(kHead)[0];

        s.type  = kScriptType;
        s.async = true;
        s.src   = [root, src].join(kEmpty);

        x.parentNode.insertBefore(s, x);

        return s;
    }

    /*
     * Revalidates cache for this bootloader script, if there's a newer
     * version available. The changes will take effect only AFTER the user
     * refreshes the page.
     */
    function checkForUpdates() {
        log('o->checkForUpdates()');

        insertScript(url.API_ROOT, [path.BEACON, kQuery,
            param.VERSION,  kEquals, versionTimestamp , kAnd,
            param.RANDOM, kEquals, (new Date()).getTime()
        ].join(kEmpty), noop);
    }

    /*
     * Exports protected methods for intra-module use.
     */
    function exportProtecteds() {
        log('o->exportProtecteds()');

        var wp = window[kWidgetAlias].protecteds;

        wp.sub = function(name, callback) {
            var nom = wp.event[name];

            if (!nom) {
                log(['wp.sub: No such event for "', name, '"'].join(kEmpty));

                return;
            }

            o2.Event.subscribe(nom, callback);
        };

        wp.pub = function(name, payload) {
            var nom = wp.event[name];

            if (!nom) {
                log(['wp.pub: No such event for "', name, '"'].join(kEmpty));

                return;
            }

            o2.Event.publish(nom, payload);
        };

        wp.event         = event;
        wp.log           = log;
        wp.noop          = noop;
        wp.o2            = o2;
        wp.path          = path;
        wp.readyState    = readyState;
        wp.setReadyState = setReadyState;
        wp.url           = url;
        wp.param         = param;
        wp.elm           = elm;
    }

    /*
     * Trigger modules to subscribe to events.
     */
    function subscribe() {
        var wp = window[kWidgetAlias].protecteds;

        wp.Init.subscribe();
        wp.Queue.subscribe();
        wp.Event.subscribe();
        wp.Widget.subscribe();
        wp.Proxy.subscribe();
        wp.Rendering.subscribe();
    }

    /*
     * Initialize after loading prerequisites.
     */
    function initialize() {
        log('o->initialize()');

        var wp = window[kWidgetAlias].protecteds;

        if (!window.o2) {return;}

        setReadyState('LOADED_DEPENDENCIES');

        window.o2.noConflict(kO2Alias);

        o2 = window[kO2Alias];

        exportProtecteds();

        var config = wp.Config.get();

        config[param.GUID] = o2.String.generateGuid();

        subscribe();

        wp.pub('LOAD_STATE', [config]);
    }

    /*
     * Loads the next resource after the former one
     * has loaded successfully.
     */
    function loadNext(root, loader, callback) {
        if (scriptQueue.length) {
            loader(root, scriptQueue.shift(), callback);

            return;
        }

        callback();
    }

    /*
     * Loads the given script.
     * <strong>callback</strong> is the function to be executed after
     * there's no resource left to be loeded next.
     */
    var loadScript = function(root, src, callback) {
        var s = insertScript(root, src);

        function processNext() {
            loadNext(root, loadScript, callback);
        }

        s.onreadystatechange = function() {
            if(kCompleteRegExp.test(s.readyState)) {
                processNext();
            }
        };

        s.onload = function() {
            processNext();
        };
    };

    /*
     * Loads an array of scripts one after another.
     */
    function loadScripts(root, ar, callback) {
        scriptQueue = ar;

        loadScript(root, scriptQueue.shift(), callback);
    }

    /*
     * Load necessary o2.js components in noConflict mode.
     */
    function loadDependencies(callback) {
        log('o->loadDependencies(');
        log(callback);
        log(')');

        setReadyState('LOADING_DEPENDENCIES');

        loadScripts(url.LIB_ROOT, [
            'o2.js/o2.meta.js',
            'o2.js/o2.core.js',
            'o2.js/o2.string.core.js',
            'o2.js/o2.jsonp.core.js',
            'o2.js/o2.dom.constants.js',
            'o2.js/o2.dom.core.js',
            'o2.js/o2.dom.load.js',
            'o2.js/o2.event.constants.js',
            'o2.js/o2.validation.core.js',
            'o2.js/o2.event.core.js',
            'o2.js/o2.event.custom.js',
            'o2.js/o2.method.core.js',
            'o2.js/o2.collection.core.js',
            'wd/v.0.1/protecteds/behavior/init.js',
            'wd/v.0.1/protecteds/behavior/queue.js',
            'wd/v.0.1/protecteds/behavior/widget.js',
            'wd/v.0.1/protecteds/communication/proxy.js',
            'wd/v.0.1/protecteds/delegation/callback.js',
            'wd/v.0.1/protecteds/delegation/event.js',
            'wd/v.0.1/protecteds/persistence/config.js',
            'wd/v.0.1/protecteds/presentation/dom.js',
            'wd/v.0.1/protecteds/presentation/rendering.js'
        ], callback);
    }

    //
    // "Widget Initialization Flow" starts down below:
    //

    checkForUpdates(versionTimestamp);
    loadDependencies(initialize);
}(this, this.document, true));
