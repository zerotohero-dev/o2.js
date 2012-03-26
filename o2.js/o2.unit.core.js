/**
 * @module   unit.core
 * @requires core
 * @requires debugger.core
 * @requires domhelper.scroll
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-15 08:22:24.227871
 * -->
 *
 * <p>This package is a unit test runner, that is used to test
 * <strong>js</strong> units.</p>
 */
(function(framework, window) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var obj       = attr(_, 'getObject');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'Unit';

    /**
     * @class {static} o2.Unit
     *
     * <p>A "unit test" <strong>runner</strong>.</p>
     * <p>Runs <code>UnitTest</code>s.</p>
     */
    var me     = create(kModuleName);
    var myself = obj(me);

    /*
     * Aliases
     */

    var nill = require('nill');

    var kDebugger    = 'Debugger';
    var assert       = require(kDebugger, 'assert');
    var initDebugger = require(kDebugger, 'init');
    var log          = require(kDebugger, 'log');

    var kStringHelper = 'StringHelper';
    var concat = require(kStringHelper, 'concat');
    var format = require(kStringHelper, 'format');

    var scrollToBottom = require('DomHelper', 'scrollWindowToBottom');

    var setTimeout = attr(window, 'setTimeout');

    /*
     * Common Constants
     */

    /*
     * The DOM element to print the output.
     */
    var kOutputContainer = 'Output';

    /*
     * If true, the output will be sent to the console (if available), as well.
     */
    var kShouldUseConsole = true;

    /*
     * Chunk check interval (in milliseconds).
     * Chunking allows us to run large number of unit tests (of a test suite),
     * without causing a "script timed out" error.
     */
    var kCheckInterval = 100;

    /*
     * Commonly Used Templates
     */

    /*
     * Unit test suite completed.
     */
    var kUpdateTestCompletion = concat(
        '<p><b>Completed</b>: "{0}":</p>',
        '<p style="text-align:right">(<b>success: {1}</b> , ',
        '<b>failure: {2}</b>)</p>'
    );

    /*
     * Unit test has been completed.
     */
    var kFinishedUnitTest = concat(
        'Completed unit test <strong>#{0}</strong>:',
        ' "<em>{1}</em>"'
    );

    /*
     * All of the unit test suites have been completed.
     */
    var kReportGlobalCompletion = concat(
        '<p>All unit tests have been completed:</p>',
        '<p style="text-align:right">(<b>total success: {0}</b>, ',
        '<b>total failure: {1}</b>, <b>total # of test: {2}</b>)</p>'
    );

    /*
     * Debugger problem.
     */
    var kFailedToInitializeDebugger = concat(
        'Failed to initialize Debugger. ',
        'No "UnitTest"s will be run!'
    );

    /*
     *
     */
    var kFatalErrorInUnitTest = 'FATAL ERROR in UnitTest setup: "{0}"';

    /*
     *
     */
    var kArgumentCountMismatch = '"{0}" expects {1} arguments';

    /*
     *
     */
    var kArgumentException = 'Argument count mismatch!';

    /*
     *
     */
    var kExecutionException = 'Execution exception!';

    /*
     * Static State
     */

    /*
     * The test queue. This will be empty when there are no more tests to run.
     */
    var tests = [];

    /*
     * The total number of successful assertions.
     */
    var globalSuccessCount = 0;

    /*
     * The total number of failed assertions.
     */
    var globalFailureCount = 0;

    /*
     * Total number of completed unit tests.
     */
    var globalCompletedUnitTestCount = 0;

    /*
     * Is the current <strong>Test Suite</strong> still running.
     */
    var isRunning = false;

    /*
     * Current unit test's test suite finished running all of its assertions.
     */
    function reportTestCompletion(unitTest) {
        if (unitTest.remainingCount < 0) {
            return;
        }

        var isAllSuccess = unitTest.failureCount <= 0;
        var description = unitTest.description;
        var successCount = unitTest.successCount;
        var failureCount = unitTest.failureCount;
        var message = format(kUpdateTestCompletion, description,
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
        if (unitTest.remainingCount <= 0) {
            return;
        }

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
     * @return <code>true</code> if the <code>UnitTest</code>
     * <strong>unitTest</strong>s test suite has remaining assertions to run;
     * <code>false</code> otherwise.
     */
    function hasMoreItems(unitTest) {
        return unitTest.remainingCount > 0;
    }

    /*
     * Is the <code>UnitTest</code> <strong>activeUnitTest</strong> locked?
     */
    function isLocked(activeUnitTest) {
        return activeUnitTest && hasMoreItems(activeUnitTest);
    }

    /*
     * Initializes the <code>Debugger</code> if it has not been initialized
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

    /**
     * @class {isolated} UnitTest
     *
     * <p>Defines a test unit.</p>
     * <p>This <strong>class</strong> is <strong>isolated</strong>, and it is
     * only available in the unit meta's callback given to the
     * {@link o2.Unit.add} method.
     */

    /**
     * @constructor UnitTest.UnitTest
     *
     * <p>Creates a new <code>UnitTest</code>.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} description - the description of the unit test.
     * @param {String} totalAssertionCount - the overall number of assertions
     * that the <code>UnitTest</code>'s <strong>testCase</strong> will run.
     * @param {Function} testCase - the test case to run when executing the
     * <code>UnitTest</code>.
     *
     * @param {String} description - the description of the test case.
     * @param {Integer} totalAssertionCount - a non zero integer for the total
     * assertion count in the test case.
     * @param {Function} testCase - the actual test case reference.
     *
     * @see o2.Unit.add
     */
    function UnitTest(description, totalAssertionCount, testCase) {
        this.description = description;
        this.remainingCount = totalAssertionCount;
        this.successCount = 0;
        this.failureCount = 0;
        this.testCase = testCase;
    }

    var p = UnitTest.prototype;

    /**
     * @function o2.UnitTest.terminate
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * <p>Terminates the unit test by setting remaining assertion count to
     * zero.</p>
     */
    p.terminate = function() {
        this.remainingCount = 0;
    };

    /*
     * Executes an <code>o2.UnitTest</code> unit test.
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
     * Checks whether <strong>localParameterCount</strong> equals
     * <strong>argumentsLength</strong> and throws an exception if they do not
     * match.
     */
    function expectProperArgumentLength(unitTest, localParameterCount,
                argumentsLength, methodName) {
        if (argumentsLength === localParameterCount) {

            return;
        }

        didAssertion(unitTest, false, kArgumentException);

        throw format(kArgumentCountMismatch, methodName, localParameterCount);
    }

    /**
     * @function {static} o2.Unit.add
     *
     * <p>Creates a test suite parsing the <strong>testMeta</strong>, and
     * adds it to the test queue.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} description - the description of the test.
     * @param {Object} testMeta - test meta data in the form {count:
     * [number], test: [callback]}, where <strong>count</strong> is the
     * total number of assertions in the test suite, and
     * <strong>test</strong> is the actual test suite <code>Function</code>.
     */
    def(me, 'add', function(description, testMeta) {
        var kRequiredLocalParameterCount = 2;
        var kMethodName = 'add';
        var kArgumentsLength = arguments.length;

        var totalAssertionCount = testMeta.count;
        var testCase = testMeta.test;

        expectProperArgumentLength({}, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        tests.push(new UnitTest(description, totalAssertionCount,
            testCase));
    });

    /**
     * @function {static} o2.Unit.assert
     * <p>Asserts whether the given <strong>expression</strong> evaluates to
     * <code>true</code> or not.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Expression} expression - the expression to evaluate.
     * @param {String} message - the associated message.
     */
    def(me, 'assert', function(unitTest, expression, message) {
        var kRequiredLocalParameterCount = 3;
        var kMethodName = 'assert';
        var kArgumentsLength = arguments.length;
        var result = !!expression;

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    });

    /**
     * @function {static} o2.Unit.assertEqual
     * <p>Asserts whether two values are equal.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */
    def(me, 'assertEqual', function(unitTest, currentValue, expectedValue,
                message) {
        var kRequiredLocalParameterCount = 4;
        var kMethodName = 'assertEqual';
        var kArgumentsLength = arguments.length;

        // JSLint valitation error on purpose.
        var result = (currentValue == expectedValue);

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    });

    /**
     * @function {static} o2.Unit.assertNotEqual
     * <p>Asserts whether two values are <strong>NOT</strong> equal.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */
    def(me, 'assertNotEqual', function(unitTest, currentValue, expectedValue,
                message) {
        var kRequiredLocalParameterCount = 4;
        var kMethodName = 'assertNotEqual';
        var kArgumentsLength = arguments.length;

        // JSLint validation error on purpose:
        var result = (currentValue != expectedValue);

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    });

    /**
     * @function {static} o2.Unit.assertStrictEqual
     *
     * <p>Asserts whether two values are strictly equal (by value and
     * type).</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */
    def(me, 'assertStrictEqual', function(unitTest, currentValue, expectedValue,
                message) {
        var kRequiredLocalParameterCount = 4;
        var kMethodName = 'assertStrictEqual';
        var kArgumentsLength = arguments.length;

        var result = (currentValue === expectedValue);

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    });

    /**
     * @function {static} o2.Unit.assertStrictNotEqual
     *
     * <p>Asserts whether two values are strictly <strong>NOT</strong> equal
     * (by value and type).</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */
    def(me, 'assertStrictNotEqual', function(unitTest, currentValue,
                expectedValue, message) {
        var kRequiredLocalParameterCount = 4;
        var kMethodName = 'assertStrictNotEqual';
        var kArgumentsLength = arguments.length;

        var result = (currentValue !== expectedValue);

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    });

    /**
     * @function {static} o2.Unit.getGlobalFailureCount
     *
     * <p>Gets the total number of failed assertions so far.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return the total number of failed assertions.
     */
    def(me, 'getGlobalFailureCount', function() {
        return globalFailureCount;
    });

    /**
     * @function {static} o2.Unit.getGlobalSuccessCount
     *
     * <p>Gets the total number of successful assertions so far.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return the total number of successful assertions.
     */
    def(me, 'getGlobalSuccessCount', function() {
        return globalSuccessCount;
    });

    /**
     * @function {static} o2.Unit.isRunning
     *
     * <p>Checks whether the current <strong>test suite</strong> is still
     * running.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return <code>true</code> if the current <strong>test suite</strong>
     * is still runing; <code>false</code> otherwise.
     */
    def(me, 'isRunning', function() {
        return isRunning;
    });

    /**
     * @function {static} o2.Unit.log
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * <p>Logs the <strong>message</strong>.</p>
     * <p>An alias to {@link Debugger.log}.</p>
     *
     * @see o2.Debugger.log
     */
    def(me, 'log', function(message) {
        log(message);
    });

    /**
     * @function {static} o2.Unit.run
     *
     * <p>Asynchronously runs all of the registered
     * <code>UnitTest</code>s, one after another.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Function} globalCompletionCallback - (Optional) this callback
     * will be run with <code>o2.Unit</code> as a parameter passed to it.
     */
    def(me, 'run', function(globalCompletionCallback) {
        if (isRunning) {
            return;
        }

        isRunning = true;

        var oncomplete = globalCompletionCallback || nill;

        initializeDebugger();

        var activeUnitTest = null;

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

                oncomplete(myself);

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
    });
}(this.o2, this));
