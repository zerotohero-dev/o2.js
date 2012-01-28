/**
 * @module   stringhelper.transform
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-28 09:22:59.806447
 * -->
 *
 * <p>This package is responsible for simple <code>String</code> transformation
 * operations.</p>
 */

(function(framework) {
    'use strict';

    /*
     * Aliases
     */
    var me = framework.StringHelper;

    /*
     * Common Regular Expressions
     */
    var kLineBreakToNewLineRegExp = /<br\s*\/?>/g;
    var kNewLineToLineBreakRegExp = /\r\n|\n|\r/g;
    var kRemoveTagsRegExp = /<[\/]?([a-zA-Z0-9]+)[^><]*>/ig;
    var kCamelCaseRegExp = /(\-[a-z])/g;
    var kAllCapsRegExp = /([A-Z])/g;

    /*
     * Common Text
     */
    var kNewLine = '\n';
    var kBr = '<br />';
    var kUnderscore = '_';
    var kDash = '-';
    var kEmpty  = '';
    var kEllipsis = '&hellip;';

    /*
     * <p>Maximum length, after which the string is truncated with an
     * ellipsis (...)</p>
     */
    var kTruncationLength = 100;

    /**
     * @function {static} o2.StringHelper.br2nl
     *
     * <p>Replaces HTML [br /] tags with new line.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    me.br2nl = function(str) {
        return str.replace(kLineBreakToNewLineRegExp, kNewLine);
    };

    /**
     * @function {static} o2.StringHelper.nl2br
     *
     * <p>Replaces new lines [\n] with HTML [br /] tags.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    me.nl2br = function(str) {
        return str.replace(kNewLineToLineBreakRegExp, kBr);
    };

    /**
     * @function {static} o2.StringHelper.removeTags
     *
     * <p>Removes all the <strong>HTML</strong> tags in the
     * <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the cleaned output.
     */
    me.removeTags = function(str) {
        return str.replace(kRemoveTagsRegExp, kEmpty);
    };

    /**
     * @function {static} o2.StringHelper.truncate
     *
     * <p>Adds an ellipsis (&hellip;), if the length of the <code>String</code>
     * is greater than <code>maxLength</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     * @param {Integer} maxLen - Optional (defaults TRUNCATION_LENGTH},
     * maximum <code>String</code> length that's allowed without truncation.
     *
     * @return the processed <code>String</code>.
     */
    me.truncate = function(str, maxLen) {
        var ellipsis = kEllipsis;
        var eLen = ellipsis.length;
        var maxLength = maxLen || kTruncationLength;

        if (str.length > maxLength) {
            return [str.substr(0, maxLength - eLen), ellipsis].join(kEmpty);
        }

        return str;
    };

    /**
     * @function {static} o2.StringHelper.toCamelCase
     *
     * <p>Converts the input to camel case.</p>
     * <p>i.e. if input is 'lorem-ipsum', the output is 'loremIpsum'.</p>
     * <p>This is especially useful for converting <code>CSS</code> classes
     * to their <strong>DOM</strong> style representations.</p>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted String.
     */
    me.toCamelCase = function(input) {
        return input.replace(kCamelCaseRegExp, function(match) {
            return match.toUpperCase().replace(kDash, kEmpty);
        });
    };

    /**
     * @function {static} o2.StringHelper.toDashedFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem-ipsum'.</p>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted <code>String</code>.
     */
    me.toDashedFromCamelCase = function(input) {
        return input.replace(kAllCapsRegExp, function(match) {
            return [kDash, match.toLowerCase()].join(kEmpty);
        });
    };

    /**
     * @function {static} o2.StringHelper.toUnderscoreFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem_ipsum'.</p>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted <code>String</code>.
     */
    me.toUnderscoreFromCamelCase = function(input) {
        return input.replace(kAllCapsRegExp, function(match) {
            return [kUnderscore, match.toLowerCase()].join(kEmpty);
        });
    };

    /**
     * @function {static} o2.StringHelper.toJson
     *
     * <p>Converts the given <code>String</code> to a <strong>JSON</strong>
     * object.</p>
     *
     * @param {String} str - the <code>String</code> to convert.
     * @return the converted <strong>JSON</strong> <code>Object</code>.
     * @throws Exception - if <strong>str</strong> is not a well-formed
     * <strong>JSON</strong> <code>String</code>.
     */
    me.toJson = function(str) {
        return JSON.parse(str);
    };
}(this.o2));
