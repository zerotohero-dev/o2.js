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

            add('o2.DomHelper.addStyle SHOULD add style to the element.');
            add('o2.DomHelper.getStyle SHOULD retrieve the style of the element.');
            add('o2.DomHelper.isVisible SHOULD return true if the element is not hidden or it\'s display is not set to "none".');
            add('o2.DomHelper.activateAlternateStyleSheet SHOULD activate an alternate style sheet.');
            add('o2.DomHelper.hide SHOULD hide the element');
            add('o2.DomHelper.show SHOULD show the element');


            run(parent && parent.Runner && parent.Runner.processCompletedSuite);

        }

    };

    Suite.init();

}(o2, this));
