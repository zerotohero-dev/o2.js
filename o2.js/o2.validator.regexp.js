/**
 * @module   validator.regexp
 * @requires validator.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-22 00:23:18.847512
 * -->
 *
 * <p>Does validation by matching test subjects against predefined
 * <strong>regular expression</strong>s.<p>
 */
(function(framework) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.Validator;

    /*
     * Module configuration.
     */
    var config = {

        /*
         *
         */
        constants : {

            /*
             *
             */
            regExp : {
                EMAIL : /[a-z0-9!#$%&'*+\/=?\^_`{|}~\-."]+@[a-z0-9.]+/i,
                URL : /^(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|]$/i,
                WHITESPACE : /^\s*$/
            }
        }
    };

    /*
     * Common regular expressions.
     */
    var ccr               = config.constants.regExp;
    var kEmailRegExp      = ccr.EMAIL;
    var kUrlRegExp        = ccr.URL;
    var kWhitespaceRegExp = ccr.WHITESPACE;

    /**
     * @function {static} o2.Validator.isEmail
     *
     * <p>Did you know that <code>Abc\@def@example.com</code>, and
     * <code>customer/department=shipping@example.com</code> are all valid
     * e-mails?</p>
     * <p>There is no good (and realistic) regular expression to match an e-mail
     * address.<p>
     * <p>The grammar ( http://www.ietf.org/rfc/rfc5322.txt ) is too complicated
     * for that.</p>
     * <p>This method matches <strong>e-mail</strong> addresses, while giving
     * some false-positives.</p>
     * <p>The correct action to validate an <strong>e-mail</strong> address is to
     * validate by trying
     * (i.e. try sending an account activation <strong>e-mail</strong> to a newly
     * registered user, for example.).</p>
     *
     * @param {String} mail - the <strong>e-mail</strong> address to test.
     *
     * @return <code>true</code> if the <strong>e-mail</strong> address is a
     * potentially valid e-mail, <code>false</code> otherwise.
     */
    me.isEmail = function(mail) {
        return kEmailRegExp.test(mail);
    };

    /**
     * @function {static} o2.Validator.isUrl
     *
     * <p>Checks whether the given argument is a valid <strong>URL</strong>
     * address.</p>
     *
     * @param {String} url - the address to check.
     *
     * @return <code>true</code> if the address is a valid <strong>URL</strong>,
     * <code>false</code> otherwise.
     */
    me.isUrl = function(url) {
        return kUrlRegExp.test(url);
    };

    /**
     * @function {static} o2.Validator.isWhitespace
     *
     * <p>Checks whether the given argument consists of only whitespace
     * characters.</p>
     *
     * @param {String} text - the text to check.
     *
     * @return <code>true</code> if the argument consists of only whitespace
     * characters, <code>false</code> otherwise.
     */
    me.isWhitespace = function(text) {
        return kWhitespaceRegExp.test(text);
    };
}(this.o2));
