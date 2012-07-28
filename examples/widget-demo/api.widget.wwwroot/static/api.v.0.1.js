/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-28 16:22:04.2928201
 * -->
 */
(function(window, document, isDebugMode) {
    'use strict';

    /*
     * Widget Ready States
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
    var kAction       = 'action';
    var kGuid         = 'guid';
    var kPassword     = 'p';
    var kPayload      = 'payload';
    var kPublisherId  = 'pubId';
    var kRandom       = 'r';
    var kUsername     = 'u';
    var kVersion      = 'v';
    var kWidgetAnchor = 'data-wd-anchor';

    /*
     * Element IDs.
     */
    var kLoginButtonId = 'wd_btnLogin';

    /*
     * Event Types
     */
    var kClick = 'click';

    /*
     * URL
     */
    var kApiRoot = 'http://api.widget.www/';
    var kO2Root  = 'http://api.widget.www/lib/o2.js/';

    /*
     * Path
     */
    var kBeaconPath = 'api/v.0.1/beacon';
    var kCssPath    = 'css/v.0.1/widget.css';
    var kLoginPath  = 'api/v.0.1/login';
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
    var kDiv    = 'div';

    /*
     * Mime Types
     */
    var kScriptType = 'text/javascript';

    /*
     * Globals
     */
    var kAsyncInitDelegate = '_wdAsyncInit';
    var kO2Alias           = '_wd_o2';
    var kWidgetAlias       = '_wd';
    var kWidgetQueueAlias  = '_wdq';

    /*
     * Common Widget Keys
     */
    var kReadyState = 'readyState';

    /*
     * Action Enums
     */
    var kEcho = 'echo';

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
    function execute(item) {
        log('o->execute()');

        var action = item[kAction];

        switch (action) {
            case kEcho:
                log('ECHO: ');
                log(item[kPayload]);

                break;
            default:
                log('ERROR: no mapping for action "' + action + '"');
        }
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
     * Find a place to append the widget UI.
     */
    function getWidgetAnchor() {
        log('o->getWidgetAnchor()');

        var div = null;

        // divs is a "live" node list
        var divs = document.getElementsByTagName(kDiv);
        var len = divs.length;
        var i   = 0;

        for (i = 0; i < len; i++) {
            div = divs[i];

            if (div.hasAttribute(kWidgetAnchor)) {
                log(':');
                log(div);

                return div;
            }
        }

        log(':');
        log(null);

        return null;
    }

    /*
     * Does the actual rendering.
     */
    function renderWidget(container, html) {
        log('o->renderWidget(');
        log(container);
        log(html);
        log(')');

        if (!container) {
            return;
        }

        container.innerHTML = html;
    }

    /*
     * Fires _wdAsyncInit if there's such a function defined
     * by the publisher.
     */
    var fireAsyncInit = function() {
        if(window[kAsyncInitDelegate]) {
            window[kAsyncInitDelegate]();
        }

        fireAsyncInit = noop;
    };

    /*
     * Processes the job queue item by item.
     */
    var processQueue = function() {
        log('o->processQueue()');

        setReadyState(kBeginProcessQueue);

        var q = null;

        if (window[kWidgetQueueAlias] &&
                    o2.Validation.isArray(window[kWidgetQueueAlias])) {
            q = window[kWidgetQueueAlias];

            while (q.length) {
                execute(q.pop());
            }
        }

        processQueue = noop;
    };

    /*
     * User login JSONP callback.
     */
    function processUserLogin(response) {
        var div = getWidgetAnchor();
        div.innerHTML = response.data;
    }

    /*
     * Global event handler on document's click event.
     */
    function document_click(evt) {
        log('document_click()');

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
                o2.String.concat(kApiRoot, kLoginPath),
                params,
                processUserLogin
            );
        }
    }

    /*
     * Use event delegation to bind widget events.
     */
    function delegateEvents() {
        log('o->delegateEvents()');

        o2.Event.addEventListener(document, kClick, document_click);
    }

    /*
     * Things done after the initial view is rendered.
     */
    function processPostRenderActions() {
        delegateEvents();

        processQueue();

        window[kWidgetQueueAlias] = queue;

        setReadyState(kComplete);

        fireAsyncInit();
    }

    /*
     * Renders the widget
     */
    function render(state) {
        log('o->render(');
        log(state);
        log(')');

        var div = getWidgetAnchor();

        if (!div) {
            return;
        }

        o2.Dom.loadCss(
            o2.String.concat(kApiRoot, kCssPath),
            function() {
                renderWidget(div, state.data);

                processPostRenderActions();
            }
        );
    }

    /*
     * Fired when initial widget state is ready.
     */
    function processPostInitialization(state) {
        log('o->processPostInitialization(');
        log(state);
        log(')');

        setReadyState(kBeginRender);

        render(state);
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

        config[kGuid] = o2.String.generateGuid();

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
            'o2.jsonp.core.js',
            'o2.dom.constants.js',
            'o2.dom.core.js',
            'o2.dom.load.js',
            'o2.event.constants.js',
            'o2.event.core.js',
            'o2.validation.core.js',
            'o2.method.core.js',
            'o2.collection.core.js'
        ], callback);
    }

    //
    // "Widget Initialization Flow" starts down below:
    //

    checkForUpdates(versionTimestamp);
    loadDependencies(initialize);
}(this, this.document, true));
