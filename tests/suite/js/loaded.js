/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(window, o2) {
    'use strict';

    try {
        window.parent.Runner.notify({
            subject : window.o2Test.suites.o2,
            action  : 'loaded'
        });
    } catch(e) {
        window.parent.Runner.notify({error : e});
    }
}(this, this.o2));

