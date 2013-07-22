require([
    '../../core',
    '../../string/core'
], function(
    o2,
    StringUtil
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * core
         */
        frameworkName = o2.name,
        nill = o2.nill,

        /*
         * string.core
         */
        concat = StringUtil.concat,
        format = StringUtil.format,
        generateGuid = StringUtil.generateGuid,

        /*
         * # Common Strings
         */

        kCssId = concat(frameworkName, '-css-{0}'),
        kHead = 'head',
        kLink = 'link',
        kRel = 'rel',
        kScript = 'script',
        kScriptType = 'text/javascript',
        kSheet = 'stylesheet',
        kSheetType = 'text/css',

        /*
         * # Common Constants
         */

        kCssCheckInterval = 100,
        kMaxCssCheckAttempt = 500,

        /*
         * # Common Regular Expressions
         */

        kCompleteRegExp = /loaded|complete/,

        // TODO: hopefully this won't be needed in the next release.
        /*
         * # Minimal Browser Detection
         *
         *     "In the future, they said; things will be better, they said."
         *
         *     It's year 2012+ and it's a shame that still sometimes the only
         *     workaround is browser sniffing.
         */

        kM$ = 'MSIE',
        isCrap = window.navigator.userAgent.indexOf(kM$) > -1 &&
            !window.opera,
        isOpera = !!window.opera;

    exports.loadCss = function(src, successCallback) {
        var s = document.createElement(kLink),
            x = document.getElementsByTagName(kHead)[0] || document.body,
            id = format(kCssId, generateGuid()),
            counter = 0,
            onsuccess = successCallback || nill;

        s.setAttribute(kRel, kSheet);

        s.id = id;
        s.type = kSheetType;
        s.href = src;

        x.appendChild(s);

        // for MSIE
        if (isCrap) {
            s.onreadystatechange = function() {
                if(kCompleteRegExp.test(s.readyState)) {
                    onsuccess();

                    onsuccess = nill;
                }
            };

            return;
        }

        // for Opera
        if (isOpera) {
            s.onload = function() {
                onsuccess();

                onsuccess = nill;
            };

            return;
        }

        // worst-case fall-back
        setTimeout(function check() {
            var i = 0,
                len = 0,
                sheet = null,
                sheets = document.styleSheets;

            if (onsuccess === nill) {return;}

            for (i = 0, len = sheets.length; i < len; i++) {
                sheet = sheets[i];
                sheet = sheet.ownerNode || sheet.owningElement;

                if (sheet && sheet.id === id) {
                    onsuccess();
                    onsuccess = nill;

                    break;
                }
            }

            counter++;

            if(counter <= kMaxCssCheckAttempt) {
                setTimeout(check, kCssCheckInterval);
            } else {
                onsuccess();
                onsuccess = nill;
            }
        }, kCssCheckInterval);
    };

    exports.loadImage = function(url, succesCallback) {
        var succesCallbackCached = succesCallback || nill,
            testImg = null;

        function done() {
            succesCallbackCached();
            succesCallbackCached = nill;
        }

        testImg = new window.Image();

        testImg.onload = done;
        testImg.onerror = done;
        testImg.onabort = done;
        testImg.src = url;

        return testImg;
    };

    exports.loadScript = function(src, callback) {
        var s = document.createElement(kScript),
            x = document.getElementsByTagName(kScript)[0] ||
                document.getElementsByTagName(kHead)[0];

        s.type = kScriptType;
        s.async = true;
        s.src = src;

        x.parentNode.insertBefore(s, x);

        if (!callback) {return;}

        s.onreadystatechange = function() {
            if(kCompleteRegExp.test(s.readyState)) {
                callback();
            }
        };

        s.onload = callback;
    };

    return exports;
});
