/**
 * @module   stringhelper.encode
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-22 17:57:15.630658
 * -->
 *
 * <p>Responsible for encoding and decoding <strong>String</strong>s.</p>
 */

(function(framework, document) {
    'use strict';

    /*
     *
     */
    var Map = {

        /*
         *
         */
        xssEncodeNoAmp : [
            {regExp : /</g,  replace : '&#60;'},
            {regExp : />/g,  replace : '&#62;'},
            {regExp : /"/g,  replace : '&#34;'},
            {regExp : /\'/g, replace : '&#34;'}
        ],

        /*
         *
         */
        xssEncode : [
            {regExp : /&/g,  replace : '&amp;'},
            {regExp : /</g,  replace : '&#60;'},
            {regExp : />/g,  replace : '&#62;'},
            {regExp : /"/g,  replace : '&#34;'},
            {regExp : /\'/g, replace : '&#34;'}
        ],

        /*
         *
         */
        encode : [
            {regExp : /&/g,  replace : '&amp;' },
            {regExp : /</g,  replace : '&#60;' },
            {regExp : />/g,  replace : '&#62;' },
            {regExp : /"/g,  replace : '&#34;' },
            {regExp : /\'/g, replace : '&#34;' },
            {regExp : / /g,  replace : '&nbsp;'}
        ],

        /*
         *
         */
        decode : [
            {regExp : /&#60;|&lt;/g,           replace : '<'},
            {regExp : /&#62;|&gt;/g,           replace : '>'},
            {regExp : /&#34;|&quot;|&quott;/g, replace : '"'},
            {regExp : /&#39;|&apos;|&aposs;/g, replace : "'"},
            {regExp : /&#32;|&nbsp;/g,         replace : ' '},
            {regExp : /&#38;|&amp;/g,          replace : '&'}
        ],

        /*
         *
         */
        safeHtml : [
            {regExp : /"/g, replace : '&quot;'},
            {regExp : /'/g, replace : '&#39;' }
        ],

        /*
         *
         */
        process : function(str, map) {
            var i = 0;
            var len = 0;
            var mapItem = null;
            var result = str;

            for (i = 0, len = map.length; i < len; i++) {
                mapItem = map[i];
                result = result.replace(mapItem.regExp, mapItem.replace);
            }

            return result;
        }
    };

    /*
     * Aliases.
     */
    var me      = framework.StringHelper;
    var process = Map.process;

    /*
     * Common Text
     */
    var kEmpty     = '';
    var kContainer = 'div';

    /*
     *
     */
    var state = {
        tempDiv : null
    };

    /**
     * @function {static} o2.StringHelper.xssEncode
     *
     * <p>Encodes special charaters to their corresponding <strong>HTML</strong>
     * entities. Works similar to {link StringHelper.encode}, with an
     * exception that it does not encode whitespace characters.</p>
     * <p>This method is specially designed to prevent cross-site script
     * injection attacks.</p>
     *
     * @param {String} str - the <strong>String</strong> to process
     * @param {Boolean} isAmpersandsPreserved - (Optional. Defaults to
     * <code>false</code>). If <code>true</code> & characters will not be
     * encoded, otherwise they will be.
     *
     * @return the processed <strong>String</strong>.
     */
    me.xssEncode = function(str, isAmpersandsPreserved) {
        return process(
            [kEmpty, str].join(kEmpty),
            !!isAmpersandsPreserved ? Map.xssEncodeNoAmp : Map.xssEncode
        );
    };

    /**
     * @function {static} o2.StringHelper.encode
     *
     * <p>Encodes special charaters to their corresponding <strong>HTML</strong>
     * entities.</p>
     * <p>If possible try using standard encoding methods like
     * <code>encodeURIComponent</code>,
     * instead of using this method.</p>
     *
     * @param {String} str - the <strong>String</strong> to process.
     *
     * @return the processed <strong>String</strong>.
     */
    me.encode = function(str) {
        return process([kEmpty, str].join(kEmpty), Map.encode);
    };

    /**
     * @function {static} o2.StringHelper.decode
     *
     * <p>Decodes <strong>HTML</strong> entities back to normal characters.</p>
     * <p>If possible try using standard decoding methods like
     * <code>decodeURIComponent</code>, instead of using this method.</p>
     *
     * @param {String} str - the <strong>String</strong> to process.
     *
     * @return the processed <strong>String</strong>.
     */
    me.decode = function(str) {
        return process([kEmpty, str].join(kEmpty), Map.decode);
    };

    /**
     * @function {static} o2.StringHelper.escape
     *
     * <p>An <strong>alias</strong> to <code>encodeURIComponent</code>.</p>
     *
     * @param {String} str - the <strong>String</strong> to process.
     *
     * @return the processed <strong>String</strong>.
     */
    me.escape = function(str) {
        return encodeURIComponent([kEmpty, str].join(kEmpty));
    };

    /**
     * @function {static} o2.StringHelper.unescape
     *
     * <p>An <strong>alias</strong> to <code>decodeURIComponent</code>.</p>
     *
     * @param {String} str - the <strong>String</strong> to process.
     *
     * @return the processed <strong>String</strong>.
     */
    me.unescape = function(str) {
        return decodeURIComponent([kEmpty, str].join(kEmpty));
    };

    /**
     * @function {static} o2.StringHelper.encodeSafeHtml
     *
     * <p>Encodes the <strong>String</strong> by converting it into a text node
     * and returning the node's value.</p>
     *
     * @param {String} str - the <strong>String</strong> to process.
     *
     * @return the processed <strong>String</strong>.
     */
    me.encodeSafeHtml = function(str) {
        var tmp = state.tempDiv;

        if (!tmp) {
            state.tempDiv = document.createElement(kContainer);
        }

        tmp.innerHTML = kEmpty;
        tmp.appendChild(document.createTextNode([kEmpty, str].join(kEmpty)));

        return process(tmp.innerHTML, Map.safeHtml);
    };
}(this.o2, this.document));
