/**
 * @module   stringhelper.encode
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-09 08:51:22.827412
 * -->
 *
 * <p>Responsible for encoding and decoding <strong>String</strong>s.</p>
 */
(function(framework, document) {
    'use strict';

    var use = framework.require;

    /*
     *
     */
    var xssEncodeNoAmpMap = [
        {regExp : /</g,  replace : '&#60;'},
        {regExp : />/g,  replace : '&#62;'},
        {regExp : /"/g,  replace : '&#34;'},
        {regExp : /\'/g, replace : '&#34;'}
    ];

    /*
     *
     */
    var xssEncodeMap = [
        {regExp : /&/g,  replace : '&amp;'},
        {regExp : /</g,  replace : '&#60;'},
        {regExp : />/g,  replace : '&#62;'},
        {regExp : /"/g,  replace : '&#34;'},
        {regExp : /\'/g, replace : '&#34;'}
    ];

    /*
     *
     */
    var encodeMap = [
        {regExp : /&/g,  replace : '&amp;' },
        {regExp : /</g,  replace : '&#60;' },
        {regExp : />/g,  replace : '&#62;' },
        {regExp : /"/g,  replace : '&#34;' },
        {regExp : /\'/g, replace : '&#34;' },
        {regExp : / /g,  replace : '&nbsp;'}
    ];

    /*
     *
     */
    var decodeMap = [
        {regExp : /&#60;|&lt;/g,           replace : '<'},
        {regExp : /&#62;|&gt;/g,           replace : '>'},
        {regExp : /&#34;|&quot;|&quott;/g, replace : '"'},
        {regExp : /&#39;|&apos;|&aposs;/g, replace : "'"},
        {regExp : /&#32;|&nbsp;/g,         replace : ' '},
        {regExp : /&#38;|&amp;/g,          replace : '&'}
    ];

    /*
     *
     */
    var safeHtmlMap = [
        {regExp : /"/g, replace : '&quot;'},
        {regExp : /'/g, replace : '&#39;' }
    ];

    /*
     *
     */
    function processMap(str, map) {
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

    /*
     * Aliases
     */
    var me = use(framework.StringHelper);
    var concat = use(me.concat);

    /*
     * Common Text
     */
    var kEmpty = '';
    var kContainer = 'div';

    /*
     *
     */
    var tempDiv = null;

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
        return processMap(concat(kEmpty, str),
            !!isAmpersandsPreserved ? xssEncodeNoAmpMap : xssEncodeMap
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
        return processMap(concat(kEmpty, str), encodeMap);
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
        return processMap(concat(kEmpty, str), decodeMap);
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
        return encodeURIComponent(concat(kEmpty, str));
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
        return decodeURIComponent(concat(kEmpty, str));
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
        if (!tempDiv) {
            tempDiv = document.createElement(kContainer);
        }

        tempDiv.innerHTML = kEmpty;
        tempDiv.appendChild(document.createTextNode(concat(kEmpty, str)));

        return processMap(tempDiv.innerHTML, safeHtmlMap);
    };
}(this.o2, this.document));
