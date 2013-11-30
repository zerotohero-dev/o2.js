/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */
(function(o2, window) {
    'use strict';

    /*
     * Aliases.
     */
    var add = o2.Unit.add;
    var run = o2.Unit.run;
    var assertStrictEqual = o2.Unit.assertStrictEqual;
    var assert = o2.Unit.assert;
    var setTimeout = window.setTimeout;

    /**
     *
     */
    var Suite = {

        /**
         *
         */
        init : function() {
            add('o2.Ajax SHOULD return to onerror handler, after aborting a request', {
                count: 1,
                test: function() {
                    var me = this;

                    var url = 'service/service.php';
                    var params = {wait : true};
                    var isDone = false;

                    var request = o2.Ajax.get(url, params, {
                        onerror: function() {
                            isDone = true;
                            assert(me, true, 'onerror fired.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        request.abort();
                    }, 500);

                    setTimeout(function() {
                        assertStrictEqual(me, isDone, true, 'Request has been timely processed.');
                        me.terminate();
                    }, 2000);
                }
            });


            run(window.parent && window.parent.Runner && window.parent.Runner.processCompletedSuite);
        }
    };

    Suite.init();
}(this.o2, this));
