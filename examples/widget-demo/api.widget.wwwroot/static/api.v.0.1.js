/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-31 22:56:57.638192
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
     * Parameter Names
     */
    var kGuid    = 'guid';
    var kRandom  = 'r';
    var kVersion = 'v';

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
        WIDGET_LIB_ROOT : 'http://api.widget.www/lib/wd/v.0.1/'
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
     * Custom Events
     */
    var event = {
        USER_LOGGED_IN : 'wd-user-logged-in'
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
            kVersion,  kEquals, versionTimestamp , kAnd,
            kRandom, kEquals, (new Date()).getTime()
        ].join(kEmpty), noop);
    }

    /*
     * Exports protected methods for intra-module use.
     */
    function exportProtecteds() {
        var wp = window[kWidgetAlias].protecteds;

        wp.log           = log;
        wp.setReadyState = setReadyState;
        wp.o2            = o2;
        wp.readyState    = readyState;
        wp.url           = url;
        wp.path          = path;
        wp.event         = event;
        wp.noop          = noop;
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

        config[kGuid] = o2.String.generateGuid();

        wp.Event.subscribe();

        wp.Init.loadState(config);
    }

    /*
     * Loads the next resource after the former one
     * has loaded successfully.
     */
    function loadNext(root, loader, callback) {
        log('o->loadNext(');
        log(root);
        log(loader);
        log(callback);
        log(')');

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
        log('o->loadScript(');
        log(root);
        log(src);
        log(callback);
        log(')');

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
        log('o->loadScripts(');
        log(root);
        log(ar);
        log(callback);
        log(')');

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

        loadScripts(url.O2_ROOT, [
            'o2.meta.js',
            'o2.core.js',
            'o2.string.core.js',
            'o2.jsonp.core.js',
            'o2.dom.constants.js',
            'o2.dom.core.js',
            'o2.dom.load.js',
            'o2.event.constants.js',
            'o2.validation.core.js',
            'o2.event.core.js',
            'o2.event.custom.js',
            'o2.method.core.js',
            'o2.collection.core.js'
        ], function() {
        loadScripts(url.WIDGET_LIB_ROOT, [
            'config.js',
            'dom.js',
            'event.js',
            'init.js',
            'queue.js',
            'rendering.js',
            'callback.js'
        ], callback);});
    }

    //
    // "Widget Initialization Flow" starts down below:
    //

    checkForUpdates(versionTimestamp);
    loadDependencies(initialize);
}(this, this.document, true));
