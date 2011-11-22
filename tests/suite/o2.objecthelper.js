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
//    var assertStrictEqual = o2.Unit.assertStrictEqual;
//    var assertEqual = o2.Unit.assertEqual;
//    var assert = o2.Unit.assert;

    /**
     *
     */
    var Suite = {

        /**
         *
         */
        init : function() {
            add('o2.MethodHelper.copyMethods SHOULD copy methods from base to child.', {
                count : 1,
                test : function() {

                }
            });
            add('o2.MethodHelper.copyMethods SHOULD switch the context to child.', {
                count : 1,
                test : function() {

                }
            });

            add('o2.MethodHelper.convertObjectToArray SHOULD create an array by shallow copying', {
                count : 1,
                test : function() {

                }
            });

            add('o2.MethodHelper.convertObjectToArray SHOULD create an array by deep copying', {
                count : 1,
                test : function() {

                }
            });

            add('o2.MethodHelper.toArray SHOULD create an array by shallow copying', {
                count : 1,
                test : function() {

                }
            });

            add('o2.MethodHelper.toArray SHOULD create an array by deep copying', {
                count : 1,
                test : function() {

                }
            });

            add('o2.MethodHelper.toJsonString SHOULD return a String represantation of a JSON object.', {
                count : 1,
                test : function() {

                }
            });

            add('o2.MethodHelper.stringify SHOULD return a String represantation of a JSON object.', {
                count : 1,
                test : function() {

                }
            });

            run(window.parent && window.parent.Runner &&
                window.parent.Runner.processCompletedSuite);
        }
    };

    Suite.init();
}(this.o2, this));
