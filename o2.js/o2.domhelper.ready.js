/**
 * @module domhelper.ready
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A helper to fire events when the <code>DOM</code> content is loaded.</p>
 */
(function(framework, window, document, setTimeout) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.DomHelper;
    var nill = framework.nill;

    /*
     * Module configuration.
     */
    var config = {

        /*
         *
         */
        constants : {

            /*
             *
             */
            regExp : {
                REG_DOM_LOADED : /^loade|c/
            }

        }

    };

    /*
     * Common regular expressions.
     */
    var kDomLoadedRegExp = config.constants.regExp.REG_DOM_LOADED;

    /*
     * Common constants.
     */
    var kCheckIntervalMs = 50;
    var kPropertyToCheck = 'left';
    var kDomContentLoaded = 'DOMContentLoaded';
    var kLoad = 'load';
    var kOnReadyStateChange = 'onreadystatechange';
    var kOnLoad = 'onload';

    /*
     *
     */
    function isDomContentReady() {
        return (kDomLoadedRegExp).test(document.readyState);
    }

    /*
     * State.
     */
    var state = {
        isApplicationReady : isDomContentReady(),
        readyQueue : []
    };

    /*
     * Common collections.
     */
    var queue = state.readyQueue;

    /*
     *
     */
    function flushReadyQueue() {
        state.isApplicationReady = true;

        while (queue.length > 0) {
            queue.pop()();
        }
    }

    /*
     * DOM Content ready check for MSIE.
     * http://javascript.nwbox.com/IEContentLoaded/
     */
    var checkScrollLeft = function() {
        try {
            document.documentElement.doScroll(kPropertyToCheck);
        } catch(e) {
            setTimeout(checkScrollLeft, kCheckIntervalMs);

            return;
        }

        flushReadyQueue();

        checkScrollLeft = nill;
    };

    var onMozDomContentLoaded = function() {
        document.removeEventListener(kDomContentLoaded, onMozDomContentLoaded,
            false);

        flushReadyQueue();

        onMozDomContentLoaded = nill;
    };

    var onMozWindowLoad = function() {
        document.removeEventListener(kLoad, onMozWindowLoad, false);

        flushReadyQueue();

        onMozWindowLoad = nill;
    };

    var onIEDomContentLoaded = function() {
        if (!isDomContentReady()) {
            return;
        }

        document.detachEvent(kOnReadyStateChange, onIEDomContentLoaded);

        flushReadyQueue();

        onIEDomContentLoaded = nill;
    };

    var onIEWindowLoaded = function() {
        window.detachEvent(kOnLoad, onIEWindowLoaded);

        flushReadyQueue();

        onIEDomContentLoaded = nill;
    };

    var bindReadyListeners = function() {

        // Mozilla, Opera, webkit
        if (document.addEventListener) {

            //Listen to native on dom conten loaded event.
            document.addEventListener(kDomContentLoaded, onMozDomContentLoaded, false);

            //Worst-case fallback
            window.addEventListener(kLoad, onMozWindowLoad, false);

            //Do not process further calls.
            bindReadyListeners = nill;

            return;
        }

        // MSIE
        if (document.attachEvent) {

            // Listen to ready state change.
            document.attachEvent(kOnReadyStateChange, onIEDomContentLoaded);

            // Worst-case fallback
            window.attachEvent(kOnLoad, onIEWindowLoaded);

            // If the document is not an IFRAME then ready state has no use,
            var isIframe = window.self !== window.top;

            // so apply an alternative trick.
            if (!isIframe) {
                checkScrollLeft();
            }

            // Do not process further calls.
            bindReadyListeners = nill;

            return;
        }
    };

    /**
     * @function {static} o2.DomHelper.ready
     *
     * <p>Fires when the <code>HTML DOM</code> is ready.</p>
     *
     * @param {Function} delegate - the callback that's called when the DOM is
     * ready.
     */
    me.ready = function(delegate) {

        // if DOM is ready, execute the delegate immediately.
        if (state.isApplicationReady) {
            delegate();

            return;
        }

        // Otherwise, check for the DOM's ready state.
        bindReadyListeners();

        // this queue will be processed "only once" after DOM is ready.
        state.readyQueue.push(delegate);
    };
}(this.o2, this, this.document, this.setTimeout));
