/**
 * @module debugger
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A debugging helper.</p>
 */

(function(framework, window, document) {
   'use strict';

    /*
     * Aliases.
     */
    var $ = framework.$;
    var nill = framework.nill;
    var console = window.console;

    /**
     * @struct {private} o2.Debugger.config
     *
     * Module configuration
     */
    var config = {

        /**
         * @property {private readonly DOMNode} o2.Debugger.config.outputElement
         *
         * <p>A readonly property indicating the node to output the {@link
         * Debugger} outcomes.</p>
         * <p>This value will be set after {@link Debugger.init} method is
         * called.</p>
         */
        outputElement : null,

        /**
         * @property {private readonly Boolean} o2.Debugger.config.isUsingConsole
         *
         * <p>A reaodonly property.</p>
         * <p>If <code>true</code> browser's builting debug console is
         * utilized.</p>
         * <p>This value will be set after Debugger.init method is called.</p>
         */
        isUsingConsole : true,

        /**
         * @struct {private} o2.Debugger.config.constants
         *
         * Static constants
         */
        constants : {

            /**
             * @struct {private} o2.Debugger.config.constants.className
             *
             * <p>Common class names.</p>
             */
            className : {

                /** @property {private const String} FAIL*/
                FAIL : 'fail',

                /** @property {private const String} PASS*/
                PASS : 'pass',

                /** @property {private const String} ERROR*/
                ERROR : 'error',

                /** @property {private const String} LOG*/
                LOG : 'log',

                /** @property {private const String} INFO*/
                INFO : 'info',

                /** @property {private const String} WARN*/
                WARN : 'warn'

            },

            /**
             * @struct {private} o2.Debugger.config.constants.text
             *
             * <p>Localizable text.</p>
             */
            text : {

                /** @property {private const String} PASS*/
                PASS : '<b>PASS:</b> ',

                /** @property {private const String} FAIL*/
                FAIL : '<b>FAIL:</b> ',

                /** @property {private const String} ERROR*/
                ERROR : '<b>ERROR:</b> ',

                /** @property {private const String} INFO*/
                INFO : '<b>INFO:</b> ',

                /** @property {private const String} WARN*/
                WARN : '<b>WARN:</b> ',

                /** @property {private const String} ER_CANNOT_INITIALIZE*/
                ER_CANNOT_INITIALIZE : 'Debugger: cannot initialize outputElement'

            }
        }
    };

    /*
     * The state of the object.
     */
    var state = {
        isInitialized : false
    };

    /*
     * Common class names.
     */
    var ccc = config.constants.className;
    var kLog = ccc.LOG;
    var kInfo = ccc.INFO;
    var kWarn = ccc.WARN;
    var kError = ccc.ERROR;
    var kPass = ccc.PASS;
    var kFail = ccc.FAIL;

    /*
     * Common strings.
     */
    var kDefaultContainer = 'div';
    var kEmpty = '';

     /*
      * Common errors.
      */
    var cct = config.constants.text;
    var kCannotInitialize = cct.ER_CANNOT_INITIALIZE;
    var kWarnText = cct.WARN;
    var kPassText = cct.PASS;
    var kFailText = cct.FAIL;
    var kErrorText = cct.ERROR;
    var kInfoText = cct.INFO;

    /*
     *
     */
    function println(text, className) {
        switch (className) {
            case kLog:
                try {
                    console.log(text);
                } catch(ignore1) {
                }

                break;
            case kInfo:
                try {
                    console.info(text);
                } catch(ignore2) {
                }

                break;
            case kWarn:
                try {
                    console.warn(text);
                } catch(ignore3) {
                }

                break;
            case kError:
                try {
                    console.error(text);
                } catch(ignore4) {
                }

                break;
            default:
                try {
                    console.log(text);
                } catch(ignore5) {
                }

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
         * @return {Function} the proper delegate.
         */
        create : function(config) {
            var output = config.outputElement;
            var isUsingConsole = config.isUsingConsole;

            if (isUsingConsole && output) {
                return function(value, className) {
                    var debugContent = document.createElement(
                        kDefaultContainer);

                    debugContent.className = className;
                    debugContent.innerHTML = value;
                    output.appendChild(debugContent);

                    println(value, className);
                };
            } else if (isUsingConsole && !output) {
                return function(value, className) {
                    println(value, className);
                };
            } else if (!isUsingConsole && output) {
                return function(value, className) {
                    var debugContent = document.createElement(
                        kDefaultContainer);

                    debugContent.className = className;
                    debugContent.innerHTML = value;
                    output.appendChild(debugContent);
                };
            } else {
                return nill;
            }
        }
    };

    /**
     * @class {static} o2.Debugger
     *
     * <p>A static object for debugging purposes.</p>
     * <p>Sample Usage:</p>
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
    me.Debugger = {

        /**
         * @function {static} o2.Debugger.init
         *
         * <p>Initializes the {@link Debugger} <code>static</code> class.</p>
         * <p>Either <strong>>outputElement</strong>>, or
         * <strong>>shouldUseConsole</strong>, or
         * both should be provided.</p>
         *
         * @param {Object} outputElement - Either the <strong>id</strong> of the
         * element, or the element itself to append debug messages.
         * @param {Boolean} shouldUseConsole - should browser's built-in console
         * be used, if available.
         */
        init : function(outputElement, shouldUseConsole) {
            var outputNode = $(outputElement);

            // Can I use the browser's built-in console?
            // (the double negation !!shouldUseConsole will convert the var to
            // boolean.)
            config.isUsingConsole = (console !== undefined &&
                !!shouldUseConsole);

            // Is everything ok? -- I should either use the output element, or
            // the console.
            // If I can use neither of them, then it's a fatal situation.
            var isConfigOk = ((outputNode && outputNode.nodeName) ||
                config.isUsingConsole);

            if (!isConfigOk) {
                throw kCannotInitialize;
            }

            // Set the output element.
            config.outputElement = outputNode;

            // Successfully initialized.
            state.isInitialized = true;

            // Prevent initializing the object more than once.
            me.Debugger.init = nill;
        },

        /**
         * @function {static} o2.Debugger.println
         *
         * <p>Prints the string representation of value to the next line.</p>
         *
         * @param {String} value - the value to print.
         * @param {String} className - the CSS class name that is associated with
         * the line.
         */
        println : function(value, className) {

            // If not initialized, then we cannot use any of
            // Debugger's public methods.
            if (!state.isInitialized) {
                return;
            }

            // Reset className if not given.
            if (!className) {
                className = kLog;
            }

            // Create a new printer method.
            me.Debugger.println = PrinterFactory.create(config);

            // Call the newly created method.
            me.Debugger.println(value, className);
        },

        /**
         * @function {static} o2.Debugger.assert
         *
         * <p>Checks the value of pass, and displays the message with a proper
         * className.</p>
         * <p>The class name can be one of the {@link
         * Debugger.config.constants.className} members.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Debugger.assert((1==true), '1 == true');
         * </pre>
         *
         * @param {Expression} pass - the expression to evaluate.
         * @param {String} message - the message to display.
         *
         * @see o2.Unit.assert
         */
        assert : function(pass, message) {
            if (!state.isInitialized) {
                return;
            }

            if (pass) {
                me.Debugger.println([kPassText, message].join(kEmpty), kPass);

                return;
            }

            me.Debugger.println([kFailText, message].join(kEmpty), kFail);
        },

        /**
         * @function {static} o2.Debugger.error
         *
         * <p>Prints an error message to the output.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Debugger.error('A serious error occured');
         * </pre>
         *
         * @param {String} message - the error message to display.
         */
        error : function(message) {
            if (!state.isInitialized) {
                return;
            }

            me.Debugger.println([kErrorText, message].join(kEmpty), kError);
        },

        /**
         * @function {static} o2.Debugger.info
         *
         * <p>Prints an info message to the output.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Debugger.info('An info.');
         * </pre>
         *
         * @param {String} message - the info message to display.
         */
        info : function(message) {
            if (!state.isInitialized) {
                return;
            }

            me.Debugger.println([kInfoText, message].join(kEmpty), kInfo);
        },

        /**
         * @function {static} o2.Debugger.warn
         *
         * <p>Prints an warning message to the output.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Debugger.warn('caution!');
         * </pre>
         *
         * @param {String} message - the warning message to display.
         */
        warn : function(message) {
            if (!state.isInitialized) {

                return;
            }

            me.Debugger.println([kWarnText, message].join(kEmpty), kWarn);
        },

        /**
         * @function {static} o2.Debugger.log
         *
         * <p>This is an alias to {@link Debugger.println}.</p>
         * <p>Simply logs a message.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Debugger.log('Hello world');
         * </pre>
         *
         * @param {String} message - the message to log.
         *
         * @see o2.Unit.log
         */
        log : function(message) {
            if (!state.isInitialized) {
                return;
            }

            me.Debugger.println(message, kLog);
        }

    };

}(this.o2, this, this.document));
