require([
], function(
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
         * window
         */
        location = window.location,

        /*
         * # Common Strings
         */

        kAnd = '&',
        kEquals = '=',
        kQuery = '?',

        /*
         * # Common Indexes
         */

        kNameIndex = 0,
        kValueIndex = 1;

    exports.encode = function(collection) {
        var buffer = [],
            key;

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                buffer.push(encodeURIComponent(key));
                buffer.push(kEquals);
                buffer.push(encodeURIComponent(collection[key]));
            }
        }

        buffer.sort();

        return buffer.join(kAnd);
    };

    exports.parse = function(url) {
        var args = {},
            href = url || location.href,
            index = href.indexOf(kQuery),
            i,
            nameValuePair,
            nameValuePairs,
            query;

        if (index === -1) {return args;}

        query = href.substring(index + 1);
        nameValuePairs = query.split(kAnd);

        for (i = 0; i < nameValuePairs.length; i++) {
            nameValuePair = nameValuePairs[i].split(kEquals);
            args[nameValuePair[kNameIndex]] = decodeURIComponent(
                nameValuePair[kValueIndex]);
        }

        return args;
    };

    return exports;
});
