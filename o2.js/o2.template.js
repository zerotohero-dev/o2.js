/*global o2 */

/**
 * @module template
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A very fast templating engine.</p>
 */
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework;

    /*
     * Module configuration.
     */
    var config = {

        /*
         *
         */
        constants : {

            /*
             *
             */
            command : {
                EACH : 'each'
            },

            /*
             *
             */
            regExp : {
                TEMPLATE : /\{\{(.*?)\}\}/g,
                SEPARATOR : /\s+/
            }

        }

    };

    /*
     *
     */
    function parseDirective(line, data) {

        var len = line.length;

        if(len === 0) {

            return '';
        }

        if(len == 1) {

            return line[0];
        }

        var constants = config.constants;

        var directive = line[0].split(constants.regExp.SEPARATOR);
        var subTpl = line[1];

        var directiveKey = '';
        var collectionKey = '';

        if(directive.length > 1) {
            collectionKey = directive[1];
        }

        //
        directiveKey = directive[0];

        if(directiveKey != constants.command.EACH) {

            return subTpl.join('');
        }

        var collection = collectionKey ? data[collectionKey] : data;

        if( typeof collection != 'object') {

            return subTpl.join('');
        }

        var buffer = [];

        var parse = me.Template.parse;

        for(var i = 0, clen = collection.length; i < clen; i++) {
            buffer.push(parse(collection[i], subTpl));
        }

        return buffer.join('');

    }

    /*
     *
     */
    function parse(line, data) {

        var regTemplate = config.constants.regExp.TEMPLATE;

        var directive = '';
        var subTpl = null;
        var collection = null;

        if( typeof line != 'string') {

            return parseDirective(line, data);
        }

        return line.replace(regTemplate, function(str, p1, offset, total) {

            return data[p1] !== UNDEFINED ? data[p1] : str;

        });

    }

    /**
     * @class {static} o2.Template
     *
     * <p>A really <strong>fast</strong> template engine.</p>
     */
    me.Template = {

        /**
         * @function {static} o2.Template.parse
         *
         * <p>Parses the given template.</p>
         *
         * @param {Object} data - the source data as a <strong>JSON</strong>
         * object.
         * @param {String} tpl - the template to parse against.
         * @return {String} the parsed template.
         */
        parse : function(data, tpl) {

            var buffer = [];
            
            //
            data = data || {};

            for(var i = 0, len = tpl.length; i < len; i++) {
                buffer.push(parse(tpl[i], data));
            }

            return buffer.join('');

        }

    };

}(o2, this));
