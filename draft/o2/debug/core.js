define([
    '../core'
], function(
    o2
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * core
         */
        $ = o2.$,
        nill = o2.nill,

        /*
         * native
         */
        console = window.console || {},
        error = console.error || nill,
        info = console.info || nill,
        log = console.log || nill,
        warn = console.warn || nill,

        /*
         * # Configuration
         */

        //TODO: move to config. namespace
        outputElement,
        isUsingConsole,

        /*
         * # State
         */

        isInitialized = false,

        /*
         * # Common Class Names
         */

        kError = 'error',
        kFail = 'fail',
        kInfo = 'info',
        kLog = 'log',
        kPass = 'pass',
        kWarn = 'warn',

        /*
         * # Common Errors
         */

        kCannotInitialize = 'Debugger: cannot initialize outputElement',
        kErrorText = '<b>ERROR:</b> ',
        kFailText = '<b>FAIL:</b> ',
        kInfoText = '<b>INFO:</b> ',
        kPassText = '<b>PASS:</b> ',
        kWarnText = '<b>WARN:</b> ',

        /*
         * # Common Constants
         */

        kDefaultContainer = 'div',
        kEmpty = '',

        /*
         * # To Be Overridden
         */

        PrinterFactory,
        println;

    /*
     *
     */
    function out(text, className) {
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
     * A factory class that creates printer delegates,
     * by parsing the configuration object.
     */
    PrinterFactory = {

        /*
         * Returns a delegate, parsing the configuration object.
         * Usage:
         *     var delegate = PrinterFactory.create(config);
         * @param `Object` config - the configuration object.
         *
         * @return `Function` the proper delegate.
         */
        create: function(config) {
            var isUsingConsole = config.isUsingConsole;

            if (isUsingConsole && outputElement) {
                return function(value, className) {
                    var debugContent = document.createElement(
                        kDefaultContainer
                    );

                    debugContent.className = className;
                    debugContent.innerHTML = value;

                    outputElement.appendChild(debugContent);

                    out(value, className);
                };
            }

            if (isUsingConsole && !outputElement) {
                return function(value, className) {
                    out(value, className);
                };
            }

            if (!isUsingConsole && outputElement) {
                return function(value, className) {
                    var debugContent = document.createElement(
                        kDefaultContainer
                    );

                    debugContent.className = className;
                    debugContent.innerHTML = value;

                    outputElement.appendChild(debugContent);
                };
            }

            return nill;
        }
    };

    exports.assert = function(pass, message) {
        if (!isInitialized) {return;}

        if (pass) {
            println([kPassText, message].join(kEmpty), kPass);

            return;
        }

        println([kFailText, message].join(kEmpty), kFail);
    };

    exports.error = function(message) {
        if (!isInitialized) {return;}

        println([kErrorText, message].join(kEmpty), kError);
    };

    exports.info = function(message) {
        if (!isInitialized) {return;}

        println([kInfoText, message].join(kEmpty), kInfo);
    };

    exports.init = function(outputElm, shouldUseConsole) {
        var outputNode = $(outputElm),
            isCfgOk = false;

        // Can I use the browser's built-in console?
        // (the double negation !!shouldUseConsole will convert the var to
        // boolean.)
        isUsingConsole = (console !== undefined && !!shouldUseConsole);

        // Is everything OK? -- I should either use the output element, or
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
        exports.init = nill;
    };

    exports.log = function(message) {
        if (!isInitialized) {return;}

        println(message, kLog);
    };

    exports.println = function(value, className) {

        // If not initialized, then we cannot use any of
        // Debugger's public methods.
        if (!isInitialized) {return;}

        // Reset className if not given.
        if (!className) {
            className = kLog;
        }

        // Create a new printer method.
        exports.println = PrinterFactory.create(
            //TODO: printerfactory should take output element
            //as a config parameter too.
            {isUsingConsole : isUsingConsole}
        );

        // Call the newly created method.
        exports.println(value, className);
    };

    println = exports.println;

    exports.warn = function(message) {
        if (!isInitialized) {return;}

        println([kWarnText, message].join(kEmpty), kWarn);
    };

    return exports;
});
