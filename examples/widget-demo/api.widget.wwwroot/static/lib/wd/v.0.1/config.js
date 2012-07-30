(function(window) {
    'use strict';

//2012-07-30 22:35:29.425704

    var kPublisherId  = 'pubId';
    var kWidgetAlias  = '_wd';

    if (!window._wd) {
        return;
    }

    var wd = window._wd;

    var p = wd.protecteds;

//    alert(p);

    /*
     * Aliases
     */
    function log(stuff) { p.log(stuff); }

    /*
     *
     */
    var me = p.Config = {};

    /*
     * Get widget configuration from DOM.
     */
    me.get = function() {
        log('o->getConfiguration()');

        var result = {};

        result[kPublisherId] = window[kWidgetAlias][kPublisherId];

        return result;
    };

}(this));