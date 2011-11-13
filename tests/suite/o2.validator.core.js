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

            add('o2.Validator.isArray SHOULD return true given a valid Array.');
            add('o2.Validator.isBoolean SHOULD return true given a valid Boolean.');
            add('o2.Validator.isDate SHOULD return true given a proper date triplet.');
            add('o2.Validator.isDate SHOULD return true given a valid Date object.');
            add('o2.Validator.isFunction SHOULD return true given a valid Function.');
            add('o2.Validator.isNumber SHOULD return true given a valid Number.');
            add('o2.Validator.isObject SHOULD return true given a valid Object.');
            add('o2.Validator.isRegExp SHOULD return true given a valid RegExp.');
            add('o2.Validator.isString SHOULD return true given a proper String.');
            add('o2.Validator.isArguments SHOULD return true given the parameter is an arguments object.');

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);

        }

    };

    Suite.init();

}(o2, this));
