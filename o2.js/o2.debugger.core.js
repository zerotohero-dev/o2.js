/**
 * @module   debugger.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-04-13 12:58:51.488235
 * -->
 *
 * <p>A debugging helper.</p>
 */
(function(framework, window, document, undefined) {
   'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'Debugger';

    /**
     * @class {static} o2.Debugger
     *
     * <p>A static object for debugging purposes.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * // note: initalize Debugger only once,
     * // possibly on window.load or dom content ready
     * o2.Debugger.init(someDomNode, true);
     *
     * //then inside your code use this syntax.
     * o2.Debugger.println('stuff to debug');
     * </pre>
     *
     * @see o2.Unit
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var $    = require('$');
    var nill = require('nill');

    var createElement = attr(document, 'createElement');

    var console = window.console || {};
    var error   = console.error  || nill;
    var info    = console.info   || nill;
    var log     = console.log    || nill;
    var warn    = console.warn   || nill;

    /*
     * Configuration
     */
    var isUsingConsole = true;
    var outputElement  = null;


    /*
     * State
     */
    var isInitialized = false;

    /*
     * Common Class Names
     */
    var kError = 'error';
    var kFail  = 'fail';
    var kInfo  = 'info';
    var kLog   = 'log';
    var kPass  = 'pass';
    var kWarn  = 'warn';

    /*
     * Common Errors
     */
    var kCannotInitialize = 'Debugger: cannot initialize outputElement';
    var kErrorText        = '<b>ERROR:</b> ';
    var kFailText         = '<b>FAIL:</b> ';
    var kInfoText         = '<b>INFO:</b> ';
    var kPassText         = '<b>PASS:</b> ';
    var kWarnText         = '<b>WARN:</b> ';

    /*
     * Common Constants
     */
    var kDefaultContainer = 'div';
    var kEmpty            = '';

    /*
     *
     */
    function println(text, className) {
        switch (className) {
            case kLog:
                log(text);

                break;
            case kInfo:
                info(text);

                break;
            case kWarn:
                warn(text);

                break;
            case kError:
                error(text);

                break;
            default:
                log(text);

                break;
        }
    }

    /*
     * A factory class that creates printer deleages,
     * by parsing the configuration object.
     */
    var PrinterFactory = {

        /*
         * Returns a delegate, parsing the configuration object.
         * Usage:
         *     var delegate = PrinterFactory.create(config);
         * @param {Object} config - the configuration object.
         *
         * @return {Function} the proper delegate.
         */
        create : function(config) {
            var isUsingConsole = config.isUsingConsole;

            if (isUsingConsole && outputElement) {
                return function(value, className) {
                    var debugContent = createElement(kDefaultContainer);

                    debugContent.className = className;
                    debugContent.innerHTML = value;
                    outputElement.appendChild(debugContent);

                    println(value, className);
                };
            } else if (isUsingConsole && !outputElement) {
                return function(value, className) {
                    println(value, className);
                };
            } else if (!isUsingConsole && outputElement) {
                return function(value, className) {
                    var debugContent = createElement(kDefaultContainer);

                    debugContent.className = className;
                    debugContent.innerHTML = value;
                    outputElement.appendChild(debugContent);
                };
            } else {
                return nill;
            }
        }
    };

    /**
     * @function {static} o2.Debugger.assert
     *
     * <p>Checks the value of pass, and displays the message with a proper
     * className.</p>
     * <p>The class name can be one of the {@link
     * Debugger.config.constants.className} members.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.assert((1==true), '1 == true');
     * </pre>
     *
     * @param {Expression} pass - the expression to evaluate.
     * @param {String} message - the message to display.
     *
     * @see o2.Unit.assert
     */
    var assert = def(me, 'assert', function(pass, message) {
        if (!isInitialized) {
            return;
        }

        if (pass) {
            me.println([kPassText, message].join(kEmpty), kPass);

            return;
        }

        me.println([kFailText, message].join(kEmpty), kFail);
    });

    /**
     * @function {static} o2.Debugger.error
     *
     * <p>Prints an error message to the output.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.error('A serious error occured');
     * </pre>
     *
     * @param {String} message - the error message to display.
     */
    var error = def(me, 'error', function(message) {
        if (!isInitialized) {
            return;
        }

        me.println([kErrorText, message].join(kEmpty), kError);
    });

    /**
     * @function {static} o2.Debugger.info
     *
     * <p>Prints an info message to the output.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.info('An info.');
     * </pre>
     *
     * @param {String} message - the info message to display.
     */
    var info = def(me, 'info', function(message) {
        if (!isInitialized) {
            return;
        }

        me.println([kInfoText, message].join(kEmpty), kInfo);
    });

    /**
     * @function {static} o2.Debugger.init
     *
     * <p>Initializes the {@link Debugger} <code>static</code> class.</p>
     * <p>Either <strong>>outputElement</strong>>, or
     * <strong>>shouldUseConsole</strong>, or
     * both should be provided.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.init('divConsole', true);
     * </pre>
     *
     * @param {Object} outputElement - Either the <strong>id</strong> of the
     * element, or the element itself to append debug messages.
     * @param {Boolean} shouldUseConsole - should browser's built-in console
     * be used, if available.
     */
    var init = def(me, 'init', function(outputElement, shouldUseConsole) {
        var outputNode = $(outputElement);

        // Can I use the browser's built-in console?
        // (the double negation !!shouldUseConsole will convert the var to
        // boolean.)
        isUsingConsole = (console !== undefined && !!shouldUseConsole);

        // Is everything ok? -- I should either use the output element, or
        // the console.
        // If I can use neither of them, then it's a fatal situation.
        var isCfgOk = ((outputNode && outputNode.nodeName) || isUsingConsole);

        if (!isCfgOk) {
            throw kCannotInitialize;
        }

        // Set the output element.
        outputElement = outputNode;

        // Successfully initialized.
        isInitialized = true;

        // Prevent initializing the object more than once.
        me.init = nill;
    });

    /**
     * @function {static} o2.Debugger.log
     *
     * <p>This is an <strong>alias</strong> to {@link Debugger.println}.</p>
     * <p>Simply logs a message.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.log('Hello world');
     * </pre>
     *
     * @param {String} message - the message to log.
     *
     * @see o2.Unit.log
     */
    var log = def(me, 'log', function(message) {
        if (!isInitialized) {
            return;
        }

        me.println(message, kLog);
    });

    /**
     * @function {static} o2.Debugger.println
     *
     * <p>Prints the string representation of value to the next line.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.println('Hello world.');
     * </pre>
     *
     * @param {String} value - the value to print.
     * @param {String} className - the CSS class name that is associated with
     * the line.
     */
    var println = def(me, 'println', function(value, className) {

        // If not initialized, then we cannot use any of
        // Debugger's public methods.
        if (!isInitialized) {
            return;
        }

        // Reset className if not given.
        if (!className) {
            className = kLog;
        }

        // Create a new printer method.
        me.println = PrinterFactory.create();

        // Call the newly created method.
        me.println(value, className);
    });

    /**
     * @function {static} o2.Debugger.warn
     *
     * <p>Prints an warning message to the output.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.warn('caution!');
     * </pre>
     *
     * @param {String} message - the warning message to display.
     */
    var warn = def(me, 'warn', function(message) {
        if (!isInitialized) {
            return;
        }

        me.println([kWarnText, message].join(kEmpty), kWarn);
    });
}(this.o2, this, this.document));
