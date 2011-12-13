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

            add('Constructing an AjaxController SHOULD add it to the o2.AjaxState.', {
                count: 2,
                test: function(){

                    var me = this;

                    var ajax = o2.Ajax.createXhr();

                    var ajaxController = new o2.AjaxController(ajax);

                    assertEqual(me, o2.AjaxState.countObservers(), 1, 'AjaxState has one observer registered to it');

                    var anotherAjaxController = new o2.AjaxController(ajax);

                    assertEqual(me, o2.AjaxState.countObservers(), 2, 'AjaxState has two observers registered to it');

                }
            });

            add('Updating an o2.AjaxController with timeout data SHOULD trigger its ontimeout callback.', {
                count : 1,
                test : function() {

                }
            });

            add('Updating an o2.AjaxController with timeout data SHOULD unregister itself from the AjaxState.', {
                count : 1,
                test : function() {

                }
            });

            add('Updating an o2.AjaxController with timeout data SHOULD abort the ongoing AJAX request.', {
                count : 1,
                test : function() {

                }
            });

            add('Unregistering an o2.AjaxController SHOULD set its isDeleted flag to true.', {
                count : 1,
                test : function() {

                }
            });

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);
        }
    };

    Suite.init();
}(o2, this));
