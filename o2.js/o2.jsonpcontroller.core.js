/**
 * @module   jsonpcontroller.core
 * @requires core
 * @requires ajaxcontroller.core
 * @requires jsonpstate.core
 * @requires object.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <strong>JSONP</strong> controller that implements the
 * <strong>Observer</strong> pattern.</p>
 */
(function(framework, fp, window) {
    'use strict';

    // Ensure that dependencies have been loaded.
    fp.ensure('jsonpcontroller.core', ['core', 'ajaxcontroller.core',
        'jsonpstate.core', 'object.core']);

    var attr      = fp.getAttr,
        construct = attr(fp, 'construct'),
        override  = attr(fp, 'override'),
        require   = attr(fp, 'require'),

        /*
         * Module Exports
         */
        exports = {},

        /*
         * Module Name
         */
        kModuleName = 'JsonpController',

        /*
         * Aliases
         */

        nill        = require('nill'),
        state       = require('JsonpState'),
        copyMethods = require('Object', 'copyMethods'),

        /*
         * State
         */
        purgeQueue = [],

        /*
         * Inheritance
         */
        base = require('AjaxController'),
        self = require(kModuleName),
        me   = null;

    /**
     * @class o2.JsonpController
     * @extends o2.AjaxController
     *
     * <p>A JSONP <code>Controller</code>. Registers itself to {@link
     * JsonpState} <code>Observable</code> upon construction.</p>
     *
     * <p>Implements the <code>Observer</code> interface.</p>
     */

    /**
     * @constructor o2.JsonpController.JsonpController
     *
     * See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observer.html
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var jsonp = o2.Jsonp.get('http://example.com/api.php', handleResponse);
     * var controller = new o2.JsonpController(jsonp, {timeout: 5000});
     * </pre>
     *
     * @param {String} jsonp - the current jsonp unique identifier.
     * @param {Object} args - an associative array in the form
     * {timeout:[timeoutInMilliSeconds], ontimeout: [function]}
     * both attributes are optional.
     */
    exports.JsonpController = construct(kModuleName, function(jsonp,
                args) {
        this.jsonp     = jsonp;
        this.ontimeout = (args && args.ontimeout) || nill;
        this.timeout   = (args && args.timeout) || null;

        // Register self.
        state.addObserver(this);
    });

    /*
     *
     */
    me = exports.JsonpController;



    // A quick way of inheriting methods without constructing base
    // (i.e. without the `self.prototype = new base();` assignment).
    copyMethods(self.prototype, base.prototype);

    /**
     * @function {override} o2.JsonpController.update
     *
     * <p>Overrides {@link o2.AjaxController.update}.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * controller.update({isTimedOut : true});
     * </pre>
     *
     * @param {JsonpState} observable - the <code>Observable</code> state
     * object.
     * @param {Object} data - parameters passed from the
     * <code>Observable</code> to this <code>Observer</code>.
     *
     * @see o2.AjaxController.update
     */
    exports.update = override(me, 'update', function(data) {
        if (!data.isTimedOut) {return;}

        // Unregister self from the observable.
        this.unregister(state);

        // Abort the request.
        window[this.jsonp] = nill;

        // Purge former requests to prevent memory leak.
        purgeQueue.push(this.jsonp);

        while (purgeQueue.length > 1) {
            delete window[purgeQueue.shift()];
        }

        // Execute callback.
        this.ontimeout();
    });

    /**
     * @function {override} o2.JsonpController.unregister
     *
     * <p>Overrides {@link o2.AjaxController.unregister}.</p>
     *
     * <p>Unregisters this object from its associated observable.
     * (<em>i.e. <strong>JsonpState</strong></em>)</p>
     *
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * controller.unregister();
     * </pre>
     *
     */
    exports.unregister = override(me, 'unregister', function() {
        if (this.isDeleted) {return;}

        state.deleteObserver(this);
    });
}(this.o2, this.o2.protecteds, this));
