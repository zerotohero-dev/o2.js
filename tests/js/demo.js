/*global o2*/
( function(o2, window) {

    function testMethod1(param1){
    
        var isSet = !!param1;
    
        if(!isSet){
    
            return null;
    
        }
    
        return 'this is a string';
    
    }
    
    function testMethod2(){
        
        return 42;
    
    }

    /**
     * 
     */
    var Suite = {
        
        /**
         * 
         */
        init : function() {
            o2.Unit.pushTest('testMethod1 should return a String if it has a parameter', {
                count : 1,
                test : function() {
                    
                    var me = this;
                    var assert = o2.Unit.assert;

                    var param = 42;
                    var resultWithParam = testMethod1(param);
                    var resultWithoutParam = testMethod1();
                    
                    assert(me, typeof resultWithParam == 'string', 'testMethod1(param) returns a String');
                    
                }

            });

            o2.Unit.pushTest('testMethod1 should return null if it has no parameters', {
                count : 1,
                test : function() {
                    
                    var me = this;
                    var assert = o2.Unit.assert;

                    var param = 42;
                    var resultWithParam = testMethod1(param);
                    var resultWithoutParam = testMethod1();
                    
                    assert(me, resultWithoutParam === null, 'testMethod1() returns null');
                    
                }

            });

            o2.Unit.pushTest('this is just for demonstration', {
                count : 2,
                test : function() {
                    
                    var me = this;
                    var assertEqual = o2.Unit.assertEqual;

                    var param = 'testItem';

                    o2.Unit.assert(me, param, 'param exists.');

                    setTimeout(function() {
                        
                        assertEqual(me, ( typeof param), 'string', 'param is String.');

                    }, 2000);

                    //this._will.raise_an_error.thats_the_point = 1;

                }

            });

            o2.Unit.run();
        }

    };

    Suite.init();

}(o2, this));
