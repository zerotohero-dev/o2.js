/**
 * @module   stringhelper.encode
 * @requires core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-26 14:16:34.732102
 * -->
 *
 * <p>Responsible for encoding and decoding <code>String</code>s.</p>
 */
(function(framework, document) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var alias     = attr(_, 'alias');
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');

    /*
     * StringHelper (encode)
     */
    var me = create('StringHelper');

    /*
     * Aliases
     */
    var createElement  = attr(document, 'createElement');
    var createTextNode = attr(document, 'createTextNode');

    /*
     *
     */
    var xssEncodeNoAmpMap = [
        {regExp : /"/g,  replace : '&#34;'},
        {regExp : /</g,  replace : '&#60;'},
        {regExp : />/g,  replace : '&#62;'},
        {regExp : /\'/g, replace : '&#39;'}
    ];

    /*
     *
     */
    var xssEncodeMap = [
        {regExp : /"/g,  replace : '&#34;'},
        {regExp : /&/g,  replace : '&amp;'},
        {regExp : /</g,  replace : '&#60;'},
        {regExp : />/g,  replace : '&#62;'},
        {regExp : /\'/g, replace : '&#39;'}
    ];

    /*
     *
     */
    var encodeMap = [
        {regExp : / /g,  replace : '&nbsp;'},
        {regExp : /"/g,  replace : '&#34;' },
        {regExp : /&/g,  replace : '&amp;' },
        {regExp : /</g,  replace : '&#60;' },
        {regExp : />/g,  replace : '&#62;' },
        {regExp : /\'/g, replace : '&#39;' }
    ];

    /*
     *
     */
    var decodeMap = [
        {regExp : /&#32;|&nbsp;/g,         replace : ' '},
        {regExp : /&#34;|&quot;|&quott;/g, replace : '"'},
        {regExp : /&#39;|&apos;|&aposs;/g, replace : "'"},
        {regExp : /&#60;|&lt;/g,           replace : '<'},
        {regExp : /&#62;|&gt;/g,           replace : '>'},
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
     * Common Text
     */
    var kEmpty     = '';
    var kContainer = 'div';

    /*
     *
     */
    var tempDiv = null;

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

    /**
     * @function {static} o2.StringHelper.decode
     *
     * <p>Decodes <strong>HTML</strong> entities back to normal characters.</p>
     * <p>If possible try using standard decoding methods like
     * <code>decodeURIComponent</code>, instead of using this method.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */
    def(me, 'decode', function(str) {
        return processMap([kEmpty, str].join(kEmpty), decodeMap);
    });

    /**
     * @function {static} o2.StringHelper.encode
     *
     * <p>Encodes special charaters to their corresponding <strong>HTML</strong>
     * entities.</p>
     * <p>If possible try using standard encoding methods like
     * <code>encodeURIComponent</code>,
     * instead of using this method.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */
    def(me, 'encode', function(str) {
        return processMap([kEmpty, str].join(kEmpty), encodeMap);
    });

    /**
     * @function {static} o2.StringHelper.htmlEncode
     *
     * <p>An <strong>alias</strong> to {@link o2.StringHelper.encode}.</p>
     *
     * @see o2.StringHelper.encode
     */
    alias(me, 'htmlEncode', 'encode');

    /**
     * @function {static} o2.StringHelper.encodeSafeHtml
     *
     * <p>Works similar to {@link o2.StringHelper.encode}.</p>
     * <p>Encodes the <code>String</code> by converting it into a text node
     * and returning the node's value.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     *
     * @see o2.StringHelper.encode
     */
    def(me, 'encodeSafeHtml', function(str) {
        if (!tempDiv) {
            tempDiv = createElement(kContainer);
        }

        tempDiv.innerHTML = kEmpty;
        tempDiv.appendChild(createTextNode([kEmpty, str].join(kEmpty)));

        return processMap(tempDiv.innerHTML, safeHtmlMap);
    });

    /**
     * @function {static} o2.StringHelper.safeHtmlEncode
     *
     * <p>An <strong>alias</strong> to
     * {@link o2.StringHelper.encodeSafeHtml}.</p>
     *
     * @see o2.StringHelper.encodeSafeHtml
     */
    alias(me, 'safeHtmlEncode', 'encodeSafeHtml');

    /**
     * @function {static} o2.StringHelper.escape
     *
     * <p>An <strong>alias</strong> to <code>encodeURIComponent</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */
    def(me, 'escape', function(str) {
        return encodeURIComponent([kEmpty, str].join(kEmpty));
    });

    /**
     * @function {static} o2.StringHelper.unescape
     *
     * <p>An <strong>alias</strong> to <code>decodeURIComponent</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */
    def(me, 'unescape', function(str) {
        return decodeURIComponent([kEmpty, str].join(kEmpty));
    });

    /**
     * @function {static} o2.StringHelper.xssEncode
     *
     * <p>Encodes special charaters to their corresponding <strong>HTML</strong>
     * entities. Works similar to {link StringHelper.encode}, with an
     * exception that it does not encode whitespace characters.</p>
     * <p>This method is specially designed to prevent cross-site script
     * injection attacks.</p>
     *
     * @param {String} str - the <code>String</code> to process
     * @param {Boolean} isAmpersandsPreserved - (Optional. Defaults to
     * <code>false</code>). If <code>true</code> & characters will not be
     * encoded, otherwise they will be.
     *
     * @return the processed <code>String</code>.
     */
    def(me, 'xssEncode', function(str, isAmpersandsPreserved) {
        return processMap([kEmpty, str].join(kEmpty),
            !!isAmpersandsPreserved ? xssEncodeNoAmpMap : xssEncodeMap
        );
    });
}(this.o2, this.document));
