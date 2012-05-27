(function(o2, window, document, undefined) {
    'use strict';

    var alert = window.alert;
    var on = o2.Event.addEventListener;

    o2.ready(function() {
        on(document, 'click', function() {
            alert('Hello World; Hello Stars; Hello Universe!');
        });
    });
}(this.o2, this, this.document));