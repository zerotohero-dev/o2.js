/**
 * @module   string.transform
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-28 21:03:34.339861
 * -->
 *
 * <p>This package is responsible for simple <code>String</code> transformation
 * operations.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');

    /*
     * Module Name
     */
    var kModuleName = 'String';

    /*
     * String (transform)
     */
    var me = create(kModuleName);

    /*
     * Common Regular Expressions
     */
    var kAllCapsRegExp            = /([A-Z])/g;
    var kCamelCaseRegExp          = /(\-[a-z])/g;
    var kLineBreakToNewLineRegExp = /<br\s*\/?>/g;
    var kNewLineToLineBreakRegExp = /\r\n|\n|\r/g;
    var kRemoveTagsRegExp         = /<[\/]?([a-zA-Z0-9]+)[^><]*>/ig;

    /*
     * Common Text
     */
    var kBr               = '<br />';
    var kDash             = '-';
    var kEllipsis         = '&hellip;';
    var kEmpty            = '';
    var kJsonNotSupported = 'JSON support cannot be found!';
    var kNewLine          = '\n';
    var kUnderscore       = '_';

    /*
     * <p>Maximum length, after which the string is truncated with an
     * ellipsis (...)</p>
     */
    var kTruncationLength = 100;

    /**
     * @function {static} o2.String.br2nl
     *
     * <p>Replaces HTML [br /] tags with new line.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    def(me, 'br2nl', function(str) {
        return str.replace(kLineBreakToNewLineRegExp, kNewLine);
    });

    /**
     * @function {static} o2.String.nl2br
     *
     * <p>Replaces new lines [\n] with HTML [br /] tags.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    def(me, 'nl2br', function(str) {
        return str.replace(kNewLineToLineBreakRegExp, kBr);
    });

    /**
     * @function {static} o2.String.removeTags
     *
     * <p>Removes all the <strong>HTML</strong> tags in the
     * <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the cleaned output.
     */
    def(me, 'removeTags', function(str) {
        return str.replace(kRemoveTagsRegExp, kEmpty);
    });

    /**
     * @function {static} o2.String.toCamelCase
     *
     * <p>Converts the input to camel case.</p>
     * <p>i.e. if input is 'lorem-ipsum', the output is 'loremIpsum'.</p>
     * <p>This is especially useful for converting <code>CSS</code> classes
     * to their <strong>DOM</strong> style representations.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted String.
     */
    def(me, 'toCamelCase', function(input) {
        return input.replace(kCamelCaseRegExp, function(match) {
            return match.toUpperCase().replace(kDash, kEmpty);
        });
    });

    /**
     * @function {static} o2.String.toDashedFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem-ipsum'.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted <code>String</code>.
     */
    def(me, 'toDashedFromCamelCase', function(input) {
        return input.replace(kAllCapsRegExp, function(match) {
            return [kDash, match.toLowerCase()].join(kEmpty);
        });
    });

    /**
     * @function {static} o2.String.toJson
     *
     * <p>Converts the given <code>String</code> to a <strong>JSON</strong>
     * object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} str - the <code>String</code> to convert.
     *
     * @return the converted <strong>JSON</strong> <code>Object</code>.
     *
     * @throws Exception - if <strong>str</strong> is not a well-formed
     * <strong>JSON</strong> <code>String</code>.
     */
    def(me, 'toJson', function(str) {
        if (!JSON) {
            throw kJsonNotSupported;
        }

        return JSON.parse(str);
    });

    /**
     * @function {static} o2.String.toUnderscoreFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem_ipsum'.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted <code>String</code>.
     */
    def(me, 'toUnderscoreFromCamelCase', function(input) {
        return input.replace(kAllCapsRegExp, function(match) {
            return [kUnderscore, match.toLowerCase()].join(kEmpty);
        });
    });

    /**
     * @function {static} o2.String.truncate
     *
     * <p>Adds an ellipsis (&hellip;), if the length of the <code>String</code>
     * is greater than <strong>maxLen</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     * @param {Integer} maxLen - Optional (defaults TRUNCATION_LENGTH},
     * maximum <code>String</code> length that's allowed without truncation.
     *
     * @return the processed <code>String</code>.
     */
    def(me, 'truncate', function(str, maxLen) {
        var eLen      = kEllipsis.length;
        var maxLength = maxLen || kTruncationLength;

        if (str.length > maxLength) {
            return [str.substr(0, maxLength - eLen), kEllipsis].join(kEmpty);
        }

        return str;
    });
}(this.o2));
