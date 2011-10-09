/*global window*/

/**
 * <b>o2.js</b>
 * @project o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 * @version 0.23.201110092122
 * @author Volkan Özçelik
 * @description o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 */

/**
 * Root namespace &ndash; magic goes here ;)
 * @namespace o2
 */
window.o2 = {};

/**
 *
 */
( function(framework, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework;
    
    var config = {
        constants: {
            errorMessage: {
                OBJECT_NOT_DEFINED : ' : Object is not defined.'
            }
        }
    };

    /**
     * @function {static} o2.nill
     *
     * <p>An empty function.</p>
     */
    me.nill = function() {
    };

    /**
     * @property {String} o2.name
     *  
     * <p>Short name of the framework, to be used in
     * prefixes, class names etc.</p>
     */
    me.name = 'o2js';

    /**
     * @property {String} o2.url 
     *
     * <p>URL of the project.</p>
     */
    me.url = 'http://o2js.com';

    /**
     * @property {String} o2.longName
     *
     * <p>Full name of the project.</p>
     */
    me.longName = 'o2.js JavaScript Framework';

    /**
     * @property {String} o2.version
     *
     * <p>Project version.</p>
     */
    me.version = '0.23';

    /**
     * @property {String} o2.build
     *
     * <p>Project build number.</p>     
     */
    me.build = '201110092122';

    /**
     * @function {static} o2.$
     *
     * <p>An alias for <code>document.getElementById</code>.</p>
     *
     * @param {Object} obj - the id to check.
     *
     * @return document.getElementById(obj) if obj is a <code>String</code>;
     * obj itself otherwise.
     *
     * @throws exception - if obj is <code>undefined</code>.
     */
    me.$ = function(obj, UNDEFINED) {

        if(obj === UNDEFINED) {

            throw [me.name, config.constants.errorMessage.OBJECT_NOT_DEFINED].join('');
        }

        if( typeof obj == 'string') {

            return document.getElementById(obj);
        }

        return obj ? obj : null;

    };

    /**
     * @function {static} o2.t
     *
     * <p>A <code>getElementsByTagName</code> wrapper.</p>
     *
     * @param {String} tagName - the name of the tag to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return a collection of matching elements.
     */
    me.t = function(tagName, parent) {

        //
        if(parent === UNDEFINED) {
            parent = window.document;
        }
        
        //
        parent = framework.$(parent);

        var p = parent || document;

        return p.getElementsByTagName(tagName);

    };

    /**
     * @function {static} o2.tt
     *
     * <p>Acts similar to {link t} -- with one exception: The method
     * returns the first matched node, instead of returning a node
     * collection.</p>
     *
     * @param {String} tagName - the name of the tag to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return the first matched element if found; <code>null</code>
     * otherwise.
     */
    me.tt = function(tagName, parent) {

        //
        parent = framework.$(parent);

        var result = framework.t(tagName, parent);

        return result ? result[0] : null;

    };

    /**
     * @function {static} o2.ready
     *
     * <p>An alias for <code>DomHelper.ready</code>.</p>
     *
     * @param {Function} callback - The callback to execute when DOM is
     * ready.
     */
    me.ready = function(callback) {

        framework.DomHelper.ready(callback);

    };

    /**
     * @function {static} o2.load
     *
     * <p>An alias for <code>EventHandler.addEventListener(window, 'load',
     * callback)</code>.</p>
     *
     * @param {Function} callback - The callback to execute when window is
     * loaded.
     */
    me.load = function(callback) {

        framework.EventHandler.addEventListener(window, 'load', callback);

    };

}(window.o2));
