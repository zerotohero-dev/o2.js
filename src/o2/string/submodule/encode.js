require([
], function() {
    'use strict';

        /*
         * # Module Exports
         */

    var  exports = {},

        /*
         * # Mappings
         */

        /*
         *
         */
        xssEncodeNoAmpMap = [
                {regExp: /"/g, replace: '&#34;'},
                {regExp: /</g, replace: '&#60;'},
                {regExp: />/g, replace: '&#62;'},
                {regExp: /\'/g, replace: '&#39;'}
            ],

        /*
         *
         */
        xssEncodeMap = [
                {regExp: /"/g, replace: '&#34;'},
                {regExp: /&/g, replace: '&amp;'},
                {regExp: /</g, replace: '&#60;'},
                {regExp: />/g, replace: '&#62;'},
                {regExp: /\'/g, replace: '&#39;'}
            ],

        /*
         *
         */
        encodeMap = [
                {regExp: / /g, replace: '&nbsp;'},
                {regExp: /"/g, replace: '&#34;'},
                {regExp: /&/g, replace: '&amp;'},
                {regExp: /</g, replace: '&#60;'},
                {regExp: />/g, replace: '&#62;'},
                {regExp: /\'/g, replace: '&#39;'}
            ],

        /*
         *
         */
        //TODO: [[/stuff/, 'repl'],[/stuff2/, 'repl2']] would save space.
        decodeMap = [
                {regExp: /&#32;|&nbsp;/g, replace: ' '},
                {regExp: /&#34;|&quot;|&quott;/g, replace: '"'},
                {regExp: /&#39;|&apos;|&aposs;/g, replace: '\''},
                {regExp: /&#60;|&lt;/g, replace: '<'},
                {regExp: /&#62;|&gt;/g, replace: '>'},
                {regExp: /&#38;|&amp;/g, replace: '&'}
            ],

        /*
         *
         */
        safeHtmlMap = [
                {regExp: /"/g, replace: '&quot;'},
                {regExp: /'/g, replace: '&#39;'}
            ],

        /*
         * # Common Text
         */

        kEmpty = '',
        kContainer = 'div',

        /*
         * # Temporary
         */

        tempDiv = null;

    /*
     *
     */
    function processMap(str, map) {

        // TODO: this is the new convention, do it for the entire codebase,
        // update conventios doc.
        var i, len, mapItem;
        var result = str;

        for (i = 0, len = map.length; i < len; i++) {
            mapItem = map[i];
            result = result.replace(mapItem.regExp, mapItem.replace);
        }

        return result;
    }

    exports.decode = function(str) {
        return processMap([kEmpty, str].join(kEmpty), decodeMap);
    };

    exports.encode = function(str) {
        return processMap([kEmpty, str].join(kEmpty), encodeMap);
    };

    exports.htmlEncode = exports.encode;

    exports.encodeSafeHtml = function(str) {
        if (!tempDiv) {
            tempDiv = document.createElement(kContainer);
        }

        tempDiv.innerHTML = kEmpty;

        tempDiv.appendChild(
            document.createTextNode([kEmpty, str].join(kEmpty))
        );

        return processMap(tempDiv.innerHTML, safeHtmlMap);
    };

    exports.safeHtmlEncode = exports.encodeSafeHtml;

    exports.escape = function(str) {
        return encodeURIComponent([kEmpty, str].join(kEmpty));
    };

    exports.unescape = function(str) {
        return decodeURIComponent([kEmpty, str].join(kEmpty));
    };

    exports.xssEncode = function(str, isAmpersandsPreserved) {
        return processMap([kEmpty, str].join(kEmpty),
            !!isAmpersandsPreserved ? xssEncodeNoAmpMap : xssEncodeMap
        );
    };

    return exports;
});
