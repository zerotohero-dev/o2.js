/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */

/*global o2, Demo*/
( function(o2, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var add = o2.Unit.add;
    var run = o2.Unit.run;
    var assertStrictEqual = o2.Unit.assertStrictEqual;
    var assertEqual = o2.Unit.assertEqual;
    var assert = o2.Unit.assert;

    /**
     *
     */
    var Suite = {

        /**
         *
         */
        init : function() {

            add('o2.AjaxState.addObserver SHOULD increment observer count.');

            add('o2.AjaxState.deleteObserver SHOULD decrement observer count.');

            add('o2.AjaxState.countObservers SHOULD give the obsever count.');

            add('o2.AjaxState.deleteObservers SHOULD remove all observers.');

            add('o2.AjaxState.timeoutObservers SHOULD timeout given observers.');

            add('o2.AjaxState.timeoutAllObservers SHOULD timeout all observers.');

            add('o2.AjaxState.init SHOULD start listening.');


            add('dummy test case', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);

        }

    };

    Suite.init();

}(o2, this));
