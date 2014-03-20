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
    var parent = window.parent;

    /**
     *
     */
    var Suite = {

        /**
         *
         */
        init : function() {
            add('o2.Validator.isBoolean SHOULD return true given a valid Boolean.', {
                count : 2,
                test : function() {
                    var me = this;

                    var bln = false;
                    var nonBln = 1;

                    var isBln = o2.Validator.isBoolean(bln);
                    var isBln2 = o2.Validator.isBoolean(nonBln);

                    assertStrictEqual(me, isBln, true, 'false is a boolean.');
                    assertStrictEqual(me, isBln2, false, '1 is not a boolean.');
                }
            });

            add('o2.Validator.isDate SHOULD return true given a proper date object or date triplet.', {
                count : 4,
                test : function() {
                    var me = this;

                    var date1 = new Date();
                    var date2 = [2011, 1, 1];
                    var date3 = [2011, 2, 29];
                    var date4 = [2012, 2, 29];

                    var isValidDate1 = o2.Validator.isDate(date1);
                    var isValidDate2 = o2.Validator.isDate(date2[0], date2[1], date2[2]);
                    var isValidDate3 = o2.Validator.isDate(date3[0], date3[1], date3[2]);
                    var isValidDate4 = o2.Validator.isDate(date4[0], date4[1], date4[2]);

                    assertStrictEqual(me, isValidDate1, true, 'new Date is a date');
                    assertStrictEqual(me, isValidDate2, true, '2011-1-1 is a valid date.');
                    assertStrictEqual(me, isValidDate3, false, '2011-2-29 is not a valid date.');
                    assertStrictEqual(me, isValidDate4, true, '2012-2-29 is a valid date.');
                }
            });

            add('o2.Validator.isFunction SHOULD return true given a valid Function.', {
                count : 2,
                test : function() {
                    var me = this;

                    var delegate = function(){};
                    var test = {};

                    var isFunction1 = o2.Validator.isFunction(delegate);
                    var isFunction2 = o2.Validator.isFunction(test);

                    assertStrictEqual(me, isFunction1, true, 'delegate is a function');
                    assertStrictEqual(me, isFunction2, false, 'test is NOT a function');
                }
            });

            add('o2.Validator.isNumber SHOULD return true given a valid Number.', {
                count : 2,
                test : function() {
                    var me = this;

                    var number1 = 10;
                    var number2 = '10';

                    var isNumber1 = o2.Validator.isNumber(number1);
                    var isNumber2 = o2.Validator.isNumber(number2);

                    assertStrictEqual(me, isNumber1, true, '10 is a number');
                    assertStrictEqual(me, isNumber2, false, '"10" is NOT a number');
                }
            });

            add('o2.Validator.isObject SHOULD return true given a valid Object.', {
                count : 5,
                test : function() {
                    var me = this;

                    var obj = {};
                    var ar = [];
                    var str = 'a';
                    var num = 10.2;
                    var fn = function(){};

                    var isObjObj = o2.Validator.isObject(obj);
                    var isObjAr = o2.Validator.isObject(ar);
                    var isObjStr = o2.Validator.isObject(str);
                    var isObjNum = o2.Validator.isObject(num);
                    var isObjFn = o2.Validator.isObject(fn);

                    assertStrictEqual(me, isObjObj, true, 'obj is an object');
                    assertStrictEqual(me, isObjAr, false, 'ar is NOT an object');
                    assertStrictEqual(me, isObjStr, false, 'str is NOT an object');
                    assertStrictEqual(me, isObjNum, false, 'num is NOT an object');
                    assertStrictEqual(me, isObjFn, false, 'fn is NOT an object');
                }
            });

            add('o2.Validator.isRegExp SHOULD return true given a valid RegExp.', {
                count : 2,
                test : function() {
                    var me = this;

                    var reg = /test/ig;
                    var nonReg = 42;

                    var isRegReg = o2.Validator.isRegExp(reg);
                    var isRegNonReg = o2.Validator.isRegExp(nonReg);

                    assertStrictEqual(me, isRegReg, true, 'reg is a RegExp');
                    assertStrictEqual(me, isRegNonReg, false, 'nonReg is NOT a RegExp');
                }
            });

            add('o2.Validator.isString SHOULD return true given a proper String.', {
                count : 2,
                test : function() {
                    var me = this;

                    var str = 'lorem';
                    var nonStr = 42;

                    var isStrStr = o2.Validator.isString(str);
                    var isStrNonStr = o2.Validator.isString(nonStr);

                    assertStrictEqual(me, isStrStr, true, 'str is a String');
                    assertStrictEqual(me, isStrNonStr, false, 'nonStr is NOT a String');
                }
            });

            add('o2.Validator.isArguments SHOULD return true given the parameter is an arguments object.', {
                count : 2,
                test : function() {
                    var me = this;

                    (function(test) {
                        var isArg = o2.Validator.isArguments(arguments);
                        var isNonArg = o2.Validator.isArguments(test);

                        assertStrictEqual(me, isArg, true, 'arguments is arguments');
                        assertStrictEqual(me, isNonArg, false, 'test is not arguments');
                    }());
                }
            });

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);
        }
    };

    Suite.init();
}(this.o2, this));
