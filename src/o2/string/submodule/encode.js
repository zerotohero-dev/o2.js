/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, document) {
    'use strict';

    /**
     * @module   string.encode
     *
     * @requires core
     * @requires string.core
     *
     * <p>This package is responsible for encoding and decoding
     * <code>String</code>s.</p>
     */
    fp.ensure(
        'string.encode',
    [
        'core',
        'string.core'
    ]);

    var attr   = fp.getAttr,
        alias  = attr(fp, 'alias'),
        create = attr(fp, 'create'),
        def    = attr(fp, 'define'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'String',

        /*
         * String (encode)
         */
        me = create(kModuleName),

        /*
         * # Mappings
         */

        /*
         *
         */
        xssEncodeNoAmpMap = [
            {regExp: /"/g,  replace: '&#34;'},
            {regExp: /</g,  replace: '&#60;'},
            {regExp: />/g,  replace: '&#62;'},
            {regExp: /\'/g, replace: '&#39;'}
        ],

        /*
         *
         */
        xssEncodeMap = [
            {regExp: /"/g,  replace: '&#34;'},
            {regExp: /&/g,  replace: '&amp;'},
            {regExp: /</g,  replace: '&#60;'},
            {regExp: />/g,  replace: '&#62;'},
            {regExp: /\'/g, replace: '&#39;'}
        ],

        /*
         *
         */
        encodeMap = [
            {regExp: / /g,  replace: '&nbsp;'},
            {regExp: /"/g,  replace: '&#34;' },
            {regExp: /&/g,  replace: '&amp;' },
            {regExp: /</g,  replace: '&#60;' },
            {regExp: />/g,  replace: '&#62;' },
            {regExp: /\'/g, replace: '&#39;' }
        ],

        /*
         *
         */
        //TODO: [[/stuff/, 'repl'],[/stuff2/, 'repl2']] would save space.
        decodeMap = [
            {regExp: /&#32;|&nbsp;/g,         replace: ' ' },
            {regExp: /&#34;|&quot;|&quott;/g, replace: '"' },
            {regExp: /&#39;|&apos;|&aposs;/g, replace: '\''},
            {regExp: /&#60;|&lt;/g,           replace: '<' },
            {regExp: /&#62;|&gt;/g,           replace: '>' },
            {regExp: /&#38;|&amp;/g,          replace: '&' }
        ],

        /*
         *
         */
        safeHtmlMap = [
            {regExp : /"/g, replace : '&quot;'},
            {regExp : /'/g, replace : '&#39;' }
        ],

        /*
         * # Common Text
         */

        kEmpty     = '',
        kContainer = 'div',

        /*
         * # Temporary
         */

        tempDiv = null;

    /*
     *
     */
    function processMap(str, map) {
        var i       = 0,
            len     = 0,
            mapItem = null,
            result  = str;

        for (i = 0, len = map.length; i < len; i++) {
            mapItem = map[i];
            result = result.replace(mapItem.regExp, mapItem.replace);
        }

        return result;
    }

    /**
     * @function {static} o2.String.decode
     *
     * <p>Decodes <strong>HTML</strong> entities back to normal characters.</p>
     * <p>If possible try using standard decoding methods like
     * <code>decodeURIComponent</code>, instead of using this method.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var decoded = o2.String.decode(encodedString);
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */
    exports.decode = def(me, 'decode', function(str) {
        return processMap([kEmpty, str].join(kEmpty), decodeMap);
    });

    /**
     * @function {static} o2.String.encode
     *
     * <p>Encodes special charaters to their corresponding <strong>HTML</strong>
     * entities.</p>
     * <p>If possible try using standard encoding methods like
     * <code>encodeURIComponent</code>,
     * instead of using this method.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var encoded = o2.String.decode(inputString);
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */
    exports.encode = def(me, 'encode', function(str) {
        return processMap([kEmpty, str].join(kEmpty), encodeMap);
    });

    /**
     * @function {static} o2.String.htmlEncode
     *
     * <p>An <strong>alias</strong> to {@link o2.String.encode}.</p>
     *
     * @see o2.String.encode
     */
    exports.htmlEncode = alias(me, 'htmlEncode', 'encode');

    /**
     * @function {static} o2.String.encodeSafeHtml
     *
     * <p>Works similar to {@link o2.String.encode}.</p>
     * <p>Encodes the <code>String</code> by converting it into a text node
     * and returning the node's value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var encoded = o2.String.encodeSafeHtml(inputString);
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     *
     * @see o2.String.encode
     */
    exports.encodeSafeHtml = def(me, 'encodeSafeHtml', function(str) {
        if (!tempDiv) {
            tempDiv = document.createElement(kContainer);
        }

        tempDiv.innerHTML = kEmpty;

        tempDiv.appendChild(
            document.createTextNode([kEmpty, str].join(kEmpty))
        );

        return processMap(tempDiv.innerHTML, safeHtmlMap);
    });

    /**
     * @function {static} o2.String.safeHtmlEncode
     *
     * <p>An <strong>alias</strong> to
     * {@link o2.String.encodeSafeHtml}.</p>
     *
     * @see o2.String.encodeSafeHtml
     */
    exports.safeHtmlEncode = alias(me, 'safeHtmlEncode', 'encodeSafeHtml');

    /**
     * @function {static} o2.String.escape
     *
     * <p>An <strong>alias</strong> to <code>encodeURIComponent</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */
    exports.escape = def(me, 'escape', function(str) {
        return encodeURIComponent([kEmpty, str].join(kEmpty));
    });

    /**
     * @function {static} o2.String.unescape
     *
     * <p>An <strong>alias</strong> to <code>decodeURIComponent</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */
    exports.unescape = def(me, 'unescape', function(str) {
        return decodeURIComponent([kEmpty, str].join(kEmpty));
    });

    /**
     * @function {static} o2.String.xssEncode
     *
     * <p>Encodes special charaters to their corresponding <strong>HTML</strong>
     * entities. Works similar to {link String.encode}, with an
     * exception that it does not encode whitespace characters.</p>
     * <p>This method is specially designed to prevent cross-site script
     * injection attacks.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var encoded = o2.String.xssEncode(inputString);
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process
     * @param {Boolean} isAmpersandsPreserved - (Optional. Defaults to
     * <code>false</code>). If <code>true</code> & characters will not be
     * encoded, otherwise they will be.
     *
     * @return the processed <code>String</code>.
     */
    exports.xssEncode = def(me, 'xssEncode', function(str,
                isAmpersandsPreserved) {
        return processMap([kEmpty, str].join(kEmpty),
            !!isAmpersandsPreserved ? xssEncodeNoAmpMap : xssEncodeMap
        );
    });
}(this.o2, this.o2.protecteds, this.document));

