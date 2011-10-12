/*global o2*/

/**
 * @module unit
 * @requires stringhelper.core
 * @requires debugger
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>This package is a unit test runner, that is used to test
 * <strong>js</strong> units.</p>
 */
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework;
    var log = framework.Debugger.log;
    var assert = framework.Debugger.assert;
    var initDebugger = framework.Debugger.init;
    var format = framework.StringHelper.format;

    /*
     * Module configuration.
     */
    var config = {

        /*
         * The interval in milliseconds, the semaphore will be check using
         * isLocked().
         */
        TEST_CHECK_INTERVAL : 100,

        /*
         * The output layer to publish test results.
         */
        TEST_OUTPUT_CONTAINER : 'Output',

        /*
         * if <code>true</code>, the results will be written to
         * <code>window.console</code> (if supported).
         */
        TEST_SHOULD_USE_CONSOLE : true

    };

    /*
     * Common error messages.
     */
    var errorMessage = {

        /*
         * Problem initializing debugger.
         */
        FAILED_TO_INITIALIZE_DEBUGGER : 'Failed to initialize Debugger. No "UnitTest"s will be run!',

        /*
         * An error occured in a test suite.
         */
        FATAL_ERROR_IN_UNIT_TEST : 'FATAL ERROR in UnitTest setup: "{0}"',

        /*
         * Invalid number of arguments.
         */
        ARGUMENT_COUNT_MISMATCH : '"{0}" expects {1} arguments'

    };

    /*
     * Commonly-used templates.
     */
    var template = {
        // @formatter:off

        /*
         * Unit test suite completed.
         */
        UPDATE_TEST_COMPLETION : [
            '<p><b>Completed</b>: "{0}":</p>', 
            '<p style="text-align:right">(<b>success: {1}</b> , ',
            '<b>failure: {2}</b>)</p>'
        ].join(''),

        /*
         * All of the unit test suites have been completed.
         */
        REPORT_GLOBAL_COMPLETION :  [
            '<p>All unit tests have been completed:</p>',
            '<p style="text-align:right">(<b>total success: {0}', 
            '</b> , <b>total failure: {1}</b>)</p>'
        ].join('')

        // @formatter:on
    };

    /*
     * Static state.
     */
    var state = {

        /*
         * The test queue. This will be empty when there are no more tests to
         * run.
         */
        tests : [],

        /*
         * The total number of successful assertions.
         */
        globalSuccessCount : 0,

        /*
         * The total number of failed assertions.
         */
        globalFailureCount : 0

    };

    /*
     * Current unit test's test suite finished running all of its assertions.
     */
    function reportTestCompletion(unitTest) {

        var isAllSuccess = unitTest.failureCount <= 0;

        var description = unitTest.description;
        var successCount = unitTest.successCount;
        var failureCount = unitTest.failureCount;

        var message = format(template.UPDATE_TEST_COMPLETION, description, successCount, failureCount);

        assert(isAllSuccess, message);

    }

    /*
     * All of the assertion in all unit tests have been completed.
     * There is nothing more to run.
     */
    function reportGlobalCompletion() {

        var successCount = state.globalSuccessCount;
        var failureCount = state.globalFailureCount;

        var message = format(template.REPORT_GLOBAL_COMPLETION, successCount, failureCount);

        assert(state.globalFailureCount <= 0, message);

    }

    /*
     * Update success and failure counts of the <code>UnitTest</code>
     * <strong>unitTest</strong> and the
     * global <strong>state</strong> object.
     */
    function updateTestStatus(unitTest, isSuccess) {

        if(isSuccess) {
            state.globalSuccessCount++;
            unitTest.successCount++;

            return;
        }

        state.globalFailureCount++;
        unitTest.failureCount++;

    }

    /*
     * Has just done an assertion. Decrement the <strong>remainingCount</strong>
     * of the <code>UnitTest</code> <strong>unitTest</strong>
     */
    function didAssertion(unitTest, isSuccess, message) {

        assert(isSuccess, message);
        updateTestStatus(unitTest, isSuccess);

        unitTest.remainingCount--;

        if(unitTest.remainingCount <= 0) {
            reportTestCompletion(unitTest);
        }

    }

    /*
     * A fatal error has occured.
     */
    function reportFatalError(unitTest) {

        var message = format(errorMessage.FATAL_ERROR_IN_UNIT_TEST, unitTest.description);

        didAssertion(unitTest, false, message);

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

            initDebugger(config.TEST_OUTPUT_CONTAINER, config.TEST_SHOULD_USE_CONSOLE);

        } catch(failedToInitializeException) {

            throw errorMessage.FAILED_TO_INITIALIZE_DEBUGGER;

        }

    }

    /**
     * @class {isolated} o2.UnitTest
     *
     * <p>Defines a test unit.</p>
     * <p>This <strong>class</strong> is <strong>isolated</strong>, and it is
     * only available in the unit meta's callback given to the {@link
     * o2.Unit.add} method.
     */

    /**
     * @constructor o2.UnitTest.UnitTest
     *
     * <p>Creates a new <strong>o2.UnitTest</strong>.</p>
     *
     * @param {String} description - the description of the unit test.
     * @param {String} totalAssertionCount - the overall number of assertions
     * that the <code>UnitTest</code>s <strong>testCase</strong> will run.
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

    /*
     * Executes an <code>o2.UnitTest</code> unit test.
     */
    function execute(unitTest) {

        try {

            unitTest.testCase.apply(unitTest, []);

        } catch(executionException) {

            unitTest.remainingCount = 0;
            reportFatalError(unitTest);

        }

    }

    /*
     * Checks whether <strong>localParameterCount</strong> equals
     * <strong>argumentsLength</strong> and throws an exception if they do not
     * match.
     */
    function expectProperArgumentLength(localParameterCount, argumentsLength, methodName) {

        if(argumentsLength == localParameterCount) {

            return;
        }

        throw format(errorMessage.ARGUMENT_COUNT_MISMATCH, methodName, localParameterCount);
    }

    /**
     * @class {static} o2.Unit
     *
     * <p>A "unit test" <strong>runner</strong>.</p>
     * <p>Runs <code>UnitTest</code>s.</p>
     */
    me.Unit = {

        isRunning : false,

        /**
         * @function {static} o2.Unit.getGlobalSuccessCount
         *
         * <p>Gets the total number of successful assertions so far.</p>
         *
         * @return the total number of successful assertions.
         */
        getGlobalSuccessCount : function() {

            return state.globalSuccessCount;

        },

        /**
         * @function {static} o2.Unit.getGlobalFailureCount
         *
         * <p>Gets the total number of failed assertions so far.</p>
         *
         * @return the total number of failed assertions.
         */
        getGlobalFailureCount : function() {

            return state.globalFailureCount;

        },

        /**
         * @function {static} o2.Unit.assert
         * <p>Asserts whether the given <strong>expression</strong> evaluates to
         * <code>true</code> or not.</p>
         *
         * @param {o2.UnitTest} unitTest - the current active unit test.
         * @param {Expression} expression - the expression to evaluate.
         * @param {String} message - the associated message.
         */
        assert : function(unitTest, expression, message) {

            var kRequiredLocalParameterCount = 3;
            var kMethodName = 'assert';
            var kArgumentsLength = arguments.length;

            expectProperArgumentLength(kRequiredLocalParameterCount, kArgumentsLength, kMethodName);

            var result = !!expression;

            didAssertion(unitTest, result, message);

        },

        /**
         * @function {static} o2.Unit.assertEqual
         * <p>Asserts whether two values are equal.</p>
         *
         * @param {o2.UnitTest} unitTest - the current active unit test.
         * @param {Object} currentValue - the current value to assert.
         * @param {Object} expectedValue - the expected value to check against.
         * @param {String} message - the associated message.
         */
        assertEqual : function(unitTest, currentValue, expectedValue, message) {

            var kRequiredLocalParameterCount = 4;
            var kMethodName = 'assertEqual';
            var kArgumentsLength = arguments.length;

            expectProperArgumentLength(kRequiredLocalParameterCount, kArgumentsLength, kMethodName);

            var result = (currentValue == expectedValue);

            didAssertion(unitTest, result, message);

        },

        /**
         * @function {static} o2.Unit.assertNotEqual
         * <p>Asserts whether two values are <strong>NOT</strong> equal.</p>
         *
         * @param {o2.UnitTest} unitTest - the current active unit test.
         * @param {Object} currentValue - the current value to assert.
         * @param {Object} expectedValue - the expected value to check against.
         * @param {String} message - the associated message.
         */
        assertNotEqual : function(unitTest, currentValue, expectedValue, message) {

            var kRequiredLocalParameterCount = 4;
            var kMethodName = 'assertNotEqual';
            var kArgumentsLength = arguments.length;

            expectProperArgumentLength(kRequiredLocalParameterCount, kArgumentsLength, kMethodName);

            var result = (currentValue != expectedValue);

            didAssertion(unitTest, result, message);

        },

        /**
         * @function {static} o2.Unit.assertStrictEqual
         *
         * <p>Asserts whether two values are strictly equal (by value and
         * type).</p>
         *
         * @param {o2.UnitTest} unitTest - the current active unit test.
         * @param {Object} currentValue - the current value to assert.
         * @param {Object} expectedValue - the expected value to check against.
         * @param {String} message - the associated message.
         */
        assertStrictEqual : function(unitTest, currentValue, expectedValue, message) {

            var kRequiredLocalParameterCount = 4;
            var kMethodName = 'assertStrictEqual';
            var kArgumentsLength = arguments.length;

            expectProperArgumentLength(kRequiredLocalParameterCount, kArgumentsLength, kMethodName);

            var result = (currentValue === expectedValue);

            didAssertion(unitTest, result, message);

        },

        /**
         * @function {static} o2.Unit.assertStrictNotEqual
         *
         * <p>Asserts whether two values are strictly <strong>NOT</strong> equal
         * (by value and
         * type).</p>
         *
         * @param {o2.UnitTest} unitTest - the current active unit test.
         * @param {Object} currentValue - the current value to assert.
         * @param {Object} expectedValue - the expected value to check against.
         * @param {String} message - the associated message.
         */
        assertStrictNotEqual : function(unitTest, currentValue, expectedValue, message) {

            var kRequiredLocalParameterCount = 4;
            var kMethodName = 'assertStrictNotEqual';
            var kArgumentsLength = arguments.length;

            expectProperArgumentLength(kRequiredLocalParameterCount, kArgumentsLength, kMethodName);

            var result = (currentValue !== expectedValue);

            didAssertion(unitTest, result, message);

        },

        /**
         * @function {static} o2.Unit.add
         *
         * <p>Creates a test suite parsing the <strong>testMeta</strong>, and
         * adds it to the test queue.</p>
         *
         * @param {String} description - the description of the test.
         * @param {Object} testMeta - test meta data in the form {count:
         * [number], test: [callback]}, where <strong>count</strong> is the total
         * number of assertions in the test suite, and <strong>test</strong> is
         * the actual test suite <code>Function</code>.
         */
        add : function(description, testMeta) {

            var kRequiredLocalParameterCount = 2;
            var kMethodName = 'add';
            var kArgumentsLength = arguments.length;

            expectProperArgumentLength(kRequiredLocalParameterCount, kArgumentsLength, kMethodName);

            var totalAssertionCount = testMeta.count;
            var testCase = testMeta.test;

            state.tests.push(new UnitTest(description, totalAssertionCount, testCase));

        },

        /**
         * @function {static} o2.Unit.log
         *
         * <p>Logs the <strong>message</strong>.</p>
         * <p>An alias to {@link Debugger.log}.</p>
         *
         * @see o2.Debugger.log
         */
        log : function(message) {

            log(message);

        },

        /**
         * @function {static} o2.Unit.run
         *
         * <p>Asynchronously runs all of the registered
         * <code>UnitTest</code>s, one after another.</p>
         *
         * @param {Function} globalCompletionCallback - (Optional) this callback
         * will be run with <code>o2.Unit</code> as a parameter passed to it.
         */
        run : function(globalCompletionCallback) {

            if(o2.Unit.isRunning) {

                return;
            }

            o2.Unit.isRunning = true;

            var kCheckInterval = config.TEST_CHECK_INTERVAL;

            var oncomplete = globalCompletionCallback ? globalCompletionCallback : o2.nill;

            initializeDebugger();

            var activeUnitTest = null;

            setTimeout(function waitForUnitTest() {

                if(isLocked(activeUnitTest)) {
                    setTimeout(waitForUnitTest, kCheckInterval);

                    return;
                }

                // Grab the currently active UnitTest.
                activeUnitTest = state.tests.shift();

                var isSuiteComplete = !activeUnitTest || !activeUnitTest instanceof UnitTest;

                if(isSuiteComplete) {

                    reportGlobalCompletion();

                    o2.Unit.isRunning = false;

                    // We are done with this unit test, so release the lock.
                    activeUnitTest = null;

                    oncomplete(o2.Unit);

                    return;
                }

                if(hasMoreItems(activeUnitTest)) {
                    execute(activeUnitTest);
                    setTimeout(waitForUnitTest, kCheckInterval);

                    return;
                }

                // We are done with this unit test, so release the lock.
                activeUnitTest = null;

            }, kCheckInterval);

        }

    };

}(o2, this));
