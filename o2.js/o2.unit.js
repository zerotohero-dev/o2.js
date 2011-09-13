/*global o2*/
( function(o2, window, UNDEFINED) {

    /*function UnitTest(description, items){
     this.description = description;
     this.successCount = 0;
     this.failCount = 0;
     this.isDone = false;
     this.log = [];
     }

     var p = UnitTest.prototype;

     p.execute = function(){
     var items = this.items;
     var item = null;
     var description = '';
     var assertion = null;
     var result = false;

     var unit = this;

     setTimeout(function doChunk(){
     item = items.pop();

     if(items.length === 0) { return; }

     description = item[0];
     executeTestCase = item[1];

     executeTestCase();

     setTimeout(doChunk, 500);
     }, 500);
     }

     p.addResult(mixed){
     var result = mixed.result;
     var description = mixed.description;

     o2.Debugger.assert(result, description);

     if(result){
     this.successCount++;
     o2.Unit.globalSuccessCount++;
     }

     this.failureCount++;
     o2.Unit.globalFailureCount++;
     }

     p.hasMoreItems = function(){
     return !this.isDone;
     }

     p.complete = function(){
     this.isDone = true;
     }*/

    function UnitTest(description, count, testPlan) {
        this.description = description;
        this.count = count;
        this.testPlan = testPlan;
    }


    UnitTest.prototype.execute = function() {

    }


    o2.Unit = {
        globalSuccessCount : 0,
        globalFailCount : 0,
        tests : [],

        pushTest : function(description, testMeta) {
            var count = testMeta.count;
            var testPlan = testMeta.test;
            var unitTest = new UnitTest(description, count, testPlan);
            o2.Unit.tests.push(unitTest);
        },
        
        log : function(text){
            o2.Debugger.log(text);
        },

        run : function() {
            o2.Debugger.init('Output', true);
            
            var lock = false;
            
            setTimeout(function waitForUnitTest() {
                if(lock) {
                    setTimeout(waitForUnitTest, 100);
                    return;
                }

                var unitTest = o2.Unit.tests.shift();

                if(!unitTest) {
                    lock = false;
                    return;
                }

                if(!unitTest instanceof UnitTest) {
                    lock = false;
                    return;
                }

                if(unitTest.hasMoreItems()) {
                    lock = true;
                    try {
                        unitTest.execute();
                    } catch(exception) {

                    }
                    //
                    setTimeout(waitForUnitTest, 100);
                    return;
                }
                //
                lock = false;
                return;
            }, 100);

        }

    };

    o2.Unit.pushTest('o2.$ takes String and retuns DOM node', {
        count : 2,
        test : function() {
            var me = this;

            var param = 'testItem';
            var result = o2.$(param);

            //{result: true, message: 'param is String'}  --> addResult
            me.assertEqual(( typeof param), 'string', 'param is String');

            setTimeout(function() {
                me.assertEqual(( typeof param), 'string', 'param is String');
            }, 2000);

        }

    });

    o2.Unit.run();
    
    /* test: function(description, items){
     return new UnitTest(description, items);
     }  */    
    
    /*
     execute -->
     this.testPlan();

     assertEqual : function(){
     this.count--;
     }

     //    me.watch();
     /*setInterval(function(){
     if(totalItems !== 0) { continue; }
     me.complete();
     },100);*/
    /*test = tests.pop();
     test.execute();

     var iid = setInterval(function(){
     if(test.hasMoreItems()) { return; }

     test = test.pop();
     }, 500);

     */
}(o2, this));
