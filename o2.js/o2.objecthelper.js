/*global o2 */

/**
 * @module objecthelper
 * @requires methodhelper.core
 * @requires stringhelper.core
 * 
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>An object/clone/copy/inheritance helper.</p>
 */
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework;
    var myName = framework.name;
    var format = framework.StringHelper.format;
    var concat = framework.StringHelper.concat;
    var clone = framework.MethodHelper.bind;
    
    var config = {
        constants: {
            errorMessage : {
                NO_JSON_SUPPORT: concat(myName,': {0}: No JSON support. quitting')
            }
        }
    };

    /**
     * @class {static} o2.ObjectHelper
     *
     * <p>A helper class for <strong>JavaScript</strong> <code>object</code>
     * inheritance.</p>
     */
    me.ObjectHelper = {

        /**
         * @function {static} ObjectHelper.copy
         * <p>Copies <strong>base</strong>'s methods, to
         * <strong>child</strong></p>.
         *
         * @param {Object} child - the child <strong>object</strong> to copy
         * methods to.
         * @param {Object} base - the base <strong>object</strong> to copy
         * methods from.
         */
        copyMethods : function(child, base) {

            var shouldCopy = false;

            for(var key in base) {
                if(base.hasOwnProperty(key)) {
                    shouldCopy = base.hasOwnProperty(key) && typeof base[key] == 'function';

                    if(!shouldCopy) {

                        continue;
                    }

                    child[key] = clone(me.JsonpState, base[key]);
                }
            }

        },

        /**
         * @function o2.ObjectHelper.convertObjectToArray
         *
         * <p>Converts a given <code>Object</code> to an <code>Array</code>.</p>
         *
         * @param {Object} obj - the <code>Object</code> to convert to an
         * <code>Array</code>.
         * @param {Boolean} isDeep - (optional, defaults to <code>false</code>),
         * if <code>true</code>, a deep conversion is issued, converting all the
         * nested <code>Object</code> to <code>Array</code>s as well; otherwise a
         * <strong>shallow</strong> conversion is done, where only the top-level
         * elements are scanned.
         *
         * @return the converted <code>Array</code>.
         */
        convertObjectToArray : function(obj, isDeep) {

            //
            isDeep = !!isDeep;

            if(!obj) {

                return [];
            }

            var result = [];

            var item = null;

            for(var key in obj) {
                if(obj.hasOwnProperty(key)) {
                    item = obj[key];

                    if(isDeep && typeof item == 'object') {
                        result.push(me.ObjectHelper.convertObjectToArray(item, isDeep));

                        continue;
                    }

                    result.push(item);
                }
            }

            return result;

        },

        /**
         * o2.ObjectHelper.toJson
         *
         * <p>Converts the <code>Object</code> to a <strong>JSON</strong>
         * <strong>String</code>, if <strong>JSON</strong> is supported.
         * you can use 3rdparty/json2/json2.js to add cross-browser
         * <stron>JSON</strong> support.</p>
         *
         * @param {Object} obj - the <code>Object</code> to convert to a
         * <strong>JSON</strong> <strong>String</code>.
         *
         * @return the converted <strong>JSON</strong> <strong>String</code>.
         */
        toJson : function(obj) {

            if(window.JSON) {
                
                return JSON.stringify(obj);
            }

            var kMethodName = 'ObjectHelper.toJson';

            throw format(config.constant.errorMessage.NO_JSON_SUPPORT, kMethodName);

        }

    };

}(o2, this));
