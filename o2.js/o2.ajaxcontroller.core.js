/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp) {
    'use strict';

    /**
     * @module   ajaxcontroller.core
     *
     * @requires core
     * @requires ajaxstate.core
     *
     * <p>An AJAX controller that implements the <strong>Observer
     * Pattern</strong>.</p>
     */
    fp.ensure(
        'ajaxcontroller.core',
    [
        'core',
        'ajaxstate.core'
    ]);

    var attr      = fp.getAttr,
        construct = attr(fp, 'construct'),
        proto     = attr(fp, 'proto'),
        require   = attr(fp, 'require'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'AjaxController',

        /*
         * # Aliases
         */

        /*
         * core
         */
        nill = require('nill'),

        /*
         * ajaxstate.core
         */
        state = require('AjaxState'),

        /*
         * # To be Overridden
         */

        me = null;

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
     * <p>See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observer.html
     * </p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var request = o2.Ajax.get('/api.php', {
     *      name   : 'Volkan Özçelik',
     *      action : 'add'
     * }, {
     *      oncomplete  : function(text, xml, xhr, status) {},
     *      onerror     : function(statusCode, statusText, xhr) {},
     *      onaborted   : function(xhr) {},
     *      onexception : function(exception, xhr) {}
     * });
     *
     * // The request will time out after 5 seconds and then ontimeout
     * // will be called.
     * var controller = new o2.AjaxController(request, {
     *      timeout   : 5000,
     *      ontimeout : function() {
     *      }
     * });
     * </pre>
     *
     * @param {XMLHttpRequest} xhr - the original XMLHttpRequest
     * @param {Object} args - an associative array in the form
     * {timeout:[timeoutInMilliSeconds], ontimeout: [function]}
     * both attributes are optional.
     */
    exports.AjaxController = construct(kModuleName, function(xhr, args) {
        this.xhr       = xhr;
        this.timeout   = (args && args.timeout) || null;
        this.ontimeout = (args && args.ontimeout) || nill;
        this.isDeleted = false;

        // Register self.
        state.addObserver(this);
    });

    /*
     *
     */
    me = exports.AjaxController;

    /**
     * @function {virtual} o2.AjaxController.update
     *
     * <p>Implementation of the <code>Observer.update</code> interface
     * method.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var controller = new o2.AjaxController(xhr, params);
     *
     * ...
     *
     * // Timeout the AJAX request immediately.
     * controller.update({isTimedOut : true});
     * </pre>
     *
     * <p>{@link o2.JsonpController} overrides this implementation.</p>
     *
     * @param {Object} data - parameters passed from the <code>Observable</code>
     * to this <code>Observer</code>.
     */
    exports.update = proto(me, 'update', function(data) {
        if (!data.isTimedOut) {return;}

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
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var controller = new o2.AjaxController(xhr, params);
     *
     * ...
     *
     * // The o2.AjaxState no longer listens to this Controller.
     * controller.unregister();
     * </pre>
     *
     */
    exports.unregister = proto(me, 'unregister', function() {
        if (this.isDeleted) {return;}

        state.deleteObserver(this);
    });
}(this.o2, this.o2.protecteds));

