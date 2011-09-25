/*global o2 */

/**
 * @module objecthelper
 * @requires methodhelper.core
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
     * Aliases
     */
    var me = framework;
    var clone = framework.MethodHelper.bind;

    /**
     * @class {static} ObjectHelper
     *
     * <p>A helper class for <strong>JavaScript</strong> <code>object</code>
     * inheritance.</p>
     */
    me.ObjectHelper = {

        /**
         * @function {static} ObjectHelper.copy
         * <p>Copies <code>base</code>'s methods, to <code>child</code>.
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

        //TODO: add documentation.
        //TODO: enable deep conversion.
        //TODO: implement methods like "pluck"
        convertObjectToArray : function(obj) {
    
            if(!obj) {
                
                return [];
            }

            var result = [];

            for(var key in obj) {
                if(obj.hasOwnProperty(key)) {
                    result.push(obj[key]);
                }
            }
    
        },

        //TODO: ObjectHelper.extend -- and other useful methods.

        //TODO: add recursion depth control.
        dump : function(obj) {

            var item = null;

            var result = [];

            if( typeof obj == 'function') {

                return '-function-';
            }

            var dump = me.dump;

            if( typeof obj == 'object') {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key)) {
                        item = obj[key];

                        if( typeof item == 'function') {
                            result.push([key, ':-function-'].join(''));

                            continue;
                        }

                        if( typeof item == 'object') {
                            result.push([key, ':{', dump(item), '}'].join(''));

                            continue;
                        }

                        result.push([key, ':-', item, '-'].join(''));
                    }
                }

                return result.join('');
            }

            return ['-', obj, '-'].join('');

        }

    };
    
}(o2, this));
