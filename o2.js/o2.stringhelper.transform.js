/**
 * @module stringhelper.transform
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>This package is responsible for simple <code>String</code> transformation
 * operations.</p>
 */
(function(framework) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.StringHelper;

    /**
     * @struct {private} o2.StringHelper.config
     *
     * <p>Module configuration.</p>
     */
    var config = {

        /**
         *
         */
        constants : {

            /**
             * @property {private const Integer}
             * o2.StringHelper.config.constants.TRUNCATION_LENGTH
             *
             * <p>Maximum length, after which the string is truncated with an
             * ellipsis
             * (...)</p>
             */
            TRUNCATION_LENGTH : 100,

            /*
             *
             */
            regExp : {
                BR_2_NL : /<br\s*\/?>/g,
                NL_2_BR : /\r\n|\n|\r/g,
                REMOVE_TAGS : /<[\/]?([a-zA-Z0-9]+)[^><]*>/ig,
                CAMEL_CASE : /(\-[a-z])/g,
                ALL_CAPS : /([A-Z])/g
            },

            /*
             *
             */
            text : {
                ELLIPSIS : '&hellip;',
                DASH : '-',
                UNDERSCORE : '_',
                NEW_LINE : '\n',
                BR : '<br />',
                EMPTY : ''
            }
        }
    };

    var constants = config.constants;
    var kLineBreakToNewLineRegExp = constants.regExp.BR_2_NL;
    var kNewLineToLineBreakRegExp = constants.regExp.NL_2_BR;
    var kRegRemoveTags = constants.regExp.REMOVE_TAGS;
    var kRegCamelCase = constants.regExp.CAMEL_CASE;
    var kRegAllCaps = constants.regExp.ALL_CAPS;
    var kNewLine = constants.text.NEW_LINE;
    var kBr = constants.text.BR;
    var kUnderscore = constants.text.UNDERSCORE;
    var kDash = constants.text.DASH;
    var kEmpty = constants.text.EMPTY;
    var kEllipsis = constants.text.ELLIPSIS;
    var kTruncationLength = constants.TRUNCATION_LENGTH;

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
        return str.replace(kRegRemoveTags, kEmpty);
    };

    /**
     * @function {static} o2.StringHelper.truncate
     *
     * <p>Adds an ellipsis (&hellip;), if the length of the <code>String</code>
     * is greater than <code>maxLength</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     * @param {Integer} maxLen - Optional (defaults to
     * {@link o2.StringHelper.config.constants.TRUNCATION_LENGTH},
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
        return input.replace(kRegCamelCase, function(match) {
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
        return input.replace(kRegAllCaps, function(match) {
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
        return input.replace(kRegAllCaps, function(match) {
            return [kUnderscore, match.toLowerCase()].join(kEmpty);
        });
    };
}(this.o2));
