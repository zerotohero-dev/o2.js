/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */
(function(o2) {
    'use strict';

    /*
     * Aliases.
     */
    var add = o2.Unit.add;
    var run = o2.Unit.run;
    var assertStrictEqual = o2.Unit.assertStrictEqual;
    var assertStrictNotEqual = o2.Unit.assertStrictNotEqual;

    /**
     *
     */
    var Suite = {

        /**
         *
         */
        init : function() {
            add('o2.ObjectHelper.copyMethods SHOULD copy methods from base to child.', {
                count : 3,
                test : function() {
                    var me = this;

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

                    assertStrictEqual(me, typeof childObj.testMethod, 'function', 'First method is a function.');
                    assertStrictEqual(me, typeof childObj.secondTestMethod, 'function', 'Second method is a function.');
                    assertStrictEqual(me, typeof childObj.testParameter, 'undefined', 'Child object has no test parameter.');
                }
            });

            add('o2.ObjectHelper.copyMethods SHOULD switch the context to child.', {
                count : 1,
                test : function() {
                    var me = this;

                    var childObj = {

                    };

                    var baseObj = {
                        testMethod : function() {
                            assertStrictEqual(me, this, childObj, 'Context is child object');
                        }
                    };

                    o2.ObjectHelper.copyMethods(childObj, baseObj);

                    childObj.testMethod();
                }
            });

            add('o2.ObjectHelper.convertObjectToArray SHOULD create an array by shallow copying.', {
                count : 3,
                test : function() {
                    var me = this;

                    var obj = {
                        lorem : 1,
                        ipsum : 2,
                        dolor : 3,
                        sit : {
                            luke : 4,
                            jane : 5,
                            amet : {
                                lilly : 6
                            }
                        }
                    };

                    var ar = o2.ObjectHelper.convertObjectToArray(obj);

                    assertStrictEqual(me, ar[0], 1, 'ar[0] === 1');
                    assertStrictEqual(me, ar[2], 3, 'ar[2] === 3');
                    assertStrictEqual(me, ar[3], obj.sit, 'ar[3] === obj.sit');
                }
            });

            add('o2.ObjectHelper.convertObjectToArray SHOULD create an array by deep copying', {
                count : 4,
                test : function() {
                    var me = this;

                    var obj = {
                        lorem : 1,
                        ipsum : 2,
                        dolor : 3,
                        sit : {
                            luke : 4,
                            jane : 5,
                            amet : {
                                lilly : 6
                            }
                        }
                    };

                    var ar = o2.ObjectHelper.convertObjectToArray(obj, true);

                    assertStrictEqual(me, ar[0], 1, 'ar[0] === 1');
                    assertStrictEqual(me, ar[2], 3, 'ar[2] === 3');
                    assertStrictNotEqual(me, ar[3], obj.sit, 'ar[3] !== obj.sit');
                    assertStrictEqual(me, ar[3][2][0], 6, 'ar[3][2][0] === 6');
                }
            });

            add('o2.ObjectHelper.toArray SHOULD create an array by shallow copying', {
                count : 3,
                test : function() {
                    var me = this;

                    var obj = {
                        lorem : 1,
                        ipsum : 2,
                        dolor : 3,
                        sit : {
                            luke : 4,
                            jane : 5,
                            amet : {
                                lilly : 6
                            }
                        }
                    };

                    var ar = o2.ObjectHelper.toArray(obj);

                    assertStrictEqual(me, ar[0], 1, 'ar[0] === 1');
                    assertStrictEqual(me, ar[2], 3, 'ar[2] === 3');
                    assertStrictEqual(me, ar[3], obj.sit, 'ar[3] === obj.sit');
                }
            });

            add('o2.ObjectHelper.toArray SHOULD create an array by deep copying', {
                count : 4,
                test : function() {
                    var me = this;

                    var obj = {
                        lorem : 1,
                        ipsum : 2,
                        dolor : 3,
                        sit : {
                            luke : 4,
                            jane : 5,
                            amet : {
                                lilly : 6
                            }
                        }
                    };

                    var ar = o2.ObjectHelper.toArray(obj, true);

                    assertStrictEqual(me, ar[0], 1, 'ar[0] === 1');
                    assertStrictEqual(me, ar[2], 3, 'ar[2] === 3');
                    assertStrictNotEqual(me, ar[3], obj.sit, 'ar[3] !== obj.sit');
                    assertStrictEqual(me, ar[3][2][0], 6, 'ar[3][2][0] === 6');
                }
            });

            add('o2.ObjectHelper.toJsonString SHOULD return a String represantation of a JSON object.', {
                count : 2,
                test : function() {
                    var me = this;

                    var test = {lorem : 'ipsum'};

                    var evaluated = o2.ObjectHelper.toJsonString(test);

                    var json = o2.StringHelper.toJson(evaluated);

                    assertStrictEqual(me, typeof evaluated, 'string', 'evaluated result is string.');
                    assertStrictEqual(me, json.lorem, 'ipsum', 'json.lorem == "ipsum".');
                }
            });

            add('o2.ObjectHelper.stringify SHOULD return a String represantation of a JSON object.', {
                count : 2,
                test : function() {
                    var me = this;

                    var test = {lorem : 'ipsum'};

                    var evaluated = o2.ObjectHelper.stringify(test);

                    var json = o2.StringHelper.toJson(evaluated);

                    assertStrictEqual(me, typeof evaluated, 'string', 'evaluated result is string.');
                    assertStrictEqual(me, json.lorem, 'ipsum', 'json.lorem == "ipsum".');
                }
            });

            run(window.parent && window.parent.Runner &&
                window.parent.Runner.processCompletedSuite);
        }
    };

    Suite.init();
}(this.o2));
