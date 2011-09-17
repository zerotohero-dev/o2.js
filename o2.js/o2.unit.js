/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */

/*global o2, alert*/
( function(o2, window, UNDEFINED) {
    //TODO: add documentation.

    var log = o2.Debugger.log;
    var assert = o2.Debugger.assert;
    var initDebugger = o2.Debugger.init;
    var format = o2.StringHelper.format;

    /*
     *
     */
    var config = {

        /*
         *
         */
        TEST_CHECK_INTERVAL : 100,

        /*
         *
         */
        TEST_OUTPUT_CONTAINER : 'Output',

        /*
         *
         */
        TEST_SHOULD_USE_CONSOLE : true

    };

    /*
     *
     */
    var errorMessage = {

        /*
         *
         */
        FAILED_TO_INITIALIZE_DEBUGGER : 'Failed to initialize o2.Debugger. No "UnitTest"s will be run!',

        /*
         *
         */
        FATAL_ERROR_IN_UNIT_TEST : 'FATAL ERROR in UnitTest setup: "{0}"',

        /*
         *
         */
        ARGUMENT_COUNT_MISMATCH : '"{0}" expects {1} arguments'

    };

    /*
     *
     */
    var template = {
        // @formatter:off

        /*
         * 
         */
        UPDATE_TEST_COMPLETION : [
            '<p><b>Completed</b>: "{0}":</p>', 
            '<p style="text-align:right">(<b>success: {1}</b> , ',
            '<b>failure: {2}</b>)</p>'
        ].join(''),

        /*
         * 
         */
        REPORT_GLOBAL_COMPLETION :  ['<p>All unit tests have been completed:</p>',
            '<p style="text-align:right">(<b>total success: {0}', 
            '</b> , <b>total failure: {1}</b>)</p>'
        ].join('')

        // @formatter:on
    };

    var state = {

        /**
         *
         */
        tests : [],

        /**
         *
         */
        globalSuccessCount : 0,

        /**
         *
         */
        globalFailureCount : 0

    };

    /**
     *
     */
    function reportTestCompletion(unitTest) {

        var isAllSuccess = unitTest.failureCount <= 0;

        var description = unitTest.description;
        var successCount = unitTest.successCount;
        var failureCount = unitTest.failureCount;

        var message = format(template.UPDATE_TEST_COMPLETION, description, successCount, failureCount);

        assert(isAllSuccess, message);

    }

    /**
     *
     */
    function reportGlobalCompletion() {

        var successCount = state.globalSuccessCount;
        var failureCount = state.globalFailureCount;

        var message = format(template.REPORT_GLOBAL_COMPLETION, successCount, failureCount);

        assert(state.globalFailureCount <= 0, message);

    }

    /**
     *
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

    /**
     *
     */
    function didAssertion(unitTest, isSuccess, message) {

        assert(isSuccess, message);
        updateTestStatus(unitTest, isSuccess);

        unitTest.remainingCount--;

        if(unitTest.remainingCount <= 0) {
            reportTestCompletion(unitTest);
        }

    }

    /**
     *
     */
    function reportFatalError(unitTest) {

        var message = format(errorMessage.FATAL_ERROR_IN_UNIT_TEST, unitTest.description);
        didAssertion(unitTest, false, message);

    }

    /**
     *
     */
    function hasMoreItems(unitTest) {

        return unitTest.remainingCount > 0;

    }

    /**
     *
     */
    function isLocked(activeUnitTest) {

        return activeUnitTest && hasMoreItems(activeUnitTest);

    }

    /**
     *
     */
    function initializeDebugger() {

        try {

            initDebugger(config.TEST_OUTPUT_CONTAINER, config.TEST_SHOULD_USE_CONSOLE);

        } catch(failedToInitializeException) {

            throw errorMessage.FAILED_TO_INITIALIZE_DEBUGGER;

        }

    }

    /**
     *
     */
    function UnitTest(description, totalAssertionCount, testCase) {

        this.description = description;
        this.remainingCount = totalAssertionCount;
        this.successCount = 0;
        this.failureCount = 0;
        this.testCase = testCase;

    }

    function execute(unitTest) {

        try {

            unitTest.testCase.apply(unitTest, []);

        } catch(executionException) {

            unitTest.remainingCount = 0;
            reportFatalError(unitTest);

        }

    }

    /**
     * @class {static} o2.Unit
     *
     * <p>A "unit test" processor class.</p>
     */
    o2.Unit = {

        /**
         *
         */
        assert : function(unitTest, expression, message) {

            if(arguments.length != 3) {

                throw format(errorMessage.ARGUMENT_COUNT_MISMATCH, 'assert', 3);
            }

            var result = !!expression;
            didAssertion(unitTest, result, message);

        },

        /**
         *
         */
        assertEqual : function(unitTest, currentValue, expectedValue, message) {

            if(arguments.length != 4) {

                throw format(errorMessage.ARGUMENT_COUNT_MISMATCH, 'assertEqual', 4);
            }

            var result = (currentValue == expectedValue);
            didAssertion(unitTest, result, message);

        },

        /**
         *
         */
        assertNotEqual : function(unitTest, currentValue, expectedValue, message) {

            if(arguments.length != 4) {

                throw format(errorMessage.ARGUMENT_COUNT_MISMATCH, 'assertNotEqual', 4);
            }

            var result = (currentValue != expectedValue);
            didAssertion(unitTest, result, message);

        },

        /**
         *
         */
        assertStrictEqual : function(unitTest, currentValue, expectedValue, message) {

            if(arguments.length != 4) {

                throw format(errorMessage.ARGUMENT_COUNT_MISMATCH, 'assertStrictEqual', 4);
            }

            var result = (currentValue === expectedValue);
            didAssertion(unitTest, result, message);

        },

        /**
         *
         */
        assertStrictNotEqual : function(unitTest, currentValue, expectedValue, message) {

            if(arguments.length != 4) {

                throw format(errorMessage.ARGUMENT_COUNT_MISMATCH, 'assertStrictNotEqual', 4);
            }

            var result = (currentValue !== expectedValue);
            didAssertion(unitTest, result, message);

        },

        /**
         *
         */
        add : function(description, testMeta) {

            if(arguments.length != 2) {

                throw format(errorMessage.ARGUMENT_COUNT_MISMATCH, 'add', 4);
            }

            var totalAssertionCount = testMeta.count;
            var testCase = testMeta.test;
            state.tests.push(new UnitTest(description, totalAssertionCount, testCase));

        },

        /**
         *
         */
        run : function() {
            var kCheckInterval = config.TEST_CHECK_INTERVAL;

            initializeDebugger();

            var activeUnitTest = null;

            setTimeout(function waitForUnitTest() {

                if(isLocked(activeUnitTest)) {
                    setTimeout(waitForUnitTest, kCheckInterval);

                    return;
                }

                //
                activeUnitTest = state.tests.shift();

                if(!activeUnitTest) {
                    reportGlobalCompletion();
                    activeUnitTest = null;

                    return;
                }

                if(!activeUnitTest instanceof UnitTest) {
                    reportGlobalCompletion();
                    activeUnitTest = null;

                    return;
                }

                if(hasMoreItems(activeUnitTest)) {
                    execute(activeUnitTest);
                    setTimeout(waitForUnitTest, kCheckInterval);

                    return;
                }

                //
                activeUnitTest = null;

            }, kCheckInterval);

        }

    };

}(o2, this));
