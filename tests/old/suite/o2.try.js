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
    var parent = window.parent;

    /**
     *
     */
    var Suite = {

        /**
         *
         */
        init : function() {
            add('o2.Try.all SHOULD execute all delegates', {
                count: 1,
                test : function() {
                    var me = this;

                    var counter = 0;

                    function exp1() {
                        counter++;
                        throw 'exception';
                    }

                    function exp2() {
                        counter++;
                        throw 'exception';
                    }

                    function suc1() {
                        counter++;
                        return true;
                    }

                    function suc2() {
                        counter++;
                        return;
                    }

                    o2.Try.all(exp1, exp2, suc1, suc2);

                    assertStrictEqual(me, counter, 4, 'all 4 methods have been tried');
                }
            });

            add('o2.Try.these SHOULD try until first successful delegate', {
                count: 1,
                test : function() {
                    var me = this;

                    var counter = 0;

                    function exp1() {
                        counter++;
                        throw 'exception';
                    }

                    function exp2() {
                        counter++;
                        throw 'exception';
                    }

                    function suc1() {
                        counter++;
                        return true;
                    }

                    function suc2() {
                        counter++;
                        return;
                    }

                    o2.Try.these(exp1, exp2, suc1, suc2);

                    assertStrictEqual(me, counter, 3, 'exit at first successful method');
                }
            });

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);
        }
    };

    Suite.init();
}(this.o2, this));
