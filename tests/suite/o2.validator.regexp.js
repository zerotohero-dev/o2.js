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

            add('o2.Validator.isEmail SHOULD match a valid e-mail.', {
                count: 2,
                test : function() {
                    var me = this;

                    var validEmail = 'volkan@o2js.com';
                    var invalidEmail = 'volkan[at]o2js[dot]com';

                    var resultValid = o2.Validator.isEmail(validEmail);
                    var resultInvalid = o2.Validator.ieEmail(invalidEmail);
                }
            });

            add('o2.Validator.isUrl SHOULD match a valid url.');
            add('o2.Validator.isWhiteSpace SHOULD match whitespace-only strings.');

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);

        }

    };

    Suite.init();

}(o2, this));
