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
//    var assertEqual = o2.Unit.assertEqual;
    var assert = o2.Unit.assert;

    /**
     *
     */
    var Suite = {

        /**
         *
         */
        init : function() {
            add('o2.MethodHelper.overload SHOULD overload a function.', {
                count : 2,
                test : function() {
                    var me = this;

                    var Helper = {};

                    o2.MethodHelper.overload(Helper, 'stuff', function(a, b) {
                        return a * b;
                    });

                    o2.MethodHelper.overload(Helper, 'stuff', function(a, b, c) {
                        return a * b * c;
                    });

                    assertStrictEqual(me, Helper.stuff(2, 3), 6, '2*3 == 6');
                    assertStrictEqual(me, Helper.stuff(2, 2, 2), 8, '2*2*2 == 8');
                }
            });

            add('o2.MethodHelper.requireAllArguments SHOULD check for the number of provided arguments.', {
                count : 2,
                test : function() {
                    var me = this;

                    function testPoint(y, m, x, n) {
                        return y === m*x + n;
                    }

                    var verifiedTestPoint =
                        o2.MethodHelper.requireAllArguments(testPoint);

                    try {
                        verifiedTestPoint(1,2,3);
                        assert(me, false, 'There are no exceptions');
                    } catch(exception1) {
                        assert(me, true, 'There is an exception');
                    }

                    try {
                        verifiedTestPoint(1,2,3,4);
                        assert(me, true, 'There are no exceptions');
                    } catch(exception2) {
                        assert(me, false, 'There is an exception');
                    }
                }
            });

            add('o2.MethodHelper.defer SHOULD defer the execution of a function', {
                count : 1,
                test : function() {
                    var me = this;
                    var begin = 0;
                    var end = 0;

                    function test() {
                        end = (new Date()).getTime();
                        assert(me, end-begin>500, 'The method is delayed executed');
                    }

                    begin = (new Date()).getTime();
                    o2.MethodHelper.defer(test, 1000, this, []);
                }
            });

            add('o2.MethodHelper.flip SHOULD flip the arguments of a function', {
                count : 1,
                test : function() {
                    var me = this;

                    function test(a, b, c) {
                        return a*(b+c);
                    }

                    var flippedTest = o2.MethodHelper.flip(test, 0, 2);

                    assertStrictEqual(me, flippedTest(3, 1, 1), 4, '1*(1+3)=4');
                }
            });

            add('o2.MethodHelper.compose SHOULD pipe two functions', {
                count : 1,
                test : function() {
                    var me = this;

                    function square(i) {
                        return i*i;
                    }

                    function sum(a, b) {
                        return a+b;
                    }

                    var squaredSum = o2.MethodHelper.compose(square, sum);

                    assertStrictEqual(me, squaredSum(2,2), 16, '(2+2)^2==16');
                }
            });

            add('o2.MethodHelper.fold SHOULD make a running calculation over a set', {
                count : 1,
                test : function() {
                    var me = this;

                    var set = [1, 2, 3, 4, 5, 6];

                    function sum(a, b) {
                        return a+b;
                    }

                    var folded = o2.MethodHelper.fold(set, sum, 0);

                    assertStrictEqual(me, folded, 21, 'sum(0 to 6) equals 21');
                }
            });

            run(window.parent && window.parent.Runner &&
                window.parent.Runner.processCompletedSuite);
        }
    };

    Suite.init();
}(this.o2, this));
