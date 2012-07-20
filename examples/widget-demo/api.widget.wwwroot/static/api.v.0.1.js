/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-20 16:22:20.527709
 * -->
 */
(function(window, document, isDebugMode) {
    'use strict';

    if (window._wd) {
        return;
    }

    window._wd = {};

    /*
     * Should match beacon version timestamp.
     */
    var versionTimestamp = '20120720135547909116';

    //window._wd.versionTimestamp = versionTimestamp;

    var scriptQueue = [];

    /*
     * Common Constants
     */
    var kAnd            = '&';
    var kApiRoot        = 'http://api.widget.www/';
    var kBeacon         = 'api/v.0.1/beacon';
    var kCompleteRegExp = /loaded|complete/;
    var kEmpty          = '';
    var kEquals         = '=';
    var kHead           = 'head';
    var kO2Root         = 'http://api.widget.www/lib/o2.js/';
    var kQuery          = '?';
    var kRevision       = 'r';
    var kScript         = 'script';
    var kScriptType     = 'text/javascript';
    var kVersion        = 'v';

    /*
     *
     */
    //TODO: move this to an API module.
    function isArray(item) {
        return window._wd_o2.isArray(item);
    }

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

    /*
     *
     */
    function insertScript(root, src) {
        var s = document.createElement(kScript);
        var x = document.getElementsByTagName(kScript)[0] ||
            document.getElementsByTagName(kHead)[0];

        s.type = kScriptType;
        s.async = true;
        s.src = [root, src].join(kEmpty);

        x.parentNode.insertBefore(s, x);

        return s;
    }

    /*
     *
     */
    function checkForUpdates() {
        log('o->checkForUpdates()');

window.alert('before load');
        insertScript(kApiRoot, [kBeacon, kQuery,
            kVersion,  kEquals, versionTimestamp , kAnd,
            kRevision, kEquals, (new Date()).getTime()
        ].join(kEmpty), noop);
window.alert('after load');
    }

    /*
     *
     */
    function render() {
        log('o->render()');
        window.console.warn('IMPLEMENT render()');
    }

    /*
     *
     */
    function execute() {
        log('o->execute()');
    }

    /*
     *
     */
    var queue = {
        items : [],

        push : function(item) {
            log('o->queue.push()');

            execute(item);
        }
    };

    /*
     *
     */
    var processQueue = function() {
        log('o->processQueue()');

        var q = null;

        if (window._wdq && isArray(window._wdq)) {
            q = window._wdq;

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

        render(state);

        processQueue();

        window._wdq = queue;
    }

    /*
     * Loads initial widget state from the server.
     */
    function loadInitialState(config, callback) {
        log('o->loadInitialState(');
        log(config);
        log(callback);
        log(')');

        config = null;
        callback({});
    }

    /*
     * Get widget configuration from DOM.
     */
    function getConfiguration() {
        log('o->getConfiguration()');

        window.console.warn('get widget configuration from DOM');

        return {};
    }

    /*
     * Initialize after loading prerequisites.
     */
    function initialize() {
        log('o->initialize()');

        var config = getConfiguration();

        loadInitialState(config, processPostInitialization);
    }

    /*
     *
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
     *
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
     *
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
    function getPrerequisites(callback) {
        log('o->getPrerequisites(');
        log(callback);
        log(')');

        loadScripts(kO2Root, [
            'o2.meta.js',
            'o2.core.js'
        ], callback);
    }

    checkForUpdates(version);
    getPrerequisites(initialize);
}(this, this.document, true));