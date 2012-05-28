(function(o2, window, document, undefined) {
    'use strict';

    /*
     * Aliases
     */
    var alert = window.alert;
    var on    = o2.Event.addEventListener;
    var ready = o2.ready;

    /*
     * Will be executed when DOM is ready.
     */
    ready(function() {
        on(document, 'click', function() {
            alert('Hello World; Hello Stars; Hello Universe!');
        });
    });
}(this.o2, this, this.document));