define([
    '../../core'
], function(
    o2
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * core
         */
        nill = o2.nill,

        /*
         * # Common Constants
         */

        kCheckIntervalMs = 50,
        kDomContentLoaded = 'DOMContentLoaded',
        kLoad = 'load',
        kOnLoad = 'onload',
        kOnReadyStateChange = 'onreadystatechange',
        kPropertyToCheck = 'left',

        /*
         * # Common Regular Expressions
         */

        kDomLoadedRegExp = /^loade|c/,

        /*
         *
         */
        isDomContentReady = function() {
            return (kDomLoadedRegExp).test(document.readyState);
        },

        /*
         * # State
         */

        isApplicationReady = isDomContentReady(),
        readyQueue = [],

        /*
         * # Private Static Helper Methods
         */

        /*
         *
         */
        flushReadyQueue = function() {
            isApplicationReady = true;

            while (readyQueue.length > 0) {

                // An error in the ready queue should
                // not prevent the remaining actions from firing
                try {
                    readyQueue.pop()();
                } catch(ignore) {}
            }
        },

        /*
         * DOM Content ready check for MSIE.
         * http://javascript.nwbox.com/IEContentLoaded/
         */
        checkScrollLeft = function() {
            try {
                document.documentElement.doScroll(kPropertyToCheck);
            } catch(e) {
                setTimeout(checkScrollLeft, kCheckIntervalMs);

                return;
            }

            flushReadyQueue();

            checkScrollLeft = nill;
        },

        /*
         *
         */
        onMozDomContentLoaded = function() {
            document.removeEventListener(kDomContentLoaded,
                onMozDomContentLoaded, false);

            flushReadyQueue();

            onMozDomContentLoaded = nill;
        },

        /*
         *
         */
        onMozWindowLoad = function() {
            document.removeEventListener(kLoad, onMozWindowLoad, false);

            flushReadyQueue();

            onMozWindowLoad = nill;
        },

        /*
         *
         */
        onIEDomContentLoaded = function() {
            if (!isDomContentReady()) {return;}

            document.detachEvent(kOnReadyStateChange, onIEDomContentLoaded);

            flushReadyQueue();

            onIEDomContentLoaded = nill;
        },

        /*
         *
         */
        onIEWindowLoaded = function() {
            window.detachEvent(kOnLoad, onIEWindowLoaded);

            flushReadyQueue();

            onIEDomContentLoaded = nill;
        },

        /*
         * # To Be Overridden
         */

        bindReadyListeners = nill;


    if (document.addEventListener) {

        // Mozilla, Opera, Webkit
        bindReadyListeners = function() {

            //Listen to native on dom content loaded event.
            document.addEventListener(kDomContentLoaded, onMozDomContentLoaded,
                false);

            //Worst-case fall-back
            window.addEventListener(kLoad, onMozWindowLoad, false);

            //Do not process further calls.
            bindReadyListeners = nill;
        };
    } else if (document.attachEvent) {

        // MSIE
        bindReadyListeners = function() {

            // Listen to ready state change.
            document.attachEvent(kOnReadyStateChange, onIEDomContentLoaded);

            // Worst-case fall-back
            window.attachEvent(kOnLoad, onIEWindowLoaded);

            // If the document is not an IFRAME then ready state has no use,
            var isIframe = window.self !== window.top;

            // so apply an alternative trick.
            if (!isIframe) {
                checkScrollLeft();
            }

            // Do not process further calls.
            bindReadyListeners = nill;
        };
    } else {

        // Fall-back for really archaic browsers.
        bindReadyListeners = function() {
            var cached = window.onload || nill;

            window.onload = function(e) {
                flushReadyQueue();
                cached(e);
            };

            // Do not process further calls.
            bindReadyListeners = nill;
        };
    }

    exports.ready = function(delegate) {

        // if DOM is ready, execute the delegate immediately.
        if (isApplicationReady) {
            delegate();

            return;
        }

        // Otherwise, check for the DOM's ready state.
        bindReadyListeners();

        // this queue will be processed "only once" after DOM is ready.
        readyQueue.push(delegate);
    };

    return exports;
});
