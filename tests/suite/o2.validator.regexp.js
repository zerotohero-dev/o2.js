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
                    var resultInvalid = o2.Validator.isEmail(invalidEmail);

                    assertStrictEqual(me, resultValid, true, 'Valid email found.');
                    assertStrictEqual(me, resultInvalid, false, 'Invalid email found.');
                }
            });

            add('o2.Validator.isUrl SHOULD match a valid url.', {
                count : 7,
                test : function() {
                    var me = this;

                    var url1 = 'http://www.example.com';
                    var url2 = 'https://www.example.com';
                    var url3 = 'http://example.com';
                    var url4 = 'https://example.com';
                    var url5 = 'example.com';
                    var url6 = 'ftp://www.example.com';
                    var url7 = 'ftp://example.com/';

                    var isValid1 = o2.Validator.isUrl(url1);
                    var isValid2 = o2.Validator.isUrl(url2);
                    var isValid3 = o2.Validator.isUrl(url3);
                    var isValid4 = o2.Validator.isUrl(url4);
                    var isValid5 = o2.Validator.isUrl(url5);
                    var isValid6 = o2.Validator.isUrl(url6);
                    var isValid7 = o2.Validator.isUrl(url7);

                    assertStrictEqual(me, isValid1, true, 'url1 is valid');
                    assertStrictEqual(me, isValid2, true, 'url2 is valid');
                    assertStrictEqual(me, isValid3, true, 'url3 is valid');
                    assertStrictEqual(me, isValid4, true, 'url4 is valid');
                    assertStrictEqual(me, isValid5, false, 'url5 is NOT valid');
                    assertStrictEqual(me, isValid6, true, 'url6 is valid');
                    assertStrictEqual(me, isValid7, true, 'url7 is valid');
                }
            });

            add('o2.Validator.isWhiteSpace SHOULD match whitespace-only strings.', {
               count : 2,
               test : function() {
                   var me = this;

                   var testWhitespace = '   \t \r   \n \r\n   \t ';
                   var testNotWhitespace = '   \t \r.   \n \r\n   \t ';

                   var isWhitespace1 = o2.Validator.isWhitespace(testWhitespace);
                   var isWhitespace2 = o2.Validator.isWhitespace(testNotWhitespace);

                   assertStrictEqual(me, isWhitespace1, true, 'first string is whitespace');
                   assertStrictEqual(me, isWhitespace2, false, 'second string is NOT whitespace');
               }
            });

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);
        }
    };

    Suite.init();
}(this.o2));
