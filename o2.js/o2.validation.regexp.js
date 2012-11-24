/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(fp) {
    'use strict';

     /**
      * @module   validation.regexp
      *
      * @requires core
      *
      * <p>Does validation by matching test subjects against predefined
      * <strong>regular expression</strong>s.<p>
      */
    fp.ensure(
        'validation.regexp',
    [
        'core'
    ]);

    var attr   = fp.getAttr,
        create = attr(fp, 'create'),
        def    = attr(fp, 'define'),

        /*
         * Module Exports
         */

        exports = {},

        /*
         * Module Definition
         */

        kModuleName = 'Validation',

        /*
         * Validation (regexp)
         */
        me = create(kModuleName),

        /*
         * # Common Regular Expressions
         */

        kEmailRegExp      = /[a-z0-9!#$%&'*+\/=?\^_`{|}~\-."]+@[a-z0-9.]+/i,
        kUrlRegExp        = new RegExp([
                '^(https?|ftp|file):',
                '\\/\\/[\\-A-Z0-9+&@#\\/%?=~_|!:,.;]*',
                '[\\-A-Z0-9+&@#\\/%=~_|]$'
            ].join(''), 'i'),
        kWhitespaceRegExp = /^\s*$/;

    /**
     * @function {static} o2.Validation.isEmail
     *
     * <p>Did you know that <code>Abc\@def@example.com</code>, and
     * <code>customer/department=shipping@example.com</code> are all valid
     * e-mails?</p>
     * <p>There is no good (and realistic) regular expression to match an
     * e-mail address.<p>
     * <p>The grammar ( http://www.ietf.org/rfc/rfc5322.txt ) is too
     * complicated for that.</p>
     * <p>This method matches <strong>e-mail</strong> addresses, while giving
     * some false-positives.</p>
     * <p>The correct action to validate an <strong>e-mail</strong> address is
     * to validate by trying
     * (i.e. try sending an account activation <strong>e-mail</strong> to a
     * newly registered user, for example.).</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isEmail = o2.Validation.isEmail('volkan@o2js.com');
     * </pre>
     *
     * @param {String} mail - the <strong>e-mail</strong> address to test.
     *
     * @return <code>true</code> if the <strong>e-mail</strong> address is a
     * potentially valid e-mail, <code>false</code> otherwise.
     */
    exports.isEmail = def(me, 'isEmail', function(mail) {
        return kEmailRegExp.test(mail);
    });

    /**
     * @function {static} o2.Validation.isUrl
     *
     * <p>Checks whether the given argument is a valid <strong>URL</strong>
     * address.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isUrl = o2.Validation.isUrl('http://o2js.com/');
     * </pre>
     *
     * @param {String} url - the address to check.
     *
     * @return <code>true</code> if the address is a valid <strong>URL</strong>,
     * <code>false</code> otherwise.
     */
    exports.isUrl = def(me, 'isUrl', function(url) {
        return kUrlRegExp.test(url);
    });

    /**
     * @function {static} o2.Validation.isWhitespace
     *
     * <p>Checks whether the given argument consists of only whitespace
     * characters.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isWhitespace = o2.Validation.isWhitespace('  \t\r\n   \n  ');
     * </pre>
     *
     * @param {String} text - the text to check.
     *
     * @return <code>true</code> if the argument consists of only whitespace
     * characters, <code>false</code> otherwise.
     */
    exports.isWhitespace = def(me, 'isWhitespace', function(text) {
        return kWhitespaceRegExp.test(text);
    });
}(this.o2.protecteds));

