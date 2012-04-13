/**
 * @module   dom.ready
 * @requires core
 * @requires dom.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-04-13 18:07:16.712860
 * -->
 *
 * <p>A helper to fire events when the <code>DOM</code> content is loaded.</p>
 */

(function(framework, window, document, undefined) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'Dom';

    /*
     * Dom (ready)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var nill       = require('nill');

    var setTimeout = attr(window, 'setTimeout');

    /*
     * Common Constants
     */
    var kCheckIntervalMs    = 50;
    var kDomContentLoaded   = 'DOMContentLoaded';
    var kLoad               = 'load';
    var kOnLoad             = 'onload';
    var kOnReadyStateChange = 'onreadystatechange';
    var kPropertyToCheck    = 'left';

    /*
     * Common Regular Expressions
     */
    var kDomLoadedRegExp = /^loade|c/;

    /*
     *
     */
    function isDomContentReady() {
        return (kDomLoadedRegExp).test(document.readyState);
    }

    /*
     * State
     */
    var isApplicationReady = isDomContentReady();
    var readyQueue         = [];

    /*
     *
     */
    function flushReadyQueue() {
        isApplicationReady = true;

        while (readyQueue.length > 0) {

            // An error in the ready queue should
            // not prevent the remaining actions from firing
            try {
                readyQueue.pop()();
            } catch(ignore) {
            }
        }

        // undocumented!
        // A flag to set that the framework is ready and responsive.
        me.isReady = true;
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

    /*
     *
     */
    var onMozDomContentLoaded = function() {
        document.removeEventListener(kDomContentLoaded, onMozDomContentLoaded,
            false);

        flushReadyQueue();

        onMozDomContentLoaded = nill;
    };

    /*
     *
     */
    var onMozWindowLoad = function() {
        document.removeEventListener(kLoad, onMozWindowLoad, false);

        flushReadyQueue();

        onMozWindowLoad = nill;
    };

    /*
     *
     */
    var onIEDomContentLoaded = function() {
        if (!isDomContentReady()) {
            return;
        }

        document.detachEvent(kOnReadyStateChange, onIEDomContentLoaded);

        flushReadyQueue();

        onIEDomContentLoaded = nill;
    };

    /*
     *
     */
    var onIEWindowLoaded = function() {
        window.detachEvent(kOnLoad, onIEWindowLoaded);

        flushReadyQueue();

        onIEDomContentLoaded = nill;
    };

    /*
     *
     */
    var bindReadyListeners = nill;

    if (document.addEventListener) {

        // Mozilla, Opera, webkit
        bindReadyListeners = function() {

            //Listen to native on dom content loaded event.
            document.addEventListener(kDomContentLoaded, onMozDomContentLoaded,
                false);

            //Worst-case fallback
            window.addEventListener(kLoad, onMozWindowLoad, false);

            //Do not process further calls.
            bindReadyListeners = nill;
        };
    } else if (document.attachEvent) {

        // MSIE
        bindReadyListeners = function() {

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
        };
    } else {

        // Fallback for really archaic browsers.
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

    /**
     * @function {static} o2.Dom.ready
     *
     * <p>Fires when the <code>HTML DOM</code> is ready.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.ready(function() {
     *      doInitializaton();
     * });
     * </pre>
     *
     * @param {Function} delegate - the callback that's called when the DOM is
     * ready.
     */
    def(me, 'ready', function(delegate) {

        // if DOM is ready, execute the delegate immediately.
        if (isApplicationReady) {
            delegate();

            return;
        }

        // Otherwise, check for the DOM's ready state.
        bindReadyListeners();

        // this queue will be processed "only once" after DOM is ready.
        readyQueue.push(delegate);
    });
}(this.o2, this, this.document));
