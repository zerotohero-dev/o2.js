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

            add('o2.DomHelper.scrollWindowToBottom SHOULD scroll window to bottom.');
            add('o2.DomHelper.scrollWindowToTop SHOULD scroll an object to top.');
            add('o2.DomHelper.scrollObjectToBottom SHOULD scroll window to bottom.');
            add('o2.DomHelper.scrollObjectToTop SHOULD scroll an object to top.');            
            add('o2.DomHelper.scrollObjecttoBottom SHOULD work equally well with string IDs.');
            add('o2.DomHelper.scrollObjectToTop SHOULD work equally well with string IDs.');
            add('o2.DomHelper.scrollWindowtoObject SHOULD scroll window to the object.');
            add('o2.DomHelper.scrollWindowToObject SHOULD work eqaully well with a string ID.');
            add('o2.DomHelper.getWindowScrollOffset SHOULD get the scroll offset of the window.');
            add('o2.DomHelper.getObjectScrollOffset SHOULD get the scroll offset of an object.');
            add('o2.DomHelper.getObjectScrollOffset SHOULD work eqaully well with string IDs.');
            
            run(parent && parent.Runner && parent.Runner.processCompletedSuite);

        }

    };

    Suite.init();

}(o2, this));
