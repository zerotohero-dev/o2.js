(function(window) {
    'use strict';

    var oldLoad = window.onload;

    window.initializeJasmine = function() {

        // Jasmine 2.0.0 requires some non-zero timeout to prepare; not sure if it's a bug.
        // TODO: investigate why this does not work with `setTimeout(fn, 0);`
        setTimeout(oldLoad, 100);
    };

    window.onload = function(){};
}(this));
