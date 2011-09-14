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

    var config = {
        TEST_CHECK_TIMEOUT : 100,
        TEST_OUTPUT_CONTAINER : 'Output',
        TEST_SHOULD_USER_CONSOLE : true
    };

    /**
     *
     */
    function reportGlobalCompletion() {

        // @formatter:off
        var message = ['All unit tests are complete: ',
            '(total success: ' , o2.Unit.globalSuccessCount + ', total failure: ' , o2.Unit.globalFailureCount , ')'
        ].join('');
        // @formatter:on

        log(message);

    }

    /**
     *
     */
    function reportFatalError(unitTest) {

        var message = ['FATAL ERROR in Unit test setup: "', unitTest.description, '"'].join('');
        unitTest.didAssertion(false, message);

    }

    /**
     *
     */
    function updateTestStatus(unitTest, isSuccess) {

        if(isSuccess) {
            o2.Unit.globalSuccessCount++;
            unitTest.successCount++;
            return;
        }

        o2.Unit.globalFailureCount++;
        unitTest.failureCount++;
    }

    /**
     *
     */
    function updateTestCompletion(unitTest) {

        var isAllSuccess = unitTest.failureCount <= 0;

        // @formatter:off
        var message = ['Completed: "', unitTest.description, '": ', 
            '(success:' , unitTest.successCount, ',fail:', unitTest.failureCount, ')'].join('');
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
            o2.Debugger.init(config.TEST_OUTPUT_CONTAINER, config.TEST_SHOULD_USE_CONSOLE);
        } catch(failedToInitializeException) {
            throw 'o2.Unit.run: Failed to initialize o2.Debugger. No unit tests will be run.';
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
     *
     */
    o2.Unit = {

        globalSuccessCount : 0,
        globalFailureCount : 0,
        tests : [],

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
            o2.Unit.tests.push(new UnitTest(description, totalAssertionCount, testPlan));

        },

        run : function() {

            initializeDebugger();

            var activeUnitTest = null;

            setTimeout(function waitForUnitTest() {

                if(isLocked(activeUnitTest)) {
                    setTimeout(waitForUnitTest, config.TEST_CHECK_TIMEOUT);
                    return;
                }
                //
                activeUnitTest = o2.Unit.tests.shift();

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
                    try {
                        activeUnitTest.execute();
                    } catch(exception) {

                    }

                    setTimeout(waitForUnitTest, config.TEST_CHECK_TIMEOUT);
                    return;
                }
                //
                activeUnitTest = null;
                return;

            }, config.TEST_CHECK_TIMEOUT);

        }

    };

}(o2, this));
