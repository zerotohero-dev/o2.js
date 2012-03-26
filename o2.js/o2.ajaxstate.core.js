/**
 * @module   ajaxstate
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-15 09:36:16.648952
 * -->
 *
 * <p>A Model for controlling AJAX timeouts etc.</p>
 * <p>An {@link AjaxController} should be registered to this model.</p>
 */
(function(framework, window) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');

    /*
     * Module Name
     */
    var kModuleName = 'AjaxState';

    /**
     * @class {static} o2.AjaxState
     * @implements Observable
     *
     * <p>A <code>Model</code> for the available <code>AjaxController</code>
     * objects.</p>
     * <p>Implements the <code>Observable</code> interface.</p>
     *
     * <p>See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observable.html</p>
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */
    var setTimeout   = attr(window, 'setTimeout');
    var clearTimeout = attr(window, 'clearTimeout');

    /*
     * Common Constants
     */
    var kNoTimeoutMetaData = 'Please specify timeout meta data for the observer';

    /*
     *
     */
    function timeoutObservers(self, observers) {
        var observer = null;
        var i = 0;
        var len = 0;

        for (i = 0, len = observers.length; i < len; i++) {
            observer = observers[i].object;

            observer.update(self, {isTimedOut : true});
        }
    }

    /*
     *
     */
    function getProtecteds(self) {
        return attr(self, 'protecteds');
    }

    /*
     *
     */
    function getConfig(self) {
        return attr(getProtecteds(self), 'config');
    }

    /*
     *
     */
    function getState(self) {
        return attr(getProtecteds(self), 'state');
    }

    /*
     *
     */
    function getObservers(self) {
        return attr(getProtecteds(self), 'observers');
    }

    /*
     *
     */
    function hasObserver(self, observer) {
        var observers = getObservers(self);
        var i = 0;
        var len = 0;

        for (i = 0, len = observers.length; i < len; i++) {
            if (observer.object === observers[i]) {
                return true;
            }
        }

        return false;
    }

    /*
     *
     */
    function listen(stateObject) {
        var observer = null;
        var meta = null;
        var timeout = null;
        var registrationTime = null;
        var shouldNotifyObserver = false;
        var unregisterQueue = [];

        var observers = getObservers(stateObject);
        var config = getConfig(stateObject);
        var state = getState(stateObject);

        var now = (new Date()).getTime();

        var i = 0;
        var len = observers.length;

        if (!len) {
            clearTimeout(state.listenTimeoutId);

            state.listenTimeoutId = setTimeout(function() {
                listen(stateObject);
            }, config.LISTEN_TIMEOUT);

            return;
        }

        for (i = 0; i < len; i++) {
            observer = observers[i];
            meta = observer.meta;
            timeout = meta.timeout;
            registrationTime = meta.registrationTime;

            if (!timeout) {
                throw kNoTimeoutMetaData;
            }

            shouldNotifyObserver = (now - registrationTime > timeout);

            if (shouldNotifyObserver) {

                // "These are not the droids you're looking for.";
                // unregister 'em.
                unregisterQueue.push(observer);
            }
        }

        timeoutObservers(stateObject, unregisterQueue);

        clearTimeout(state.listenTimeoutId);

        state.listenTimeoutId = setTimeout(function() {
            listen(stateObject);
        }, config.LISTEN_TIMEOUT);
    }

    /**
     * @function {static} o2.AjaxState.addObserver
     *
     * <p>An implementation of the <code>Observer.addObserver</code>
     * method.</p>
     * <p>Registers an <code>Observer</code>.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} observer - the <code>Observer</code> to register.
     */
    def(me, 'addObserver', function(observer) {

        //!
        // acquire(me, this, 'observer');
        if (hasObserver(this, observer)) {
            return;
        }

        var observers = getObservers(this);

        observers.push({
            object : observer,
            meta : {
                registrationTime : (new Date()).getTime(),
                timeout : (observer.timeout || null)
            }
        });
    });

    /**
     * @function {static} o2.AjaxState.countObservers
     *
     * <p>An implementation of the <code>Observer.countObservers</code>
     * method.</p>
     * <p>Gets the <code>Observer</code> count.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return the number of registered <code>Observer</code>s.
     */
    def(me, 'countObservers', function() {
        return getObservers(this).length;
    });

    /**
     * @function {static} o2.AjaxState.deleteObserver
     *
     * <p>An implementation of the <code>Observer.deleteObserver</code>
     * method.</p>
     * <p>Removes an <code>Observer</code>.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} observer - the <code>Observer</code> to remove.
     */
    def(me, 'deleteObserver', function(observer) {
        var observers = getObservers(this);
        var i = 0;
        var len = 0;

        // This is an already-deleted zombie object.
        // No need for further processing.
        if (observer.isDeleted) {
            return true;
        }

        for (i = 0, len = observers.length; i < len; i++) {
            if (observer === observers[i].object) {
                observers.splice(i, 1).isDeleted = true;

                return true;
            }
        }

        return false;
    });

    /**
     * @function {static} o2.AjaxState.deleteObservers
     *
     * <p>An implementation of the <code>Observer.deleteObservers</code>
     * method.</p>
     * <p>Unregisteres all of the registered <code>Observer</code>s.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     */
    def(me, 'deleteObservers', function() {
        getObservers(this).length = 0;
    });

    /**
     * @function {static} o2.AjaxState.init
     *
     * <p>Initializes the <strong>object</strong> and starts notifying
     * registered <strong>observer</strong>s.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     */
    def(me, 'init', function() {

        // We use implicit this, instead of explicity using
        // o2.AjaxState.protecteds.listen, because o2.JsonpState inherits
        // o2.AjaxState, and in o2.JsonpState this refers to o2.JsonpState.
        listen(this);
    });

    /**
     * @function {static} o2.AjaxState.timeoutObservers
     *
     * <p>Sends a timeout request and unregisters the given
     * <code>Observer</code>s.</p>
     *
     * @param {Array} observers - A collection of {link AjaxController}
     * objects.
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     */
    def(me, 'timeoutObservers', function(observers) {
        timeoutObservers(this, observers);
    });

    /**
     * @function {static} o2.AjaxState.timeoutAllObservers
     *
     * <p>Sends a timeout request and unregisters all registered
     * <code>Observer</code>s.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     */
    def(me, 'timeoutAllObservers', function() {
        timeoutObservers(this, getObservers(this));
    });

    /**
     *
     */
    def(me, 'protecteds', {

        /**
         * @struct {protected readonly} o2.AjaxState.protecteds.config
         *
         * <p>Module configuration.</p>
         */
        config : {
            LISTEN_TIMEOUT : 1000
        },

        /**
         * @struct {protected readonly} o2.AjaxState.state
         *
         * <p>Internal state.</p>
         */
        state : {
            listenTimeoutId : null
        },

        /**
         * @property {protected readonly Array}
         * o2.AjaxState.observers
         *
         * <p>A collection of the registered <code>Observer</code>s.</p>
         */
        observers : []
    });
}(this.o2, this));
