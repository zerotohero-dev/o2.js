(function(o2) {
    'use strict';

    var classes = o2.protecteds.classes,

        /*
         * # Aliases
         */

        dbg    = o2.Debugger,
        assert = dbg.assert,
        log    = dbg.log,
        init   = dbg.init,

        /*
         * # State Information
         */

        /*
         * Contains meta information about the modules to be tested.
         */
        queue   = [],

        /*
         * Contains an aggregated data for the overall status of the test Suites
         * that have run so far.
         */
        state = {
        };

    /*
     *
     */
    (function initialize() {
        init('Output', true);

        var key = null;

        for (key in classes) {
            if (classes.hasOwnProperty(key)) {
                queue.push(['o2.', key, '.test.html'].join(''));
            }
        }
    }());

    /*
     *
     */
    (function loop() {
        var file   = queue.pop(),
            id     = 0;

        if (!file) {
            log('end of queue');

            assert(state.totalFailureCount === 0, [
                '<p><b>All done!</b> ',
                'Total failure count: <b>', state.totalFailureCount, '</b>, ',
                'Total success count: <b>', state.totalSuccessCount, '</b>.</p>'
            ].join(''));

            return;
        }

        log(['processing: ', file].join(''));

        id = setTimeout(function() {
            log(['FAIL: unit test. "', file, '" timed out.'].join(''));

            loop();
        }, 3000);
    }());
}(this.o2));

