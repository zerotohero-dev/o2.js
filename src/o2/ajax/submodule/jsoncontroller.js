require([
    '../../core',
    '../../object/core',
    './ajaxcontroller',
    './jsonpstate'
], function(
    o2,
    ObjectUtil,
    AjaxController,
    JsonpState
) {
    'use strict';

        /*
         * Module Exports
         */
    var exports = {},

        /*
         * Aliases
         */

        /*
         * /../../core
         */
        nill = o2.nill,

        /*
         * ./jsonpstate
         */
        state = JsonpState,

        /*
         * /../../object/core
         */
        copyMethods = ObjectUtil.copyMethods,

        /*
         * State
         */
        purgeQueue = [],

        /*
         * Inheritance
         */
        base = AjaxController,
        self;

    exports.JsonpController = function(jsonp, args) {
        this.jsonp = jsonp;
        this.ontimeout = (args && args.ontimeout) || nill;
        this.timeout = (args && args.timeout) || null;

        // Register self.
        state.addObserver(this);
    };

    /*
     *
     */
    self = exports.JsonpController;

    // A quick way of inheriting methods without constructing base
    // (i.e. without the `self.prototype = new base();` assignment).
    copyMethods(self.prototype, base.prototype);

    exports.update = function(data) {
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
    };

    exports.unregister = function() {
        if (this.isDeleted) {return;}

        state.deleteObserver(this);
    };

    return exports;
});

