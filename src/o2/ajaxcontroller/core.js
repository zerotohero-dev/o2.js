define([
    '/o2/ajaxstate/core'
], function(
    AjaxState
) {
    'use strict';

        /*
         * # Aliases
         */

        /*
         * core
         */
    var nill = o2.nill;

    function AjaxController(xhr, args) {
        this.xhr = xhr;
        this.timeout = (args && args.timeout) || null;
        this.ontimeout = (args && args.ontimeout) || nill;
        this.isDeleted = false;

        // Register self.
        AjaxState.addObserver(this);
    };

    AjaxController.prototype.update = function(data) {
        if (!data.isTimedOut) {return;}

        // Unregister self from the observable.
        this.unregister();

        // Abort the request.
        this.xhr.abort();

        // Execute callback.
        this.ontimeout();
    });

    AjaxController.prototype.unregister = function() {
        if (this.isDeleted) {return;}

        state.deleteObserver(this);
    });

    return AjaxController;
});
