/*global window, o2*/

/*
 * Copyright © by Volkan Özçelik - http://o2js.com/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

if(!o2.Validator) {
    o2.Validator = {};
}

/**
 * @module o2.validator.regexp
 * @requires o2
 *
 * <p>Does validation by matching test subjects against predefined
 * <strong>regular expression</strong>s.<p>
 */
( function(me, window, UNDEFINED) {

    /*
     * Module configuration.
     */
    var config = {
        constants : {
            regExp : {
                EMAIL : /[a-z0-9!#$%&'*+\/=?\^_`{|}~\-."]+@[a-z0-9.]+/i,
                URL : /^(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|]$/i,
                WHITESPACE : /^\s*$/
            }
        }
    };

    /**
     * @function {static} o2.Validator.isEmail
     *
     * <p>Did you know that <code>Abc\@def@example.com</code>, and
     * <code>customer/department=shipping@example.com</code> are all valid
     * e-mails?</p>
     * <p>There is no good (and realistic) regular expression to match an e-mail
     * address.<p>
     * <p>The grammar ( http://www.ietf.org/rfc/rfc5322.txt ) is too complicated
     * for
     * that.</p>
     * <p>This method matches <strong>e-mail</strong> addresses, while giving
     * some
     * false
     * positives.</p>
     * <p>The correct action to validate an <strong>e-mail</strong> address is to
     * validate by trying
     * (i.e. try sending an account activation <strong>e-mail</strong> to a newly
     * registered user, for
     * example.).</p>
     *
     * @param {String} mail - the <strong>e-mail</strong> address to test.
     * @return <code>true</code> if the <strong>e-mail</strong> address is a
     * potentially valid e-mail,
     * <code>false</code> otherwise.
     */
    me.isEmail = function(mail) {

        return (config.constants.regExp.EMAIL).test(mail);

    };

    /**
     * @function {static} o2.Validator.isValidUrl
     *
     * <p>Checks whether the given argument is a valid <strong>URL</strong>
     * address.</p>
     *
     * @param {String} url - the address to check.
     * @return <code>true</code> if the address is a valid <strong>URL</strong>,
     * <code>false</code> otherwise.
     */
    me.isValidUrl = function(url) {

        return (config.constants.regExp.URL).test(url);

    };

    /**
     * @function {static} o2.Validator.isWhitespace
     *
     * <p>Checks whether the given argument consists of only whitespace
     * characters.</p>
     *
     * @param {String} text - the text to check.
     * @return <code>true</code> if the argument consists of only whitespace
     * characters, <code>false</code> otherwise.
     */
    me.isWhitespace = function(text) {

        return (config.constants.regExp.WHITESPACE).test(text);

    };

}(o2.Validator, this));
