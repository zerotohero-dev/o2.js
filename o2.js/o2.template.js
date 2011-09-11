/*global o2, window*/

/*
* Copyright © by Volkan Özçelik - http://o2js.com/
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

/**
 * @module o2.template
 * @requires o2
 *
 * <p>A very fast templating engine.</p>
 */
( function(o2, window, UNDEFINED) {

    /*
     * Module configuration.
     */
    var config = {
        constants : {
            command : {
                EACH : 'each'
            },
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
        directiveKey = directive[0];

        if(directiveKey != constants.command.EACH) {
            return subTpl.join('');
        }

        var collection = collectionKey ? data[collectionKey] : data;

        if( typeof collection != 'object') {
            return subTpl.join('');
        }

        var buffer = [];

        for(var i = 0, clen = collection.length; i < clen; i++) {
            buffer.push(o2.Template.parse(collection[i], subTpl));
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
     * <p>A really fast template engine.</p>
     */
    o2.Template = {

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
            data = data || {};

            for(var i = 0, len = tpl.length; i < len; i++) {
                buffer.push(parse(tpl[i], data));
            }

            return buffer.join('');

        }

    };

}(o2, this));
