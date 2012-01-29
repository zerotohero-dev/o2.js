/**
 * <b>o2.js</b>
 * @project     o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 * @version     0.23.0001327838681
 * @author      Volkan Özçelik
 * @description o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-25 08:34:42.334812
 * -->
 */

/**
 * Root namespace &ndash; magic goes here ;)
 * @namespace o2
 */
this.o2 = {};

/**
 * @module core
 *
 * <p>The core module.</p>
 */
(function(framework, window, document) {
    'use strict';

    /*
     * Common Constants
     */
    var kObjectNotDefined = ' : Object is not defined.';
    var kEmpty = '';
    var kString = 'string';
    var kLoad = 'load';

    /**
     * @function {static} o2.nill
     *
     * <p>An empty function.</p>
     */
    framework.nill = function() {
    };

    /**
     * @property {String} o2.name
     *
     * <p>Short name of the framework, to be used in
     * prefixes, class names etc.</p>
     */
    framework.name = 'o2js';

    /**
     * @property {String} o2.url
     *
     * <p>URL of the project.</p>
     */
    framework.url = 'http://o2js.com';

    /**
     * @property {String} o2.longName
     *
     * <p>Full name of the project.</p>
     */
    framework.longName = 'o2.js JavaScript Framework';

    /**
     * @property {String} o2.version
     *
     * <p>Project version.</p>
     */
    framework.version = '0.23';

    /**
     * @property {String} o2.build
     *
     * <p>Project build number.</p>
     */
    framework.build = '.0001327838681';

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
    framework.$ = function(obj) {
        if (obj === undefined) {
            throw [framework.name, kObjectNotDefined].join(kEmpty);
        }

        if (typeof obj === kString) {
            return document.getElementById(obj);
        }

        return obj || null;
    };

    /**
     * @function {static} o2.ready
     *
     * <p>An alias for <code>DomHelper.ready</code>.</p>
     *
     * @param {Function} callback - The callback to execute when DOM is
     * ready.
     */
    framework.ready = function(callback) {
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
    framework.load = function(callback) {
        framework.EventHandler.addEventListener(window, kLoad, callback);
    };
}(this.o2, this, this.document));
