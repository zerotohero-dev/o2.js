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
    var framework = window.o2 = {

        /**
         * @function nill
         *
         * <p>An empty function.</p>
         */
        nill : function() {
        },
        
        //TODO: add documentation.
        name : 'o2js',
        
        //TODO: add documentation.
        url : 'http://o2js.com',
        
        //TODO: add documentation.
        longName: 'o2.js JavaScript Framework',

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
        build : '201109251548',

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
                throw '$: Object is not defined';
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
            
            //
            parent = framework.$(parent);

            var p = parent || document;

            return p.getElementsByTagName(tagName);

        },

        /**
         * @function {static} tt
         * <p>Acts similar to {link t} -- with one exception: The method
         * returns the first matched node, instead of returning a node
         * collection.</p>
         * @param {String} tagName - the name of the tag to search.
         * @param {DOMNode} parent - (optional defaults to <code>document</code>)
         * the
         * parent container to search.
         * @return the first matched element if found; <code>null</code>
         * otherwise.
         */
        tt : function(tagName, parent) {
            
            //
            parent = framework.$(parent);            

            var result = framework.t(tagName, parent);

            return result ? result[0] : null;

        },

        /**
         * @function {static} ready
         *
         * <p>An alias for <code>DomHelper.ready</code>.</p>
         *
         * @param {Function} callback - The callback to execute when DOM is
         * ready.
         */
        ready : function(callback) {

            framework.DomHelper.ready(callback);

        },

        /**
         * @function {static} load
         *
         * <p>An alias for <code>EventHandler.addEventListener(window, 'load',
         * callback)</code>.</p>
         *
         * @param {Function} callback - The callback to execute when window is
         * loaded.
         */
        load : function(callback) {

            framework.EventHandler.addEventListener(window, 'load', callback);

        }

    };
}(this));
