/*global o2*/
( function(o2, window) {

    var Demo = {
        init : function() {
            o2.Unit.pushTest('parameter exists and it is a number', {
                count : 2,
                test : function() {
                    var me = this;

                    var param = 42;

                    o2.Unit.assert(me, param, 'param exists.');

                    setTimeout(function() {

                        o2.Unit.assertEqual(me, ( typeof param), 'number', 'param is a Number.');

                    }, 2000);

                    //this._will.raise_an_error.thats_the_point = 1;

                }

            });

            o2.Unit.pushTest('parameter exists and it is a String', {
                count : 2,
                test : function() {
                    
                    var me = this;

                    var param = 'testItem';

                    o2.Unit.assert(me, param, 'param exists.');

                    setTimeout(function() {
                        
                        o2.Unit.assertEqual(me, ( typeof param), 'string', 'param is String.');

                    }, 2000);

                    //this._will.raise_an_error.thats_the_point = 1;

                }

            });

            o2.Unit.run();
        }

    };

    Demo.init();

}(o2, this));
