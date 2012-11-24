/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp) {
    'use strict';

    /**
     * @module   unit.core
     *
     * @requires core
     * @requires debugger.core
     * @requires dom.scroll
     * @requires string.core
     *
     * <p>This package is a unit test runner, that is used to test
     * <strong>js</strong> units.</p>
     */
    fp.ensure(
        'unit.core',
    [
        'core',
        'debugger.core',
        'dom.scroll',
        'string.core'
    ]);

    var attr    = fp.getAttr,
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        obj     = attr(fp, 'getObject'),
        require = attr(fp, 'require'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'Unit',

        /**
         * @class {static} o2.Unit
         *
         * <p>A "unit test" <strong>runner</strong>.</p>
         * <p>Runs <code>UnitTest</code>s.</p>
         */
        me     = create(kModuleName),
        myself = obj(me),

        /*
         * # Aliases
         */

        /*
         * core
         */
        nill = require('nill'),

        /*
         * debugger.core
         */

        kDebugger    = 'Debugger',

        //TODO: add to documentation that this require is different than
        //the require.js's require -- it's just a name similarity.
        assert       = require(kDebugger, 'assert'),
        initDebugger = require(kDebugger, 'init'),
        log          = require(kDebugger, 'log'),

        /*
         * string.core
         */
        kString = 'String',
        concat = require(kString, 'concat'),
        format = require(kString, 'format'),

        /*
         * dom.scroll
         */
        scrollToBottom = require('Dom', 'scrollWindowToBottom'),

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
         * # To be Overridden
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
        this.description    = description;
        this.failureCount   = 0;
        this.remainingCount = totalAssertionCount;
        this.successCount   = 0;
        this.testCase       = testCase;
    }

    p = UnitTest.prototype;

    /**
     * @function o2.UnitTest.terminate
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * test.terminate();
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
        if (argumentsLength === localParameterCount) {return;}

        didAssertion(unitTest, false, kArgumentException);

        throw format(kArgumentCountMismatch, methodName, localParameterCount);
    }

    /**
     * @function {static} o2.Unit.add
     *
     * <p>Creates a test suite parsing the <strong>testMeta</strong>, and
     * adds it to the test queue.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.add('some method SHOULD meet a requirement', {
     *      count: 1,
     *      test : function() {
     *          var me = this;
     *          o2.Unit.assert(me, false, 'I pass.');
     *      }
     * });
     * </pre>
     *
     * @param {String} description - the description of the test.
     * @param {Object} testMeta - test meta data in the form {count:
     * [number], test: [callback]}, where <strong>count</strong> is the
     * total number of assertions in the test suite, and
     * <strong>test</strong> is the actual test suite <code>Function</code>.
     */
    exports.add = def(me, 'add', function(description, testMeta) {
        var kRequiredLocalParameterCount = 2,
            kMethodName                  = 'add',
            kArgumentsLength             = arguments.length,
            totalAssertionCount          = testMeta.count,
            testCase                     = testMeta.test;

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
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.assert(me, condition, 'condition is true');
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Expression} expression - the expression to evaluate.
     * @param {String} message - the associated message.
     */
    exports.assert = def(me, 'assert', function(unitTest, expression, message) {
        var kArgumentsLength             = arguments.length,
            kMethodName                  = 'assert',
            kRequiredLocalParameterCount = 3,

            result = !!expression;

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    });

    /**
     * @function {static} o2.Unit.assertEqual
     * <p>Asserts whether two values are equal.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.assertEqual(me, 10, '10', '10 is 10');
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */
    exports.assertEqual = def(me, 'assertEqual', function(unitTest,
                currentValue, expectedValue, message) {
        var kArgumentsLength             = arguments.length,
            kMethodName                  = 'assertEqual',
            kRequiredLocalParameterCount = 4,

            // JSLint valitation error on purpose.
            result = (currentValue == expectedValue);

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    });

    /**
     * @function {static} o2.Unit.assertNotEqual
     * <p>Asserts whether two values are <strong>NOT</strong> equal.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.assertNotEqual(me, 10, '11', '10 is not 11');
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */
    exports.assertNotEqual = def(me, 'assertNotEqual', function(unitTest,
                currentValue, expectedValue, message) {
        var kArgumentsLength             = arguments.length,
            kMethodName                  = 'assertNotEqual',
            kRequiredLocalParameterCount = 4,

            // JSLint validation error on purpose:
            result = (currentValue != expectedValue);

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
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.assertStrictEqual(me, 10, 10, '10 is 10');
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */
    exports.assertStrictEqual = def(me, 'assertStrictEqual', function(unitTest,
                currentValue, expectedValue, message) {
        var kArgumentsLength             = arguments.length,
            kMethodName                  = 'assertStrictEqual',
            kRequiredLocalParameterCount = 4,

            result = (currentValue === expectedValue);

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
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.assertStrictNotEqual(me, 10, '10', '10 is not 10');
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */
    exports.assertStrictNotEqual = def(me, 'assertStrictNotEqual', function(
                unitTest, currentValue, expectedValue, message) {
        var kArgumentsLength             = arguments.length,
            kMethodName                  = 'assertStrictNotEqual',
            kRequiredLocalParameterCount = 4,

            result = (currentValue !== expectedValue);

        expectProperArgumentLength(unitTest, kRequiredLocalParameterCount,
            kArgumentsLength, kMethodName);

        didAssertion(unitTest, result, message);
    });

    /**
     * @function {static} o2.Unit.getGlobalFailureCount
     *
     * <p>Gets the total number of failed assertions so far.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var totalFail = o2.Unit.getGlobalFailureCount();
     * </pre>
     *
     * @return the total number of failed assertions.
     */
    exports.getGlobalFailureCount = def(me, 'getGlobalFailureCount',
                function() {
        return globalFailureCount;
    });

    /**
     * @function {static} o2.Unit.getGlobalSuccessCount
     *
     * <p>Gets the total number of successful assertions so far.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var totalSuccess = o2.Unit.getGlobalSuccessCount();
     * </pre>
     *
     * @return the total number of successful assertions.
     */
    exports.getGlobalSuccessCount = def(me, 'getGlobalSuccessCount',
                function() {
        return globalSuccessCount;
    });

    /**
     * @function {static} o2.Unit.isRunning
     *
     * <p>Checks whether the current <strong>test suite</strong> is still
     * running.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isActive = o2.Unit.isRunning();
     * </pre>
     *
     * @return <code>true</code> if the current <strong>test suite</strong>
     * is still runing; <code>false</code> otherwise.
     */
    exports.isRunning = def(me, 'isRunning', function() {
        return isRunning;
    });

    /**
     * @function {static} o2.Unit.log
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.log('hello world');
     * </pre>
     *
     * <p>Logs the <strong>message</strong>.</p>
     * <p>An alias to {@link Debugger.log}.</p>
     *
     * @see o2.Debugger.log
     */
    exports.log = def(me, 'log', function(message) {
        log(message);
    });

    /**
     * @function {static} o2.Unit.run
     *
     * <p>Asynchronously runs all of the registered
     * <code>UnitTest</code>s, one after another.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.run(function() {
     *      // Completed.
     * });
     * </pre>
     *
     * @param {Function} globalCompletionCallback - (Optional) this callback
     * will be run with <code>o2.Unit</code> as a parameter passed to it.
     */
    exports.run = def(me, 'run', function(globalCompletionCallback) {
        if (isRunning) {return;}

        isRunning = true;

        var oncomplete     = globalCompletionCallback || nill,
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
}(this.o2, this.o2.protecteds));

