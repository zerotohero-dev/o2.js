/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-28 00:59:28.060744
 * -->
 */
(function(window, document, isDebugMode) {
    'use strict';

    /*
     * Common Constants
     */

    /*
     * Ready States
     */
    var kLoaded              = 1;
    var kLoadingDependencies = 2;
    var kLoadedDependencies  = 3;
    var kBeginProcessQueue   = 4;
    var kBeginRender         = 5;
    var kComplete            = 6;

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
    var kPublisherId = 'pubId';
    var kRandom      = 'r';
    var kVersion     = 'v';

    /*
     * URL
     */
    var kApiRoot = 'http://api.widget.www/';
    var kO2Root  = 'http://api.widget.www/lib/o2.js/';

    /*
     * Path
     */
    var kBeaconPath = 'api/v.0.1/beacon';
    var kParamsPath = 'api/v.0.1/params';

    /*
     * Regular Expression
     */
    var kCompleteRegExp   = /loaded|complete/;

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
    var kO2Alias          = '_wd_o2';
    var kWidgetAlias      = '_wd';
    var kWidgetQueueAlias = '_wdq';

    /*
     * Common Widget Keys
     */
    var kReadyState = 'readyState';

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
     * Sets the internal ready state.
     */
    function setReadyState(state) {
        window[kWidgetAlias][kReadyState] = state;
    }

    setReadyState(kLoaded);

    /*
     * Executes the job queue asyncronously.
     */
    //TODO: implement me.
    function execute() {
        log('o->execute()');
        window.console.warn('IMPLEMENT execute()');
    }

    /*
     * An overridden version of the async job queue.
     */
    var queue = {
        items : [],

        push : function(item) {
            log('o->queue.push()');

            execute(item);
        }
    };

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

        insertScript(kApiRoot, [kBeaconPath, kQuery,
            kVersion,  kEquals, versionTimestamp , kAnd,
            kRandom, kEquals, (new Date()).getTime()
        ].join(kEmpty), noop);
    }

    /*
     * Renders the widget
     */
    function render(state) {
        log('o->render(');
        log(state);
        log(')');

        window.console.warn('Where will I render this widget?!');
    }

    /*
     * Processes the job queue item by item.
     */
    var processQueue = function() {
        log('o->processQueue()');

        setReadyState(kBeginProcessQueue);

        var q = null;

        if (window[kWidgetQueueAlias] &&
                    o2.isArray(window[kWidgetQueueAlias])) {
            q = window[kWidgetQueueAlias];

            while (q.length) {
                execute(q.pop());
            }
        }

        processQueue = noop;
    };

    /*
     * Fired when initial widget state is ready.
     */
    function processPostInitialization(state) {
        log('o->processPostInitialization(');
        log(state);
        log(')');

        setReadyState(kBeginRender);

        render(state);

        processQueue();

        window[kWidgetQueueAlias] = queue;

        setReadyState(kComplete);

        if(window._wdAsyncInit) {
            window._wdAsyncInit();
        }
    }

    /*
     * Loads initial widget state from the server.
     */
    function loadInitialState(config, callback) {
        log('o->loadInitialState(');
        log(config);
        log(callback);
        log(')');

        o2.Jsonp.get(
            o2.String.concat(kApiRoot, kParamsPath),
            config,
            callback
        );
    }

    /*
     * Get widget configuration from DOM.
     */
    function getConfiguration() {
        log('o->getConfiguration()');

        var result = {};

        result[kPublisherId] = window[kWidgetAlias][kPublisherId];

        return result;
    }

    /*
     * Initialize after loading prerequisites.
     */
    function initialize() {
        log('o->initialize()');

        setReadyState(kLoadedDependencies);

        if (!window.o2) {return;}

        window.o2.noConflict(kO2Alias);

        o2 = window[kO2Alias];

        var config = getConfiguration();

        loadInitialState(config, processPostInitialization);
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

        setReadyState(kLoadingDependencies);

        loadScripts(kO2Root, [
            'o2.meta.js',
            'o2.core.js',
            'o2.string.core.js',
            'o2.jsonp.core.js'
        ], callback);
    }

    checkForUpdates(versionTimestamp);
    loadDependencies(initialize);
}(this, this.document, true));
