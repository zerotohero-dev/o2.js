define([
], function(
) {
    'use strict';

        /*
         * # Module Exports
         */

    var  exports = {},

        /*
         * # Common Constants
         */

        kNoTimeoutMetaData =
            'Please specify timeout meta data for the observers';

    /*
     *
     */
    function timeoutObservers(self, observers) {
        var i = 0,
            len = 0,
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
        var i = 0,
            len = 0,
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
            now = (new Date()).getTime(),
            observers = getObservers(stateObject),
            state = getState(stateObject),
            unregisterQueue = [],
            len = observers.length,
            i,
            meta,
            observer,
            shouldNotifyObserver,
            registrationTime,
            timeout;

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

    exports.addObserver = function(observer) {
        if (hasObserver(this, observer)) {return;}

        var observers = getObservers(this);

        observers.push({
            object : observer,
            meta : {
                registrationTime : (new Date()).getTime(),
                timeout : (observer.timeout || null)
            }
        });
    };

    exports.countObservers = function() {
        return getObservers(this).length;
    };

    exports.deleteObserver = function(observer) {
        var observers = getObservers(this),
            i,
            len;

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
    };

    exports.deleteObservers = function() {
        getObservers(this).length = 0;
    };

    exports.init = function() {

        // We use implicit this, instead of explicitly using
        // o2.AjaxState.protecteds.listen, because o2.JsonpState inherits
        // o2.AjaxState, and in o2.JsonpState this refers to o2.JsonpState.
        listen(this);
    };

    exports.timeoutObservers = function(observers) {
        timeoutObservers(this, observers);
    };

    exports.timeoutAllObservers = function() {
        timeoutObservers(this, getObservers(this));
    };

    exports.protecteds = {
        config: {
            LISTEN_TIMEOUT: 1000
        },


        state: {
            listenTimeoutId: null
        },

        observers: []
    };

    return exports;
});
