define([
    '../core',
    '../debug/core',
    '../dom/core',
    '../string/core'
], function(
    o2,
    Debug,
    Dom,
    StringUtil
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Module Definition
         */

        /*
         * # Aliases
         */

        /*
         * ../core
         */
        nill = o2.nill,

        /*
         * ../debug/core
         */

        assert = Debug.assert,
        initDebugger = Debug.init,
        log = Debug.log,

        /*
         * ../string/core
         */
        concat = StringUtil.concat,
        format = StringUtil.format,

        /*
         * dom.scroll
         */
        scrollToBottom = Dom.scrollWindowToBottom,

        /*
         * # Common Constants
         */

        /*
         * The DOM element to print the output.
         */
        kOutputContainer = 'Output',

        /*
         * If true, the output will be sent to the console (if available),
         * as well.
         */
        kShouldUseConsole = true,

        /*
         * Chunk check interval (in milliseconds).
         * Chunking allows us to run large number of unit tests
         * (of a test suite), without causing a "script timed out" error.
         */
        kCheckInterval = 100,

        /*
         * # Commonly Used Templates
         */

        /*
         * Unit test suite completed.
         */
        kUpdateTestCompletion = concat(
                '<p><b>Completed</b>: "{0}":</p>',
                '<p style="text-align:right">(<b>success: {1}</b> , ',
                '<b>failure: {2}</b>)</p>'
            ),

        /*
         * Unit test has been completed.
         */
        kFinishedUnitTest = concat(
                'Completed unit test <strong>#{0}</strong>:',
                ' "<em>{1}</em>"'
            ),

        /*
         * All of the unit test suites have been completed.
         */
        kReportGlobalCompletion = concat(
                '<p>All unit tests have been completed:</p>',
                '<p style="text-align:right">(<b>total success: {0}</b>, ',
                '<b>total failure: {1}</b>, <b>total # of test: {2}</b>)</p>'
            ),

        /*
         * Debugger problem.
         */
        kFailedToInitializeDebugger = concat(
                'Failed to initialize Debugger. ',
                'No "UnitTest"s will be run!'
            ),

        /*
         *
         */
        kFatalErrorInUnitTest = 'FATAL ERROR in UnitTest setup: "{0}"',

        /*
         *
         */
        kArgumentCountMismatch = '"{0}" expects {1} arguments',

        /*
         *
         */
        kArgumentException = 'Argument count mismatch!',

        /*
         *
         */
        kExecutionException = 'Execution exception!',

        /*
         * # Static State
         */

        /*
         * The test queue. This will be empty when there are no more tests
         * to run.
         */
        tests = [],

        /*
         * The total number of successful assertions.
         */
        globalSuccessCount = 0,

        /*
         * The total number of failed assertions.
         */
        globalFailureCount = 0,

        /*
         * Total number of completed unit tests.
         */
        globalCompletedUnitTestCount = 0,

        /*
         * Is the current <strong>Test Suite</strong> still running.
         */
        isRunning = false,

        /*
         * # To Be Overridden
         */

        /*
         * UnitTest.prototype
         */
        p = null;

    /*
     * Current unit test's test suite finished running all of its assertions.
     */
    function reportTestCompletion(unitTest) {
        if (unitTest.remainingCount < 0) {return;}

        var description  = unitTest.description,
            failureCount = unitTest.failureCount,
            isAllSuccess = unitTest.failureCount <= 0,
            successCount = unitTest.successCount,
            message      = format(kUpdateTestCompletion, description,
                successCount, failureCount);

        assert(isAllSuccess, message);

        log(format(kFinishedUnitTest, ++globalCompletedUnitTestCount,
            description));
    }

    /*
     * All of the assertion in all unit tests have been completed.
     * There is nothing more to run.
     */
    function reportGlobalCompletion() {
        assert(globalFailureCount <= 0,
            format(kReportGlobalCompletion, globalSuccessCount,
                globalFailureCount, globalCompletedUnitTestCount)
        );

        scrollToBottom();
    }

    /*
     * Update success and failure counts of the <code>UnitTest</code>
     * <strong>unitTest</strong> and the global state.
     */
    function updateTestStatus(unitTest, isSuccess) {
        if(isSuccess) {
            globalSuccessCount++;
            unitTest.successCount++;

            return;
        }

        globalFailureCount++;
        unitTest.failureCount++;
    }

    /*
     * Has just done an assertion. Decrement the <strong>remainingCount</strong>
     * of the <code>UnitTest</code> <strong>unitTest</strong>
     */
    function didAssertion(unitTest, isSuccess, message) {
        if (unitTest.remainingCount <= 0) {return;}

        assert(isSuccess, message);
        updateTestStatus(unitTest, isSuccess);

        unitTest.remainingCount--;

        if(unitTest.remainingCount === 0) {
            reportTestCompletion(unitTest);
        }

        scrollToBottom();
    }

    /*
     * A fatal error has occured.
     */
    function reportFatalError(unitTest) {
        didAssertion(unitTest, false,
            format(kFatalErrorInUnitTest, unitTest.description));
    }

    /*
     * @return `true<` if the `UnitTest`
     * _unitTest_s test suite has remaining assertions to run;
     * `false` otherwise.
     */
    function hasMoreItems(unitTest) {
        return unitTest.remainingCount > 0;
    }

    /*
     * Is the `UnitTest` `activeUnitTest` locked?
     */
    function isLocked(activeUnitTest) {
        return activeUnitTest && hasMoreItems(activeUnitTest);
    }

    /*
     * Initializes the `Debugger` if it has not been initialized
     * already.
     */
    function initializeDebugger() {
        try {
            initDebugger(kOutputContainer, kShouldUseConsole);
        } catch (failedToInitializeException) {
            log(failedToInitializeException);
            throw kFailedToInitializeDebugger;
        }
    }

    function UnitTest(description, totalAssertionCount, testCase) {
        this.description = description;
        this.failureCount = 0;
        this.remainingCount = totalAssertionCount;
        this.successCount = 0;
        this.testCase = testCase;
    }

    p = UnitTest.prototype;

    p.terminate = function() {
        this.remainingCount = 0;
    };

    /*
     * Executes an `o2.UnitTest` unit test.
     */
    function execute(unitTest) {
        try {
            unitTest.testCase.apply(unitTest, []);
        } catch (executionException) {
            log(executionException);
            didAssertion(unitTest, false, kExecutionException);
            unitTest.terminate();
            reportFatalError(unitTest);
        }
    }

    /*
     * Checks whether `localParameterCount` equals
     * `argumentsLength` and throws an exception if they do not
     * match.
     */
    function expectProperArgumentLength(unitTest, localParameterCount,
                argumentsLength, methodName) {
        if (argumentsLength === localParameterCount) {return;}

        didAssertion(unitTest, false, kArgumentException);

        throw format(kArgumentCountMismatch, methodName, localParameterCount);
    }

    exports.add = function(description, testMeta) {
        var kRequiredLocalParameterCount = 2,
            kMethodName = 'add',
            kArgumentsLength = arguments.length,
            totalAssertionCount = testMeta.count,
            testCase = testMeta.test;

        expectProperArgumentLength({}, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        tests.push(new UnitTest(description, totalAssertionCount,
            testCase));
    };

    exports.assert = function(unitTest, expression, message) {
        var kArgumentsLength = arguments.length,
            kMethodName = 'assert',
            kRequiredLocalParameterCount = 3,

            result = !!expression;

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    };

    exports.assertEqual = function(unitTest,
                currentValue, expectedValue, message) {
        /* jshint eqeqeq: false */

        var kArgumentsLength = arguments.length,
            kMethodName = 'assertEqual',
            kRequiredLocalParameterCount = 4,

            // JSLint valitation error on purpose.
            result = (currentValue == expectedValue);

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    };

    exports.assertNotEqual = function(unitTest, currentValue, expectedValue,
                message) {
        /* jshint eqeqeq: false */

        var kArgumentsLength = arguments.length,
            kMethodName = 'assertNotEqual',
            kRequiredLocalParameterCount = 4,

            // JSLint validation error on purpose:
            result = (currentValue != expectedValue);

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    };

    exports.assertStrictEqual = function(unitTest,
                currentValue, expectedValue, message) {
        var kArgumentsLength = arguments.length,
            kMethodName = 'assertStrictEqual',
            kRequiredLocalParameterCount = 4,

            result = (currentValue === expectedValue);

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    };

    exports.assertStrictNotEqual = function(unitTest, currentValue,
                expectedValue, message) {
        var kArgumentsLength = arguments.length,
            kMethodName = 'assertStrictNotEqual',
            kRequiredLocalParameterCount = 4,

            result = (currentValue !== expectedValue);

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    };

    exports.getGlobalFailureCount = function() {
        return globalFailureCount;
    };

    exports.getGlobalSuccessCount = function() {
        return globalSuccessCount;
    };

    exports.isRunning = function() {
        return isRunning;
    };

    exports.log = function(message) {
        log(message);
    };

    exports.run = function(globalCompletionCallback) {
        if (isRunning) {return;}

        isRunning = true;

        var oncomplete = globalCompletionCallback || nill,
            activeUnitTest = null;

        initializeDebugger();

        setTimeout(function waitForUnitTest() {
            if (isLocked(activeUnitTest)) {
                setTimeout(waitForUnitTest, kCheckInterval);

                return;
            }

            // Grab the currently active UnitTest.
            activeUnitTest = tests.shift();

            var isSuiteComplete = !activeUnitTest ||
                !activeUnitTest instanceof UnitTest;

            if (isSuiteComplete) {
                reportGlobalCompletion();

                isRunning = false;

                // We are done with this unit test, so release the lock.
                activeUnitTest = null;

                oncomplete(this);

                return;
            }

            if (hasMoreItems(activeUnitTest)) {
                execute(activeUnitTest);

                setTimeout(waitForUnitTest, kCheckInterval);

                return;
            }

            // We are done with this unit test, so release the lock.
            activeUnitTest = null;

        }, kCheckInterval);
    };
});


