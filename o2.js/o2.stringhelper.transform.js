/*global o2 */

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
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework.StringHelper;

    /**
     * @struct {private} StringHelper.config
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
             * StringHelper.config.constants.TRUNCATION_LENGTH
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
                BR : '<br />'
            }
        }
    };

    /**
     * @function {static} StringHelper.br2nl
     *
     * <p>Replaces HTML [br /] tags with new line.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
     */
    me.br2nl = function(str) {

        var constants = config.constants;

        return str.replace(constants.regExp.BR_2_NL, constants.text.NEW_LINE);

    };

    /**
     * @function {static} StringHelper.nl2br
     *
     * <p>Replaces new lines [\n] with HTML [br /] tags.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
     */
    me.nl2br = function(str) {

        var constants = config.constants;

        return str.replace(constants.regExp.NL_2_BR, constants.text.BR);

    };

    /**
     * @function {static} StringHelper.removeTags
     *
     * <p>Removes all the <strong>HTML</strong> tags in the
     * <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     * @return the cleaned output.
     */
    me.removeTags = function(str) {

        return str.replace(config.constants.regExp.REMOVE_TAGS, '');

    };

    /**
     * @function {static} StringHelper.truncate
     *
     * <p>Adds an ellipsis (&hellip;), if the length of the <code>String</code>
     * is
     * greater
     * than <code>maxLength</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     * @param {Integer} maxLen - Optional (defaults to
     * {@link StringHelper.config.constants.TRUNCATION_LENGTH},
     * maximum <code>String</code> length that's allowed without truncation.
     * @return the processed <code>String</code>.
     */
    me.truncate = function(str, maxLen) {

        var ellipsis = config.constants.text.ELLIPSIS;
        var eLen = ellipsis.length;
        var maxLength = maxLen ? maxLen : config.constants.TRUNCATION_LENGTH;

        if(str.length > maxLength) {
        
            return [str.substr(0, maxLength - eLen), ellipsis].join('');
        }

        return str;

    };

    /**
     * @function {static} StringHelper.toCamelCase
     *
     * <p>Converts the input to camel case.</p>
     * <p>i.e. if input is 'lorem-ipsum', the output is 'loremIpsum'.</p>
     * <p>This is especially useful for converting <code>CSS</code> classes
     * to their <strong>DOM</strong> style representations.</p>
     *
     * @param {String} input - the <code>String</code> to convert.
     * @return the formatted String.
     */
    me.toCamelCase = function(input) {

        var constants = config.constants;

        return input.replace(constants.regExp.CAMEL_CASE, function(match) {
            
            return match.toUpperCase().replace(constants.text.DASH, '');
        
        });

    };

    /**
     * @function {static} StringHelper.toDashedFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem-ipsum'.</p>
     *
     * @param {String} input - the <code>String</code> to convert.
     * @return the formatted <code>String</code>.
     */
    me.toDashedFromCamelCase = function(input) {

        var constants = config.constants;

        return input.replace(constants.regExp.ALL_CAPS, function(match) {
            
            return [constants.text.DASH, match.toLowerCase()].join('');
        
        });

    };

    /**
     * @function {static} StringHelper.toUnderscoreFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem_ipsum'.</p>
     *
     * @param {String} input - the <code>String</code> to convert.
     * @return the formatted <code>String</code>.
     */
    me.toUnderscoreFromCamelCase = function(input) {

        var constants = config.constants;

        return input.replace(constants.regExp.ALL_CAPS, function(match) {
            
            return [constants.text.UNDERSCORE, match.toLowerCase()].join('');
        
        });

    };

}(o2, this));
