/*global window*/

//VMERGE: merge with fw after completing the next milestone.

/**
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <b>o2.js</b>
 * @project o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 * @author Volkan Ozcelik
 * @description o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 */
( function(window, UNDEFINED) {
    /**
     * Root namespace &ndash; magic goes here ;)
     * @namespace o2
     */
    var o2 = window.o2 = {

        /**
         * @function nill
         *
         * <p>An empty function.</p>
         */
        nill : function() {
        },

        /**
         * @property {String} version
         *
         * <p>Project version.</p>
         */
        version : '0.23',

        /**
         * <p>Project build number.</p>
         *
         * @property {String} build
         */
        build : '201109120859',

        /**
         * @function {static} $
         *
         * <p>An alias for <code>document.getElementById</code>.</p>
         *
         * @param {Object} obj - the id to check.
         * @return document.getElementById(obj) if obj is a <code>String</code>;
         * obj itself otherwise.
         * @throws {Exception} if obj is <code>undefined</code>.
         */
        $ : function(obj, UNDEFINED) {

            if(obj === UNDEFINED) {
                //TODO: to config.
                throw 'o2.$: Object is not defined';
            }

            if( typeof obj == 'string') {
                return document.getElementById(obj);
            }

            return obj ? obj : null;

        },

        /**
         * @function {static} t
         *
         * <p>A <code>getElementsByTagName</code> wrapper.</p>
         *
         * @param {String} tagName - the name of the tag to search.
         * @param {DOMNode} parent - (optional defaults to <code>document</code>)
         * the
         * parent container to search.
         * @return a collection of matching elements.
         */
        t : function(tagName, parent) {
            parent = parent || document;

            return parent.getElementsByTagName(tagName);

        },

        /**
         * @function {static} tt
         * <p>Acts similar to {link o2.t} -- with one exception: The method
         * return
         * the first matched node, instead of returning a node collection.</p>
         * @param {String} tagName - the name of the tag to search.
         * @param {DOMNode} parent - (optional defaults to <code>document</code>)
         * the
         * parent container to search.
         * @return the first matched element if found; <code>null</code>
         * otherwise.
         */
        tt : function(tagName, parent) {

            var result = o2.t(tagName, parent);

            return result ? result[0] : null;

        },

        /**
         * @function {static} ready
         *
         * <p>An alias for <code>o2.DomHelper.ready</code>.</p>
         *
         * @param {Function} callback - The callback to execute when DOM is
         * ready.
         */
        ready : function(callback) {

            o2.DomHelper.ready(callback);

        },

        /**
         * @function {static} load
         *
         * <p>An alias for <code>o2.EventHandler.addEventListener(window, 'load',
         * callback)</code>.</p>
         *
         * @param {Function} callback - The callback to execute when window is
         * loaded.
         */
        load : function(callback) {

            o2.EventHandler.addEventListener(window, 'load', callback);

        }

    };
}(this));
