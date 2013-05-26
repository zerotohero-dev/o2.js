/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp) {
    'use strict';

    /**
     * @module   ajaxstate.core
     *
     * @requires core
     *
     * <p>a model for controlling ajax timeouts etc.</p>
     * <p>an {@link o2.AjaxController} should be registered to this model.</p>
     */
    fp.ensure(
        'ajaxstate.core',
    [
        'core'
    ]);

    var attr   = fp.getAttr,
        create = attr(fp, 'create'),
        def    = attr(fp, 'define'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'AjaxState',

        /**
         * @class {static} o2.AjaxState
         * @implements Observable
         *
         * <p>A <code>Model</code> for the available
         * <code>AjaxController</code> objects.</p>
         * <p>Implements the <code>Observable</code> interface.</p>
         *
         * <p>See
         * http://download.oracle.com/javase/1.4.2/docs/api/java/
         * util/Observable.html
         * </p>
         */
        me = create(kModuleName),

        /*
         * # Common Constants
         */

        kNoTimeoutMetaData =
            'Please specify timeout meta data for the observers';

    /*
     *
     */
    function timeoutObservers(self, observers) {
        var i        = 0,
            len      = 0,
            observer = null;

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
    function getSelfProtecteds(self, key) {
        return attr(getProtecteds(self), key);
    }

    /*
     *
     */
    function getConfig(self) {
        return getSelfProtecteds(self, 'config');
    }

    /*
     *
     */
    function getState(self) {
        return getSelfProtecteds(self, 'state');
    }

    /*
     *
     */
    function getObservers(self) {
        return getSelfProtecteds(self, 'observers');
    }

    /*
     *
     */
    function hasObserver(self, observer) {
        var i         = 0,
            len       = 0,
            observers = getObservers(self);

        for (i = 0, len = observers.length; i < len; i++) {
            if (observer.object === observers[i]) {return true;}
        }

        return false;
    }

    /*
     *
     */
    function listen(stateObject) {
        var config = getConfig(stateObject),
            meta   = null,
            now    = (new Date()).getTime(),

            observer  = null,
            observers = getObservers(stateObject),
            i         = 0,
            len       = observers.length,

            registrationTime     = null,
            shouldNotifyObserver = false,
            state                = getState(stateObject),
            timeout              = null,
            unregisterQueue      = [];

        if (!len) {
            clearTimeout(state.listenTimeoutId);

            state.listenTimeoutId = setTimeout(function() {
                listen(stateObject);
            }, config.LISTEN_TIMEOUT);

            return;
        }

        for (i = 0; i < len; i++) {
            observer         = observers[i];
            meta             = observer.meta;
            timeout          = meta.timeout;
            registrationTime = meta.registrationTime;

            if (!timeout) {throw kNoTimeoutMetaData;}

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

        // TODO:
        // setTimeout(function(){common.deferred.resolve();}}, LISTEN_TIMEOUT);
        // return common.deferred;
        // 
        // listen().then(exports.init)
    }

    /**
     * @function {protected static} o2.AjaxState.addObserver
     *
     * <p>An implementation of the <code>Observer.addObserver</code>
     * method.</p>
     * <p>Registers an <code>Observer</code>.</p>
     *
     * <p>This method is <strong>protected</strong>, in a sense that it's not
     * meant to be called directly. {@link o2.AjaxController} and
     * {@link o2.JsonpController} use it indirectly to register themselves.</p>
     *
     * @param {Object} observer - the <code>Observer</code> to register.
     */
    exports.addObserver = def(me, 'addObserver', function(observer) {

        //!
        // acquire(me, this, 'observer');
        if (hasObserver(this, observer)) {return;}

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
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var count = o2.AjaxState.countObservers();
     * </pre>
     *
     * @return the number of registered <code>Observer</code>s.
     */
    exports.countObservers = def(me, 'countObservers', function() {
        return getObservers(this).length;
    });

    /**
     * @function {protected static} o2.AjaxState.deleteObserver
     *
     * <p>An implementation of the <code>Observer.deleteObserver</code>
     * method.</p>
     * <p>Removes an <code>Observer</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <p>This method is <strong>protected</strong>, in a sense that it's not
     * meant to be called directly. {@link o2.AjaxController} and
     * {@link o2.JsonpController} use it indirectly to unregister
     * themselves.</p>
     *
     * @param {Object} observer - the <code>Observer</code> to remove.
     */
    exports.deleteObserver = def(me, 'deleteObserver', function(observer) {
        var i         = 0,
            len       = 0,
            observers = getObservers(this);

        // This is an already-deleted zombie object.
        // No need for further processing.
        if (observer.isDeleted) {return true;}

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
     * <p>Unregisters all of the registered <code>Observer</code>s.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.AjaxController.deleteObservers();
     * </pre>
     *
     */
    exports.deleteObservers = def(me, 'deleteObservers', function() {
        getObservers(this).length = 0;
    });

    /**
     * @function {static} o2.AjaxState.init
     *
     * <p>Initializes the <strong>object</strong> and starts notifying
     * registered <strong>observer</strong>s.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.AjaxState.init();
     * </pre>
     *
     */
    exports.init = def(me, 'init', function() {

        // We use implicit this, instead of explicitly using
        // o2.AjaxState.protecteds.listen, because o2.JsonpState inherits
        // o2.AjaxState, and in o2.JsonpState this refers to o2.JsonpState.
        listen(this);
    });

    /**
     * @function {protected static} o2.AjaxState.timeoutObservers
     *
     * <p>Sends a timeout request and unregisters the given
     * <code>Observer</code>s.</p>
     *
     * <p>This method is <strong>protected</strong>, in a sense that it's not
     * meant to be called directly. {@link o2.AjaxController} and
     * {@link o2.JsonpController} use it indirectly to timeout
     * themselves.</p>
     *
     * @param {Array} observers - A collection of {@link AjaxController}
     * objects.
     */
    exports.timeoutObservers = def(me, 'timeoutObservers',
                function(observers) {
        timeoutObservers(this, observers);
    });

    /**
     * @function {static} o2.AjaxState.timeoutAllObservers
     *
     * <p>Sends a timeout request and unregisters all registered
     * <code>Observer</code>s.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.AjaxState.timeoutAllObservers();
     * </pre>
     *
     */
    exports.timeoutAllObservers = def(me, 'timeoutAllObservers', function() {
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
}(this.o2, this.o2.protecteds));

