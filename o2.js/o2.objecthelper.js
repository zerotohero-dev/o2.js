/*global window, o2*/

/**
 * @module o2.objecthelper
 * @requires o2
 * @requires o2.methodhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>An object/clone/copy/inheritance helper.</p>
 */
( function(o2, window, UNDEFINED) {

    /*
     * Aliases
     */
    var clone = o2.MethodHelper.bind;

    /**
     * @class {static} o2.ObjectHelper
     *
     * <p>A helper class for <strong>JavaScript</strong> <code>object</code>
     * inheritance.</p>
     */
    o2.ObjectHelper = {

        /**
         * @function {static} o2.ObjectHelper.copy
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

                    child[key] = clone(o2.JsonpState, base[key]);
                }
            }

        }

    };
}(o2, this));
