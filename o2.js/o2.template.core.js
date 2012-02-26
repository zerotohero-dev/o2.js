/**
 * @module   template.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-26 15:49:50.684007
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

    /**
     * @class {static} o2.Template
     *
     * <p>A really <strong>fast</strong> template engine.</p>
     */
    var me = create('Template');

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

        var buffer = [];
        var i = 0;
        var clen = 0;

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
     doParse = require('Template', 'parse');
}(this.o2));
