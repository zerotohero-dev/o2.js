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

            add('o2.DomHelper.hasClass SHOULD check if an object has a given class.');
            
            add('o2.DomHelper.addClass SHOULD add a class to an object.');
            
            add('o2.DomHelper.removeClass SHOULD remove a class from an object.');


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
