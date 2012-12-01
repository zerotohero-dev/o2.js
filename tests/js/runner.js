(function(o2) {
    'use strict';


    var classes = o2.protecteds.classes,
        key     = null,
        klass   = '',
        url     = '',
        queue   = [],
        file    = '';

    for (key in classes) {
        if (classes.hasOwnProperty(key)) {
            queue.push(['o2.', key, '.test.html'].join(''));
        }
    }

    (function run() {
        var file = queue.pop(),
            length = queue.length;

        if (!file) {
            console.log('end of queue');

            return;
        }

        console.log(['processing: ', file].join(''));

        var id = setTimeout(function() {
            console.log(['FAIL: unit test', file, ' timed out.'].join(''));

            run();
        }, 3000);
    }());
}(this.o2));

