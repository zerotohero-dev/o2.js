/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-15 15:16:36.626954
 * -->
 */
(function(window, isDebugMode) {
    'use strict';

    /*
     * Should match beacon version.
     */
    var version = 'v.0.1';

    /*
     *
     */
    //TODO: move this to an API module.
    function isArray(item) {
        return window._wd_o2.isArray(item);
    }

    /*
     *
     */
    var log = function(stuff) {
        if (!!isDebugMode && !!window.console) {
            log = function(stuff) {
                window.console.log(stuff);
            };

            log(stuff);

            return;
        }

        log = function() {};
    };

    // TODO: ensure that this should have a long expires header.

    // TODO:
    //     async request to a beacon.js (will have nocache,must-revalidate
    //     cache control headers)

    /*
     *
     */
    function checkForUpdates() {
        log('o->checkForUpdates()');
    }

    /*
     *
     */
    function render() {
        log('o->render()');
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

        processQueue = window._wd_o2.nill;
    }

    /*
     * Fired when initial widget state is ready.
     */
    function initialState_ready(state) {
        log('o->initialState_ready()');

        render(state);

        processQueue();

        window._wdq = queue;
    }

    /*
     * Loads initial widget state from the server.
     */
    function loadInitialState(config, callback) {
        config = null;

        log('o->loadInitialState()');

        callback({});
    }

    /*
     * Get widget configuration from DOM.
     */
    function getConfiguration() {
        log('o->getConfiguration()');

        return {};
    }

    /*
     * Initialize after loading prerequisites.
     */
    function initialize() {
        log('o->loadInitialState()');

        var config = getConfiguration();

        loadInitialState(config, initialState_ready);
    }

    var scriptQueue = [];

    var createElement = document.createElement;
    var getElementsByTagName = document.getElementsByTagName;
    var kScript = 'script';
    var kHead = 'head';
    var kScriptType = 'text/javascript';

    function loadScript(src) {
        var s = createElement(kScript);
        var x = getElementsByTagName(kScript)[0] ||
            getElementsByTagName(kHead)[0];

        s.type = kScriptType;
        s.async = true;
        s.src = src;

        x.parentNode.insertBefore(s, x);

        s.onreadystatechange = function() {
            if(kCompleteRegExp.test(s.readyState)) {
                callback();
            }
        };

        s.onload = function() {
            callback();
        };
    }

    function loadScripts(ar) {
        scriptQueue = ar;

        loadScript(scriptQueue.pop());
    }

    /*
     * Load necessary o2.js components in noConflict mode.
     */
    function getPrerequisites(callback) {
        log('o->getPrerequisites()');

        callback();
    }

    checkForUpdates(version);
    getPrerequisites(initialize);
}(this, true));
