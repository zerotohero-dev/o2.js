/*global o2 */

/**
 * @module jsonpcontroller
 * @requires ajaxcontroller
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <code>JSONP</code> controller that implements the
 * <strong>Observer</strong> pattern.</p>
 */
( function(framework, window, UNDEFINED) {
    
    /*
     * Aliases.
     */
    var me = framework;
    var nill = framework.nill;

    /*
     * State.
     */
    var purgeQueue = [];

    /**
     * @class JsonpController
     * @extends AjaxController
     *
     * <p>A JSONP <code>Controller</code>. Registers itself to {@link
     * JsonpState}
     * <code>Observable</code> upon construction.</p>
     *
     * <p>Implements the <code>Observer</code> interface.</p>
     */

    /**
     * @constructor JsonpController.JsonpController
     *
     * See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observer.html
     *
     * @param {String} jsonp - the current jsonp unique identifier.
     * @param {Object} args - an associative array in the form
     * {timeout:[timeoutInMilliSeconds], ontimeout: [function]}
     * both attributes are optional.
     */
    me.JsonpController = function(jsonp, args) {

        this.jsonp = jsonp;
        this.timeout = (args && args.timeout) || null;
        this.ontimeout = (args && args.ontimeout) || nill;

        // Register self.
        me.JsonpState.addObserver(this);

    };

    me.JsonpController.prototype = {

        /**
         * @function JsonpController.unregister
         *
         * Inherited from {@link AjaxController.unregister}
         * @see AjaxController.unregister
         */
        unregister : me.AjaxController.prototype.unregister,

        /**
         * @function JsonpController.update
         *
         * Overloaded from {@link AjaxController.update}
         * @see AjaxController.update
         * @param {JsonpState} observable - the <code>Observable</code> state
         * object.
         * @param {Object} data - parameters passed from the
         * <code>Observable</code> to
         * this <code>Observer</code>.
         */
        update : function(observable, data) {

            if(data.isTimedOut) {
                // Unregister self from the observable.
                this.unregister(observable);

                // Abort the request.
                window[this.jsonp] = nill;

                // Purge former requests to prevent memory leak.
                purgeQueue.push(this.jsonp);

                while(purgeQueue.length > 1) {
                    
                    //
                    delete window[purgeQueue.shift()];
                }

                // Execute callback.
                this.ontimeout();

            }

        }

    };

}(o2, this));
