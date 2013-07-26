define([
], function() {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Common Constants
         */

        kObject = 'object',
        kString = 'string',
        kEmpty  = '',

        /*
         * # Common Regular Expressions
         */

        kSeparatorRegExp = /\s+/,
        kTemplateRegExp = /\{\{([a-zA-Z0-9]*?)\}\}/g,

        /*
         * # Common Commands
         */

        kEach = 'each',

        /*
         * # To Be Overridden
         */

        doParse = null;

    /*
     *
     */
    function parseDirective(line, data) {
        var kDirectiveIndex = 0,
            kSubTemplateIndex = 1,
            kCommandIndex = 0,
            kDataKeyIndex = 1,

            collectionKey = kEmpty,
            directiveKey = kEmpty,

            directive = null,

            subTpl = line[kSubTemplateIndex],

            buffer = [],

            collection = null,

            clen = 0,
            i = 0;

        if (!line.length) {return kEmpty;}
        if (line.length === 1) {return line[0];}

        directive = line[kDirectiveIndex] &&
                line[kDirectiveIndex].split(kSeparatorRegExp);

        if (directive.length > 1) {
            collectionKey = directive[kDataKeyIndex];
        }

        directiveKey = directive[kCommandIndex];

        if (directiveKey !== kEach) {
            return subTpl.join(kEmpty);
        }

        collection = collectionKey ? data[collectionKey] : data;

        if (typeof collection !== kObject) {
            return subTpl.join(kEmpty);
        }

        for (i = 0, clen = collection.length; i < clen; i++) {
            buffer.push(doParse(collection[i], subTpl));
        }

        return buffer.join(kEmpty);
    }

    /*
     *
     */
    function parse(line, data) {
        if (typeof line !== kString) {
            return parseDirective(line, data);
        }

        return line.replace(kTemplateRegExp, function(str, p1
                    /*, offset, total*/) {
            return data[p1] !== undefined ? data[p1] : str;
        });
    }

     exports.parse = function(data, tpl) {
        var buffer = [],
            tplData = data || {},
            i,
            len;

        for (i = 0, len = tpl.length; i < len; i++) {
            buffer.push(parse(tpl[i], tplData));
        }

        return buffer.join(kEmpty);
     };

     /*
      *
      */
     doParse = exports.parse;

     return exports;
});
