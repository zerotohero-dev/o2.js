/*global o2*/
( function(o2, window, UNDEFINED) {
    //TODO: add header.

    var log = o2.Debugger.log;

    function UnitTest(description, count, testPlan) {
        this.description = description;
        this.count = count;
        this.testPlan = testPlan;
    }

    UnitTest.prototype.execute = function() {
        log('executing test: ' + this.description + ' ' + this.count);
        this.testPlan.apply(this, []);
    };
    
    UnitTest.prototype.hasMoreItems = function(){
        return this.count > 0;
    };
    
    UnitTest.prototype.didAssertion = function(){
        this.count--;  
    };


    o2.Unit = {
        globalSuccessCount : 0,
        globalFailCount : 0,
        tests : [],
        
        assertEqual : function(unitTest, lValue, rValue, message){
            log('assserEqual');
            unitTest.didAssertion();  
        },

        pushTest : function(description, testMeta) {
            var count = testMeta.count;
            var testPlan = testMeta.test;
            var unitTest = new UnitTest(description, count, testPlan);
            o2.Unit.tests.push(unitTest);
        },

        run : function() {
            o2.Debugger.init('Output', true);
            
            log('Started running Unit');
            
//            var lock = false;
            var activeUnitTest = null;
 
            function isLocked(){
                return activeUnitTest && activeUnitTest.hasMoreItems();
            }
            
            function unlock(){
                activeUnitTest = null;
            }
 
            
            setTimeout(function waitForUnitTest() {
                if(isLocked()) {
                    log('lock...waiting...');
                    setTimeout(waitForUnitTest, 100);
                    return;
                }

                activeUnitTest = o2.Unit.tests.shift();
                
                log('got the next unit test');

                if(!activeUnitTest) {
                    log('released lock... exiting.');
                    //lock = false;
                    unlock();
                    return;
                }

                if(!activeUnitTest instanceof UnitTest) {
                    log('bad instance... exiting.');
                    //lock = false;
                    unlock();
                    return;
                }

                if(activeUnitTest.hasMoreItems()) {
                    log('unit test has more items... locking...');
                    //lock = true;
                    try {
                        activeUnitTest.execute();
                    } catch(exception) {

                    }
                    //
                    setTimeout(waitForUnitTest, 100);
                    return;
                }
                log('unit test has no more item... exiting...');
                //
                unlock();
                return;
            }, 100);
            
            log('Exited function');
        }

    };

}(o2, this));
