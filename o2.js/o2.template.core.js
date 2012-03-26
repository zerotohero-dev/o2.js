/**
 * @module   template.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-15 08:25:17.971028
 * -->
 *
 * <p>A "very" fast templating engine.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'Template';

    /**
     * @class {static} o2.Template
     *
     * <p>A really <strong>fast</strong> template engine.</p>
     */
    var me = create(kModuleName);

    /*
     * Common Constants
     */
    var kObject = 'object';
    var kString = 'string';
    var kEmpty  = '';

    /*
     * Common Regular Expressions
     */
    var kSeparatorRegExp = /\s+/;
    var kTemplateRegExp  = /\{\{(.*?)\}\}/g;

    /*
     * Common Commands
     */
    var kEach = 'each';

    /*
     *
     */
    var doParse = null;

    /*
     *
     */
    function parseDirective(line, data) {
        var len = line.length;

        switch (len) {
            case 0:
                return kEmpty;
            case 1:
                return line[0];
        }

        var directive = line[0].split(kSeparatorRegExp);
        var subTpl = line[1];
        var directiveKey = kEmpty;
        var collectionKey = kEmpty;

        var buffer = [];
        var i = 0;
        var clen = 0;

        if (directive.length > 1) {
            collectionKey = directive[1];
        }

        directiveKey = directive[0];

        if (directiveKey !== kEach) {
            return subTpl.join(kEmpty);
        }

        var collection = collectionKey ? data[collectionKey] : data;

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

    /**
     * @function {static} o2.Template.parse
     *
     * <p>Parses the given template.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} data - the source data as a <strong>JSON</strong> object.
     * @param {String} tpl - the template to parse against.
     *
     * @return {String} the parsed template.
     */
     def(me, 'parse', function(data, tpl){
        var buffer = [];
        var i = 0;
        var len = 0;

        data = data || {};

        for (i = 0, len = tpl.length; i < len; i++) {
            buffer.push(parse(tpl[i], data));
        }

        return buffer.join(kEmpty);
     });

     /*
      *
      */
     doParse = require(kModuleName, 'parse');
}(this.o2));
