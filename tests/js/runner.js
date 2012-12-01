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
            totalFailureCount : 0,
            totalSuccessCount : 0
        };

    /*
     *
     */
    function incrementFailureCount() { state.totalFailureCount++; }

    /*
     *
     */
    function incrementSuccessCount() { state.totalSuccessCount++; }

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

        // TODO: use the Deferred pattern.

        // TOOD: it currently iterates main modules.
        // what about the partial modules?

        var Runner = window.Runner = {
            id : null,

            next : function() {
                clearTimeout(Runner.id);

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

                Runner.id = setTimeout(function() {
                    log(['FAIL: unit test. "', file, '" timed out.'].join(''));

                    Runner.reject();
                }, 3000);
            },

            resolve : function() {
                Runner.next();
            },

            reject : function() {
                incrementFailureCount();

                Runner.next();
            }
        };

        Runner.resolve();
    }());
}(this.o2));

