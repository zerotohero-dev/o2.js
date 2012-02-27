/**
 * <b>o2.js</b>
 *
 *  <p style="border:1px solid;background:#ccc;padding:10px;margin:10px">
 *  This program is distributed under the terms of the MIT license.<br />
 *  Please see the <strong><a
 *  href="https://github.com/v0lkan/o2.js/blob/master/LICENSE"
 *  >LICENSE</a></strong> file for details.<br /><br />
 *  <strong>lastModified</strong>: 2012-02-26 12:57:04.820238
 *  <p>
 *
 * @project     o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 * @version     0.24.0001328773671
 * @author      Volkan Özçelik
 * @description o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 */

/**
 * @module   core
 * @requires core.meta
 *
 * <p>The core module.</p>
 */
(function(framework, window, document) {
    'use strict';

    var kFrameworkUndefined = 'Module "core.meta" is not included!';

    if (framework === undefined) {
        throw kFrameworkUndefined;
    }

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var def       = attr(_, 'define');
    var obj       = attr(_, 'getObject');
    var require   = attr(_, 'require');
    var root      = attr(_, 'getRoot');

    /*
     * o2 (Root Namespace)
     */
    var me     = root();
    var myself = obj(me);

    /*
     * Common Constants
     */
    var kEmpty            = '';
    var kLoad             = 'load';
    var kObjectNotDefined = ' : Object is not defined.';
    var kString           = 'string';

    /**
     * @function {static} o2.nill
     *
     * <p>An empty function.</p>
     */
    def(me, 'nill', function() {});


//debugger;

    /**
     * @property {readonly String} o2.name
     *
     * <p>Short name of the framework, to be used in
     * prefixes, class names etc.</p>
     */
    def(me, 'name', 'o2js');

    /*
     *
     */
    var myName = attr(myself, 'name');

    /**
     * @property {readonly String} o2.url
     *
     * <p>URL of the project.</p>
     */
    def(me, 'url', 'http://o2js.com');

    /**
     * @property {readonly String} o2.longName
     *
     * <p>Full name of the project.</p>
     */
    def(
        me,
        'longName',
        'o2.js - a Coherent Solution to Your JavaScript Dilemma'
    );

    /**
     * @property {readonly String} o2.version
     *
     * <p>Project version.</p>
     */
    def(me, 'version', '0.24');

    /**
     * @property {readonly String} o2.build
     *
     * <p>Project build number.</p>
     */
    def(me, 'build', '.0001328773671');

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
     * @throws Exception - if obj is <code>undefined</code>.
     */
    def(me, '$', function(obj) {
        if (obj === undefined) {
            throw [myName, kObjectNotDefined].join(kEmpty);
        }

        if (typeof obj === kString) {
            return document.getElementById(obj);
        }

        return obj || null;
    });

    /**
     * @function {static} o2.ready
     *
     * <p>An alias for <code>DomHelper.ready</code>.</p>
     *
     * @param {Function} callback - The callback to execute when DOM is
     * ready.
     */
    def(me, 'ready', function(callback) {
        require('DomHelper', 'ready')(callback);
    });

    /**
     * @function {static} o2.load
     *
     * <p>An alias for <code>EventHandler.addEventListener(window, 'load',
     * callback)</code>.</p>
     *
     * @param {Function} callback - The callback to execute when window is
     * loaded.
     */
    def(me, 'load', function(callback) {
        require('EventHandler', 'addEventListener')(window, kLoad, callback);
    });

    /**
     * @function {static} o2.now
     *
     * <p>Returns the unix time (i.e. the number of milliseconds since
     * midnight of January 1, 1970)</p>
     *
     * @return the current unix time.
     */
    def(me, 'now', function() {
        return (new Date()).getTime();
    });

    /**
     * @function {static} o2.noConflict
     *
     * <p>Exports the <strong>o2</strong> namespace under a new name, so that
     * it can be used together with an older version of <strong>o2.js</strong>
     *
     * <p>Usage Example:</p>
     *
     * <pre>
     * <script type="text/javascript" charset="UTF-8" src="o2.0.21.js"></script>
     * <script type="text/javascript" charset="UTF-8">
     *     // Now "o2 v.0.21" can be accessed through o3 variable
     *     // (or window.o3).
     *     o2.noConflict('o3');
     * </script>
     * <script type="text/javascript" charset="UTF-8" src="o2.0.23.js"></script>
     * </pre>
     *
     * @param {String} newName - the name of the new namespace.
     *
     * @return the new <code>Object</code>.
     */
    def(me, 'noConflict', function(newName) {
        window[newName] = myself;

        return window[newName];
    });
}(this.o2, this, this.document));
