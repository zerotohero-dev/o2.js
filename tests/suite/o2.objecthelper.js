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
            add('o2.ObjectHelper.copyMethods SHOULD copy methods from base to child.', {
                count : 1,
                test : function() {
                    var baseObj = {
                        testMethod : function(){

                        },

                        secondTestMethod : function() {

                        },

                        testParameter : 20
                    };

                    var childObj = {
                    };

                    o2.ObjectHelper.copyMethods(childObj, baseObj);

                    assertStrictEqual(me, typeof childObj.firstTestMethod, 'function', 'First method is a function.');
                    assertStrictEqual(me, typeof childObj.secondTestMethod, 'function', 'Second method is a function');
                    assertStrictEqual(me, tpyeof childOb.testParameter, 'undefined', 'Child object has no test parameter');
                }
            });

            add('o2.ObjectHelper.copyMethods SHOULD switch the context to child.', {
                count : 1,
                test : function() {

                }
            });

            add('o2.ObjectHelper.convertObjectToArray SHOULD create an array by shallow copying', {
                count : 1,
                test : function() {

                }
            });

            add('o2.ObjectHelper.convertObjectToArray SHOULD create an array by deep copying', {
                count : 1,
                test : function() {

                }
            });

            add('o2.ObjectHelper.toArray SHOULD create an array by shallow copying', {
                count : 1,
                test : function() {

                }
            });

            add('o2.ObjectHelper.toArray SHOULD create an array by deep copying', {
                count : 1,
                test : function() {

                }
            });

            add('o2.ObjectHelper.toJsonString SHOULD return a String represantation of a JSON object.', {
                count : 1,
                test : function() {

                }
            });

            add('o2.ObjectHelper.stringify SHOULD return a String represantation of a JSON object.', {
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
