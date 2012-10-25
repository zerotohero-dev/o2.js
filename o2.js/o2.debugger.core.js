/**
 * @module   debugger.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A debugging helper.</p>
 */
(function(framework, fp, window, document, UNDEFINED) {
   'use strict';

    // Ensure that dependencies have been loaded.
    fp.ensure('debugger.core', ['core']);

    var attr    = fp.getAttr,
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * Module Exports
         */
        exports = {},

        /*
         * Module Name
         */
        kModuleName = 'Debugger',

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
        me = create(kModuleName),

        /*
         * Aliases
         */

        $    = require('$'),
        nill = require('nill'),

        createElement = attr(document, 'createElement'),

        console = window.console || {},
        error   = console.error  || nill,
        info    = console.info   || nill,
        log     = console.log    || nill,
        warn    = console.warn   || nill,

        /*
         * Configuration
         */
        outputElement  = null,

        /*
         * State
         */
        isInitialized = false,

        /*
         * Common Class Names
         */
        kError = 'error',
        kFail  = 'fail',
        kInfo  = 'info',
        kLog   = 'log',
        kPass  = 'pass',
        kWarn  = 'warn',

        /*
         * Common Errors
         */
        kCannotInitialize = 'Debugger: cannot initialize outputElement',
        kErrorText        = '<b>ERROR:</b> ',
        kFailText         = '<b>FAIL:</b> ',
        kInfoText         = '<b>INFO:</b> ',
        kPassText         = '<b>PASS:</b> ',
        kWarnText         = '<b>WARN:</b> ',

        /*
         * Common Constants
         */
        kDefaultContainer = 'div',
        kEmpty            = '',

        /*
         * To be Overridden
         */
        PrinterFactory = null;

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
    PrinterFactory = {

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
            }

            if (isUsingConsole && !outputElement) {
                return function(value, className) {
                    println(value, className);
                };
            }

            if (!isUsingConsole && outputElement) {
                return function(value, className) {
                    var debugContent = createElement(kDefaultContainer);

                    debugContent.className = className;
                    debugContent.innerHTML = value;

                    outputElement.appendChild(debugContent);
                };
            }

            return nill;
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
    exports.assert = def(me, 'assert', function(pass, message) {
        if (!isInitialized) {return;}

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
    exports.error = def(me, 'error', function(message) {
        if (!isInitialized) {return;}

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
    exports.info = def(me, 'info', function(message) {
        if (!isInitialized) {return;}

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
    exports.init = def(me, 'init', function(outputElement, shouldUseConsole) {
        var outputNode     = $(outputElement),
            isCfgOk        = false,
            isUsingConsole = false;

        // Can I use the browser's built-in console?
        // (the double negation !!shouldUseConsole will convert the var to
        // boolean.)
        isUsingConsole = (console !== UNDEFINED && !!shouldUseConsole);

        // Is everything ok? -- I should either use the output element, or
        // the console.
        // If I can use neither of them, then it's a fatal situation.
        isCfgOk = ((outputNode && outputNode.nodeName) || isUsingConsole);

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
    exports.log = def(me, 'log', function(message) {
        if (!isInitialized) {return;}

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
    exports.println = def(me, 'println', function(value, className) {

        // If not initialized, then we cannot use any of
        // Debugger's public methods.
        if (!isInitialized) {return;}

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
    exports.warn = def(me, 'warn', function(message) {
        if (!isInitialized) {return;}

        me.println([kWarnText, message].join(kEmpty), kWarn);
    });
}(this.o2, this.o2.protecteds, this, this.document));
