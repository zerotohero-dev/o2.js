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
    var assertStrictNotEqual = o2.Unit.assertStrictNotEqual;
    var assertEqual = o2.Unit.assertEqual;
    var assertNotEqual = o2.Unit.assertNotEqual;
    var assert = o2.Unit.assert;
    var parent = window.parent;

    /**
     *
     */
    var Suite = {

        /**
         *
         */
        init : function() {
            add('o2.Unit SHOULD have all assertions working as expected', {
                count: 5,
                test: function() {
                    var me = this;

                    assert(me, 'truish', 'truish');
                    assertEqual(me, '10', 10, 'non strict equality');
                    assertNotEqual(me, '10', 11, 'non strict unequality');
                    assertStrictEqual(me, '10', '10', 'strict equality');
                    assertStrictNotEqual(me, '10', 10, 'strict unequality');
                }
            });

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);
        }
    };

    Suite.init();
}(this.o2, this));
