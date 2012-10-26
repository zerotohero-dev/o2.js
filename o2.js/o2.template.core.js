/**
 * @module   template.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A "very" fast templating engine.</p>
 */
(function(framework, fp, UNDEFINED) {
    'use strict';

    // Ensure that dependencies have been loaded.
    fp.ensure('template.core', ['core']);

    var attr    = fp.getAttr,
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * Module Exports
         */
        exports = {},

        /*
         * Module Name
         */
        kModuleName = 'Template',

        /**
         * @class {static} o2.Template
         *
         * <p>A really <strong>fast</strong> template engine.</p>
         */
        me = create(kModuleName),

        /*
         * Common Constants
         */
        kObject = 'object',
        kString = 'string',
        kEmpty  = '',

        /*
         * Common Regular Expressions
         */
        kSeparatorRegExp = /\s+/,
        kTemplateRegExp  = /\{\{(.*?)\}\}/g,

        /*
         * Common Commands
         */
        kEach = 'each',

        /*
         * To be Overridden
         */
        doParse = null;

    /*
     *
     */
    function parseDirective(line, data) {
        var kDirectiveIndex     = 0,
            kSubTemplateIndex   = 1,
            kCommandIndex       = 0,
            kDataKeyIndex       = 1,

            collectionKey = kEmpty,
            directiveKey  = kEmpty,

            directive = null,

            subTpl = line[kSubTemplateIndex],

            lineLength = line.length,

            buffer = [],

            collection = null,

            clen = 0,
            i    = 0;

        if (!line.length     ) {return kEmpty;}
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
            return data[p1] !== UNDEFINED ? data[p1] : str;
        });
    }

    /**
     * @function {static} o2.Template.parse
     *
     * <p>Parses the given template.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var data = {
     *      users : [
     *          {name : 'Joe' },
     *          {name : 'Jill'},
     *          {name : 'Jack'}
     *      ]
     * };
     *
     * var tpl = [
     *      'ul id="Products"',
     *          ['each users',
     *              'li {{name}} /li'],
     *      '/ul'
     * ];
     *
     * var html = o2.Template.parse(data, tpl);
     * </pre>
     *
     * @param {Object} data - the source data as a <strong>JSON</strong> object.
     * @param {String} tpl - the template to parse against.
     *
     * @return {String} the parsed template.
     */
     exports.parse = def(me, 'parse', function(data, tpl){
        var buffer  = [],
            tplData = data || {},
            i       = 0,
            len     = 0;

        for (i = 0, len = tpl.length; i < len; i++) {
            buffer.push(parse(tpl[i], tplData));
        }

        return buffer.join(kEmpty);
     });

     /*
      *
      */
     doParse = require(kModuleName, 'parse');
}(this.o2, this.o2.protecteds));
