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

    /**
     *
     */
    var config = {

        /**
         *
         */
        TEST_CHECK_TIMEOUT : 100,

        /**
         *
         */
        TEST_OUTPUT_CONTAINER : 'Output',

        /**
         *
         */
        TEST_SHOULD_USER_CONSOLE : true

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
    function reportGlobalCompletion() {

        // @formatter:off
        var message = ['All unit tests have been completed: ',
            '(<b>total success: ' , state.globalSuccessCount, 
            '</b> , <b>total failure: ' , state.globalFailureCount , '</b>)'
        ].join('');
        // @formatter:on

        log(message);

    }

    /**
     *
     */
    function reportFatalError(unitTest) {

        var message = ['FATAL ERROR in UnitTest setup: "', unitTest.description, '"'].join('');
        unitTest.didAssertion(false, message);

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
    function updateTestCompletion(unitTest) {

        var isAllSuccess = unitTest.failureCount <= 0;

        // @formatter:off
        var message = [
            '<b>Completed</b>: "', unitTest.description, '": ', 
            '(<b>success: ' , unitTest.successCount, '</b> , ',
            '<b>failure: ', unitTest.failureCount, '</b>)'
        ].join('');
        // @formatter:on

        assert(isAllSuccess, message);

    }

    /**
     *
     */
    function isLocked(activeUnitTest) {

        return activeUnitTest && activeUnitTest.hasMoreItems();

    }

    /**
     *
     */
    function initializeDebugger() {

        try {

            initDebugger(config.TEST_OUTPUT_CONTAINER, config.TEST_SHOULD_USE_CONSOLE);

        } catch(failedToInitializeException) {

            throw 'o2.Unit.run: Failed to initialize o2.Debugger. No "UnitTest"s will be run.';

        }

    }

    /**
     *
     */
    function UnitTest(description, totalAssertionCount, testPlan) {

        this.description = description;
        this.remainingCount = totalAssertionCount;
        this.successCount = 0;
        this.failureCount = 0;
        this.testPlan = testPlan;

    }

    var up = UnitTest.prototype;

    /**
     *
     */
    up.execute = function() {

        try {

            this.testPlan.apply(this, []);

        } catch(executionException) {

            this.remainingCount = 0;
            reportFatalError(this);

        }

    };

    /**
     *
     */
    UnitTest.prototype.hasMoreItems = function() {

        return this.remainingCount > 0;

    };

    /**
     *
     */
    UnitTest.prototype.didAssertion = function(isSuccess, message) {

        assert(isSuccess, message);
        updateTestStatus(this, isSuccess);

        this.remainingCount--;

        if(this.remainingCount <= 0) {
            updateTestCompletion(this);
        }

    };

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

            var result = !!expression;
            unitTest.didAssertion(result, message);

        },

        /**
         *
         */
        assertEqual : function(unitTest, currentValue, expectedValue, message) {

            var result = (currentValue == expectedValue);
            unitTest.didAssertion(result, message);

        },

        /**
         *
         */
        assertNotEqual : function(unitTest, currentValue, expectedValue, message) {

            var result = (currentValue != expectedValue);
            unitTest.didAssertion(result, message);

        },

        /**
         *
         */
        assertStrictEqual : function(unitTest, currentValue, expectedValue, message) {

            var result = (currentValue === expectedValue);
            unitTest.didAssertion(result, message);

        },

        /**
         *
         */
        assertStrictNotEqual : function(unitTest, currentValue, expectedValue, message) {

            var result = (currentValue !== expectedValue);
            unitTest.didAssertion(result, message);

        },

        /**
         *
         */
        pushTest : function(description, testMeta) {

            var totalAssertionCount = testMeta.count;
            var testPlan = testMeta.test;
            state.tests.push(new UnitTest(description, totalAssertionCount, testPlan));

        },

        /**
         *
         */
        run : function() {

            initializeDebugger();

            var activeUnitTest = null;

            setTimeout(function waitForUnitTest() {

                if(isLocked(activeUnitTest)) {
                    setTimeout(waitForUnitTest, config.TEST_CHECK_TIMEOUT);

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
                    activeUnitTest = null;

                    return;
                }

                if(activeUnitTest.hasMoreItems()) {
                    activeUnitTest.execute();
                    setTimeout(waitForUnitTest, config.TEST_CHECK_TIMEOUT);

                    return;
                }

                //
                activeUnitTest = null;

            }, config.TEST_CHECK_TIMEOUT);

        }

    };

}(o2, this));
