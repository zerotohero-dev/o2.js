/**
 * @module ajaxstate
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-26 08:30:47.431820
 * -->
 *
 * <p>A Model for controlling AJAX timeouts etc.</p>
 * <p>An {@link AjaxController} should be registered to this model.</p>
 */
(function(framework, window) {
    'use strict';

    //*

    /*
     * Aliases
     */
    var me           = framework;
    var setTimeout   = window.setTimeout;
    var clearTimeout = window.clearTimeout;

    /*
     * Common string constants.
     */
    var kNoTimeoutMetaData = 'Please specify timeout meta data for the observer';

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
    me.AjaxState = {

        /**
         * @function {static} o2.AjaxState.init
         *
         * <p>Initializes the <strong>object</strong> and starts notifying
         * registered
         * <strong>observer</strong>s.</p>
         */
        init : function() {
            // We use implicit this, instead of explicity using
            // o2.AjaxState.protecteds.listen, because o2.JsonpState inherits
            // o2.AjaxState, and in o2.JsonpState this refers to o2.JsonpState.
            this.protecteds.listen(this);
        },

        /**
         * @function {static} o2.AjaxState.addObserver
         *
         * <p>An implementation of the <code>Observer.addObserver</code>
         * method.</p>
         * <p>Registers an <code>Observer</code>.</p>
         *
         * @param {Object} observer - the <code>Observer</code> to register.
         */
        addObserver : function(observer) {
            var protecteds = this.protecteds;
            var hasObserver = protecteds.hasObserver;

            //!
            if (hasObserver.apply(protecteds, [observer])) {
                return;
            }

            var observers = protecteds.observers;

            observers.push({
                object : observer,
                meta : {
                    registrationTime : (new Date()).getTime(),
                    timeout : (observer.timeout || null)
                }
            });
        },

        /**
         * @function {static} o2.AjaxState.deleteObserver
         *
         * <p>An implementation of the <code>Observer.deleteObserver</code>
         * method.</p>
         * <p>Removes an <code>Observer</code>.</p>
         *
         * @param {Object} observer - the <code>Observer</code> to remove.
         */
        deleteObserver : function(observer) {
            var observers = this.protecteds.observers;
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
        },

        /**
         * @function {static} o2.AjaxState.countObservers
         *
         * <p>An implementation of the <code>Observer.countObservers</code>
         * method.</p>
         * <p>Gets the <code>Observer</code> count.</p>
         *
         * @return the number of registered <code>Observer</code>s.
         */
        countObservers : function() {
            return this.protecteds.observers.length;
        },

        /**
         * @function {static} o2.AjaxState.deleteObservers
         *
         * <p>An implementation of the <code>Observer.deleteObservers</code>
         * method.</p>
         * <p>Unregisteres all of the registered <code>Observer</code>s.</p>
         */
        deleteObservers : function() {
            this.protecteds.observers.length = 0;
        },

        /**
         * @function {static} o2.AjaxState.timeoutObservers
         *
         * <p>Sends a timeout request and unregisters the given
         * <code>Observer</code>s.</p>
         *
         * @param {Array} observers - A collection of {link AjaxController}
         * objects.
         * @param {Object} data - the data to pass to the <code>Observer</code>s.
         */
        timeoutObservers : function(observers, data) {
            var observer = null;
            var i = 0;
            var len = 0;

            for (i = 0, len = observers.length; i < len; i++) {
                observer = observers[i].object;

                observer.update(this, {
                    isTimedOut : true,
                    data : data
                });
            }
        },

        /**
         * @function {static} o2.AjaxState.timeoutAllObservers
         *
         * <p>Sends a timeout request and unregisters all registered
         * <code>Observer</code>s.</p>
         *
         * @param {Object} data - the data to pass to the <code>Observer</code>s.
         */
        timeoutAllObservers : function(data) {
            this.timeoutObservers(this.protecteds.observers, data);
        },

        /**
         *
         */
        protecteds : {

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
            observers : [],

            /**
             * @function {static protected} o2.AjaxState.protecteds.hasObserver
             *
             * <p>This method is protected, don't call it from outside.</p>
             */
            hasObserver : function(observer) {

                // static scope:*
                //
                // That is to say, this method (and all other static methods in
                // here) will see the scope of this closure
                //     (function(framework, window) { ... }
                //
                // Extending them via
                //
                //      NewClass.hasObserver = AjaxState.hasObserver
                //
                // or even using
                //
                //     NewClass.hasObserver = MethodHelper.clone(NewClass,
                //     AjaxState.hasObserver);
                //
                // will not change this fact.
                //
                // So we use a protecteds.observers member and override it in
                // o2.JsonpState, instead of using a private protecteds
                // instance, which will incorrectly be share among o2.JsonpState
                // and o2.AjaxState

                var observers = this.protecteds.observers;
                var i = 0;
                var len = 0;

                for (i = 0, len = observers.length; i < len; i++) {
                    if (observer.object === observers[i]) {
                        return true;
                    }
                }

                return false;
            },

            /**
             * @function {static protected} o2.AjaxState.protecteds.listen
             *
             * <p>This method is protected, don't call it from outside.</p>
             *
             * Works somewhat similar to the <code>notifyObservers</code>
             * method in the <code>Observer</code> pattern.
             */
            listen : function(stateObject) {
                var observer = null;
                var meta = null;
                var timeout = null;
                var registrationTime = null;
                var shouldNotifyObserver = false;
                var unregisterQueue = [];

                var observers = stateObject.protecteds.observers;
                var config = stateObject.protecteds.config;
                var state = stateObject.protecteds.state;
                var listen = stateObject.protecteds.listen;

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

                stateObject.timeoutObservers(unregisterQueue);

                clearTimeout(state.listenTimeoutId);

                state.listenTimeoutId = setTimeout(function() {
                    stateObject.protecteds.listen(stateObject);
                }, config.LISTEN_TIMEOUT);
            }
        }
    };
}(this.o2, this));
