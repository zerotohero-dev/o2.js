define([
], function(
) {
    'use strict';

        /*
         * Module Exports
         */

    var exports = {},

        /*
         * # Common Regular Expressions
         */

        kEmailRegExp = /[a-z0-9!#$%&'*+\/=?\^_`{|}~\-."]+@[a-z0-9.]+/i,
        kUrlRegExp = new RegExp([
                '^(https?|ftp|file):',
                '\\/\\/[\\-A-Z0-9+&@#\\/%?=~_|!:,.;]*',
                '[\\-A-Z0-9+&@#\\/%=~_|]$'
            ].join(''), 'i'),
        kWhitespaceRegExp = /^\s*$/;

    exports.isEmail = function(mail) {
        return kEmailRegExp.test(mail);
    };

    exports.isUrl = function(url) {
        return kUrlRegExp.test(url);
    };

    exports.isWhitespace = function(text) {
        return kWhitespaceRegExp.test(text);
    };
});
