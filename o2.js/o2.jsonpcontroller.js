/*global o2, window*/

/*
* Copyright © by Volkan Özçelik - http://o2js.com/
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

/**
 * @module o2.jsonpcontroller
 * @requires o2.ajaxcontroller
 *
 * <p>A <code>JSONP</code> controller that implements the
 * <strong>Observer</strong> pattern.</p>
 */
( function(o2, window, UNDEFINED) {

    /*
     * State.
     */
    var purgeQueue = [];

    /**
     * @class o2.JsonpController
     * @extends o2.AjaxController
     *
     * <p>A JSONP <code>Controller</code>. Registers itself to {@link
     * o2.JsonpState}
     * <code>Observable</code> upon construction.</p>
     *
     * <p>Implements the <code>Observer</code> interface.</p>
     */

    /**
     * @constructor o2.JsonpController.JsonpController
     *
     * See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observer.html
     *
     * @param {String} jsonp - the current jsonp unique identifier.
     * @param {Object} args - an associative array in the form
     * {timeout:[timeoutInMilliSeconds], ontimeout: [function]}
     * both attributes are optional.
     */
    o2.JsonpController = function(jsonp, args) {

        this.jsonp = jsonp;
        this.timeout = (args && args.timeout) || null;
        this.ontimeout = (args && args.ontimeout) || o2.nill;

        // Register self.
        o2.JsonpState.addObserver(this);

    };


    o2.JsonpController.prototype = {
        
        /**
         * @function o2.JsonpController.unregister
         *
         * Inherited from {@link o2.AjaxController.unregister}
         * @see o2.AjaxController.unregister
         */
        unregister : o2.AjaxController.prototype.unregister,

        /**
         * @function o2.JsonpController.update
         *
         * Overloaded from {@link o2.AjaxController.update}
         * @see o2.AjaxController.update
         * @param {o2.JsonpState} observable - the <code>Observable</code> state
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
                window[this.jsonp] = o2.nill;
        
                // Purge former requests to prevent memory leak.
                purgeQueue.push(this.jsonp);
                while(purgeQueue.length > 1) {
                    delete window[purgeQueue.shift()];
                }
        
                // Execute callback.
                this.ontimeout();
        
            }
        
        }

    };

}(o2, this));
