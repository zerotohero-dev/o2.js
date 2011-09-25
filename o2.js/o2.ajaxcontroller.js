/*global o2 */

/**
 * @module ajaxcontroller
 * @requires AjaxState
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
( function(framework, window, UNDEFINED) {
    
    /*
     * Aliases.
     */
    var me = framework;    
    var nill = me.nill;
    var addObserver = me.AjaxState.addObserver;

    /**
     * @class AjaxController
     * @implements Observer
     *
     * <p>An AJAX <code>Controller</code>. Registers itself to {@link
     * AjaxState}
     * <code>Observable</code> upon construction.</p>
     *
     * <p>Implements the <code>Observer</code> interface.</p>
     */

    /**
     * @constructor AjaxController.AjaxController
     *
     * See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observer.html
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest
     * @param {Object} args - an associative array in the form
     * {timeout:[timeoutInMilliSeconds], ontimeout: [function]}
     * both attributes are optional.
     */
    me.AjaxController = function(xhr, args) {

        this.xhr = xhr;
        this.timeout = (args && args.timeout) || null;
        this.ontimeout = (args && args.ontimeout) || nill;

        // Register self.
        addObserver(this);

    };
    
    var apt = me.AjaxController.prototype;

    /**
     * @function AjaxController.update
     *
     * <p>Implementation of the <code>Observer.update</code> interface
     * method.</p>
     *
     * @param {Observable} observable - the responsible <code>Observable</code>.
     * @param {Object} data - parameters passed from the <code>Observable</code>
     * to
     * this <code>Observer</code>.
     */
    apt.update = function(observable, data) {

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
     * @function AjaxController.unregister
     *
     * <p>Unregisters the object from the observer.</p>
     * <p>Call this when the <strong>AJAX</strong> request completes.</p>
     *
     * @param {Observable} observable - the responsible <code>Observable</code>.
     */
    apt.unregister = function(observable) {

        if(this.isDeleted) {
            
            return;
        }

        observable.deleteObserver(this);

    };

}(o2, this));
