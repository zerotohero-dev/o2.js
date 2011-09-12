/*global window, o2, ActiveXObject*/

/**
 * @module o2.ajaxcontroller
 * @requires o2
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>An AJAX controller that implements the <strong>Observer
 * Pattern</strong>.</p>
 */
( function(o2, window, UNDEFINED) {

    /**
     * @class o2.AjaxController
     * @implements Observer
     *
     * <p>An AJAX <code>Controller</code>. Registers itself to {@link
     * o2.AjaxState}
     * <code>Observable</code> upon construction.</p>
     *
     * <p>Implements the <code>Observer</code> interface.</p>
     */

    /**
     * @constructor o2.AjaxController.AjaxController
     *
     * See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observer.html
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest
     * @param {Object} args - an associative array in the form
     * {timeout:[timeoutInMilliSeconds], ontimeout: [function]}
     * both attributes are optional.
     */
    o2.AjaxController = function(xhr, args) {

        this.xhr = xhr;
        this.timeout = (args && args.timeout) || null;
        this.ontimeout = (args && args.ontimeout) || o2.nill;

        // Register self.
        o2.AjaxState.addObserver(this);

    };

    /**
     * @function o2.AjaxController.update
     *
     * <p>Implementation of the <code>Observer.update</code> interface
     * method.</p>
     *
     * @param {Observable} observable - the responsible <code>Observable</code>.
     * @param {Object} data - parameters passed from the <code>Observable</code>
     * to
     * this <code>Observer</code>.
     */
    o2.AjaxController.prototype.update = function(observable, data) {

        if(!data.isTimedOut) {
            return;
        }

        // Unregister self from the observable.
        this.unregister(observable);
        // Abort the request.
        this.xhr.abort();
        // Execute callback.
        this.ontimeout();

    };

    /**
     * @function o2.AjaxController.unregister
     *
     * <p>Unregisters the object from the observer.</p>
     * <p>Call this when the <strong>AJAX</strong> request completes.</p>
     *
     * @param {Observable} observable - the responsible <code>Observable</code>.
     */
    o2.AjaxController.prototype.unregister = function(observable) {

        if(this.isDeleted) {
            return;
        }

        observable.deleteObserver(this);

    };

}(o2, this));
