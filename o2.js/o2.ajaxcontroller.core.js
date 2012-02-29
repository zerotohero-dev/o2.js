/**
 * @module   ajaxcontroller.core
 * @requires ajaxstate.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-28 18:54:41.821501
 * -->
 *
 * <p>An AJAX controller that implements the <strong>Observer
 * Pattern</strong>.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var construct = attr(_, 'construct');
    var proto     = attr(_, 'proto');
    var require   = attr(_, 'require');

    /*
     * Aliases
     */

    var nill = require('nill');

    var state = require('AjaxState');

    /**
     * @class o2.AjaxController
     * @implements Observer
     *
     * <p>An AJAX <code>Controller</code>. Registers itself to {@link
     * AjaxState} <code>Observable</code> upon construction.</p>
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
    var me = construct('AjaxController', function(xhr, args) {
        this.xhr = xhr;
        this.timeout = (args && args.timeout) || null;
        this.ontimeout = (args && args.ontimeout) || nill;
        this.isDeleted = false;

        // Register self.
        state.addObserver(this);
    });

    /**
     * @function {virtual} o2.AjaxController.update
     *
     * <p>Implementation of the <code>Observer.update</code> interface
     * method.</p>
     *
     * <p>{@link o2.JsonpController} overrides this implementation.</p>
     *
     * @param {Object} data - parameters passed from the <code>Observable</code>
     * to this <code>Observer</code>.
     */
    proto(me, 'update', function(data) {
        if (!data.isTimedOut) {
            return;
        }

        // Unregister self from the observable.
        this.unregister();

        // Abort the request.
        this.xhr.abort();

        // Execute callback.
        this.ontimeout();
    });

    /**
     * @function {virtual} o2.AjaxController.unregister
     *
     * <p>Unregisters the object from the observer.</p>
     * <p>Call this when the <strong>AJAX</strong> request completes.</p>
     *
     * <p>{@link o2.JsonpController} overrides this implementation.</p>
     */
    proto(me, 'unregister', function() {
        if (this.isDeleted) {
            return;
        }

        state.deleteObserver(this);
    });
}(this.o2, this));

