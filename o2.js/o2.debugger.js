/*global o2, console */

/**
 * @module o2.debugger
 * @requires o2
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A debugging helper.</p>
 */
( function(o2, window, UNDEFINED) {

    /**
     * @struct {private} o2.Debugger.config
     *
     * Module configuration
     */
    var config = {

        /**
         * @property {private readonly DOMNode} o2.Debugger.config.outputElement
         *
         * <p>A readonly property indicating
         * the node to output the {@link o2.Debugger} outcomes.</p>
         * <p>This value will be set after {@link o2.Debugger.init} method is
         * called.</p>
         */
        outputElement : null,

        /**
         * @property {private readonly Boolean} o2.Debugger.config.isUsingConsole
         *
         * <p>A reaodonly property.</p>
         * <p>If <code>true</code> browser's builting debug console is
         * utilized.</p>
         * <p>This value will be set after o2.Debugger.init method is called.</p>
         */
        isUsingConsole : true,

        /**
         * @property {private readonly Boolean} o2.Debugger.config.isInitialized
         *
         * <p>A readonly property.</p>
         * <p>If <code>true</code>, {@link o2.Debugger} has been successfully
         * initialized.</p>
         * <p>If false o2.Debugger is not initialized yet.</p>
         * <p>This value will be set after {@link o2.Debugger.init} method is
         * called.</p>
         */
        isInitialized : false,

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
                ER_CANNOT_INITIALIZE : 'o2.Debugger: cannot initialize outputElement'

            }
        }
    };

    function println(text, className) {

        var ccc = config.constants.className;

        switch(className) {
            case ccc.LOG:
                try {
                    console.log(text);
                } catch(ignore1) {
                }

                break;
            case ccc.INFO:
                try {
                    console.info(text);
                } catch(ignore2) {
                }

                break;
            case ccc.WARN:
                try {
                    console.warn(text);
                } catch(ignore3) {
                }

                break;
            case ccc.ERROR:
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

            var nodeName = 'div';

            if(config.isUsingConsole && config.outputElement) {

                return function(value, className) {

                    println(value, className);

                    var debugContent = document.createElement(nodeName);
                    debugContent.className = className;
                    debugContent.innerHTML = value;
                    config.outputElement.appendChild(debugContent);
                };

            } else if(config.isUsingConsole && !config.outputElement) {

                return function(value, className) {

                    println(value, className);

                };

            } else if(!config.isUsingConsole && config.outputElement) {

                return function(value, className) {

                    var debugContent = document.createElement(nodeName);
                    debugContent.className = className;
                    debugContent.innerHTML = value;
                    config.outputElement.appendChild(debugContent);

                };

            } else {

                return function(value) {

                };

            }

        }

    };

    /**
     * @class {static} o2.Debugger
     *
     * <p>A static object for debugging purposes.</p>
     * <p>Sample Usage:</p>
     * <pre>
     * // note: initalize o2.Debugger only once,
     * // possibly on window.load or dom content ready
     * o2.Debugger.init(someDomNode, true);
     *
     * //then inside your code use this syntax.
     * o2.Debugger.println('stuff to debug');
     * </pre>
     */
    o2.Debugger = {

        /**
         * @function {static} o2.Debugger.init
         *
         * <p>Initializes the {@link o2.Debugger} static class.</p>
         * <p>Either <code>outputElement</code>, or
         * <code>shouldUseConsole</code>, or
         * both should be provided.</p>
         *
         * @param {DomNode} outputElement - the element to append debug messages.
         * @param {Boolean} shouldUseConsole - should browser's built-in console
         * be used,
         * if available.
         */
        init : function(outputElement, shouldUseConsole) {

            var outputNode = o2.$(outputElement);

            // Can I use the browser's built-in console?
            //(the double negation !!shouldUseConsole will convert the var to
            // boolean.)
            config.isUsingConsole = (console === UNDEFINED && !!shouldUseConsole);

            // Is everything ok? -- I should either use the output element, or
            // the console.
            // If I can use neither of them, then it's a fatal situation.
            var isConfigOk = ((outputNode && outputNode.nodeName) || config.isUsingConsole);

            if(!isConfigOk) {

                throw config.constants.text.ER_CANNOT_INITIALIZE;
            }

            // Set the output element
            config.outputElement = outputNode;

            // Successfully initialized.
            config.isInitialized = true;

            // Prevents initializing the object more than once.
            o2.Debugger.init = o2.nill;

        },

        /**
         * @function {static} o2.Debugger.println
         *
         * <p>Prints the string representation of value to the next line.</p>
         *
         * @param {String} value - the value to print.
         * @param {String} className - the CSS class name that is associated with
         * the
         * line.
         */
        println : function(value, className) {

            // If not initialized, then we cannot use any of
            // o2.Debugger's public methods.
            if(!config.isInitialized) {

                return;
            }

            // Reset className if not given.
            if(!className) {
                className = config.constants.className.LOG;
            }

            // Create a new printer method.
            o2.Debugger.println = PrinterFactory.create(config);

            // Call the newly created method.
            o2.Debugger.println(value, className);

        },

        /**
         * @function {static} o2.Debugger.assert
         *
         * <p>Checks the value of pass, and displays the message with a proper
         * className.</p>
         * <p>The class name can be one of the {@link
         * o2.Debugger.config.constants.className} members.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Debugger.assert((1==true), '1 == true');
         * </pre>
         *
         * @param {Expression} pass - the expression to evaluate.
         * @param {String} message - the message to display.
         */
        assert : function(pass, message) {

            var empty = '';

            if(!config.isInitialized) {

                return;
            }

            var className = config.constants.className;
            var text = config.constants.text;

            if(pass) {
                o2.Debugger.println([text.PASS, message].join(empty), className.PASS);

                return;
            }

            o2.Debugger.println([text.FAIL, message].join(empty), className.FAIL);

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

            var empty = '';

            if(!config.isInitialized) {

                return;
            }

            var className = config.constants.className;
            var text = config.constants.text;

            o2.Debugger.println([text.ERROR, message].join(empty), className.ERROR);

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

            var empty = '';

            if(!config.isInitialized) {

                return;
            }

            var className = config.constants.className;
            var text = config.constants.text;

            o2.Debugger.println([text.INFO, message].join(empty), className.INFO);

        },

        /**
         * @function {static} o2.Debugger.warn
         *
         * <p>Prints an warning message to the output.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Debugger.error('caution!');
         * </pre>
         *
         * @param {String} message - the warning message to display.
         */
        warn : function(message) {

            var empty = '';

            if(!config.isInitialized) {

                return;
            }

            var className = config.constants.className;
            var text = config.constants.text;

            o2.Debugger.println([text.WARN, message].join(empty), className.WARN);

        },

        /**
         * @function {static} o2.Debugger.log
         *
         * <p>This is an alias to {@link o2.Debugger.println}.</p>
         * <p>Simply logs a message.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Debugger.log('Hello world');
         * </pre>
         *
         * @param {String} message - the message to log.
         */
        log : function(message) {

            if(!config.isInitialized) {

                return;
            }

            o2.Debugger.println(message, config.constants.className.LOG);

        }

    };

}(o2, this));
