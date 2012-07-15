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
    function processQueue() {
        log('o->processQueue()');

        var q = null;

        if (window._wdq && isArray(window._wdq)) {
            q = window._wdq;

            while (q.length) {
                execute(q.pop());
            }
        }

        window._wdq = queue;
    }

    /*
     * Fired when initial widget state is ready.
     */
    function initialState_ready(state) {
        log('o->initialState_ready()');

        render(state);

        processQueue();
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
