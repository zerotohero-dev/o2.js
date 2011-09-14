/*global o2*/
( function(o2, window) {

    var Demo = {
        init : function() {
            o2.Unit.pushTest('o2.$ takes String and retuns DOM node', {
                count : 2,
                test : function() {
//                    debugger;
                    var me = this;

                    var param = 'testItem';
                    var result = o2.$(param);

                    //{result: true, message: 'param is String'}  --> addResult
                    o2.Unit.assertEqual(me, (typeof param), 'string', 'param is String');

                    setTimeout(function() {
                        o2.Unit.assertEqual(me, (typeof param), 'string', 'param is String');
                    }, 2000);

                }

            });

            o2.Unit.run();

           // alert('hello');
        }

    };

    Demo.init();

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
