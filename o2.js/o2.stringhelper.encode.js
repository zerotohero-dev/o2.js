/*global window, o2 */

if(!o2.StringHelper) {
    o2.StringHelper = {};
}

/**
 * @module o2.stringhelper.encode
 * @requires o2
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
 *
 * <p>Responsible for encoding and decoding <code>String</code>s.</p>
 */
( function(o2, window, UNDEFINED) {

    var me = o2.StringHelper;

    /*
     * Module configuration.
     */
    var config = {
        map : {
            xssEncodeNoAmp : [{
                regExp : /</g,
                replace : '&#60;'
            }, {
                regExp : />/g,
                replace : '&#62;'
            }, {
                regExp : /"/g,
                replace : '&#34;'
            }, {
                regExp : /\'/g,
                replace : '&#34;'
            }],

            xssEncode : [{
                regExp : /&/g,
                replace : '&amp;'
            }, {
                regExp : /</g,
                replace : '&#60;'
            }, {
                regExp : />/g,
                replace : '&#62;'
            }, {
                regExp : /"/g,
                replace : '&#34;'
            }, {
                regExp : /\'/g,
                replace : '&#34;'
            }],

            encode : [{
                regExp : /&/g,
                replace : '&amp;'
            }, {
                regExp : /</g,
                replace : '&#60;'
            }, {
                regExp : />/g,
                replace : '&#62;'
            }, {
                regExp : /"/g,
                replace : '&#34;'
            }, {
                regExp : /\'/g,
                replace : '&#34;'
            }, {
                regExp : / /g,
                replace : '&nbsp;'
            }],

            decode : [{
                regExp : /&#60;|&lt;/g,
                replace : '<'
            }, {
                regExp : /&#62;|&gt;/g,
                replace : '>'
            }, {
                regExp : /&#34;|&quot;|&quott;/g,
                replace : '"'
            }, {
                regExp : /&#39;|&apos;|&aposs;/g,
                replace : "'"
            }, {
                regExp : /&#32;|&nbsp;/g,
                replace : ' '
            }, {
                regExp : /&#38;|&amp;/g,
                replace : '&'
            }]
        }
    };

    var state = {
        tempDiv : null
    };

    /**
     * @function {static} o2.StringHelper.xssEncode
     *
     * <p>Encodes special charaters to their corresponding <strong>HTML</strong>
     * entities. Works similar to {link o2.StringHelper.encode}, with an
     * exception that it does not encode whitespace characters.</p>
     * <p>This method is specially designed to prevent cross-site script
     * injection attacks.</p>
     *
     * @param {String} str - the <code>String</code> to process
     * @param {Boolean} shouldPreserveAmpersands - (Optional. Defaults to
     * <code>false</code>). If <code>true</code> & characters will not be
     * encoded, otherwise they will be.
     * @return the processed <code>String</code>.
     */
    me.xssEncode = function(str, shouldPreserveAmpersands) {

        //VMERGE: merge with fw.
        shouldPreserveAmpersands = !!shouldPreserveAmpersands;
        str = ['', str].join('');
        var config = config.map;
        var map = shouldPreserveAmpersands ? config.xssEncodeNoAmp : config.xssEncode;
        var mapItem = null;

        for(var i = 0, len = map.length; i < len; i++) {
            mapItem = map[i];
            str = str.replace(mapItem.regExp, mapItem.replace);
        }

        return str;

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
     * @param {String} str - the <code>String</code> to process
     * @return the processed <code>String</code>.
     */
    me.encode = function(str) {

        var map = config.map.encode;
        var mapItem = null;

        for(var i = 0, len = map.length; i < len; i++) {
            mapItem = map[i];
            str = str.replace(mapItem.regExp, mapItem.replace);
        }

        return str;

    };

    /**
     * @function {static} o2.StringHelper.decode
     *
     * <p>Decodes <strong>HTML</strong> entities back to normal characters.</p>
     * <p>If possible try using standard decoding methods like
     * <code>decodeURIComponent</code>, instead of using this method.</p>
     *
     * @param {String} str - the <code>String</code> to process
     * @return the processed <code>String</code>.
     */
    me.decode = function(str) {

        var map = config.map.decode;
        var mapItem = null;

        for(var i = 0, len = map.length; i < len; i++) {
            mapItem = map[i];
            str = str.replace(mapItem.regExp, mapItem.replace);
        }

        return str;

    };

    /**
     * @function {static} o2.StringHelper.escape
     *
     * <p>An <strong>alias</strong> to <code>encodeURIComponent</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process
     * @return the processed <code>String</code>.
     */
    me.escape = function(str) {

        return encodeURIComponent(str);

    };

    /**
     * @function {static} o2.StringHelper.encodeSafeHtml
     *
     * <p>Encodes the <code>String</code> by converting it into a text node and
     * returning the node's value.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     * @return the processed <code>String</code>.
     */
    me.encodeSafeHtml = function(str) {

        var tmp = state.tempDiv;

        if(!tmp) {
            state.tempDiv = document.createElement('div');
        }

        tmp.innerHTML = '';
        tmp.appendChild(document.createTextNode(str));

        return tmp.innerHTML;

    };

}(o2, this));
