'use strict';

require([
    'amd/o2/string/core',
    'amd/o2/ajax/core'
], function(
    core,
    ajax
) {
    describe("o2.string.core", function() {

        it("returns a greeting when `sayHi` is called.", function() {
            var div = document.createElement('div');

            div.innerHTML = core.sayHi() + ajax.sayHi();

            var greet = 'Hello world; hello stars; hello universe!';

            expect(div.innerHTML).toBe(greet + greet);
        });
    });

});
