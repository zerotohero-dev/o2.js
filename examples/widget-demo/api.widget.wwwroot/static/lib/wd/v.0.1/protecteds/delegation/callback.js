(function(window) {
    'use strict';
//2012-08-01 04:47:15.001101
    if (!window._wd) { return; }

    var wd = window._wd;
    var p  = wd.protecteds;

    /*
     * Aliases
     */
    function log(stuff) { p.log(stuff); }

    /*
     *
     */
    var me = p.Callback = {};

    /*
     * Parameter Names
     */
    //TODO: have them in a common place
    var kUsername = 'u';
    var kPassword = 'p';

    /*
     * Element IDs
     */
    //TODO: have them in a common place.
    var kLoginButtonId = 'wd_btnLogin';

    /*
     * User login JSONP callback.
     */
    //TODO: to B.
    function fireUserLogin(response) {
        p.o2.Event.publish(p.event.USER_LOGGED_IN, response);
    }

    /*
     * Global event handler on document's click event.
     */
    me.event = {

        /*
         *
         */
        document_click : function(evt) {
            log('Callback.event.document_click()');

            var o2   = p.o2;
            var url  = p.url;
            var path = p.path;

            var target = o2.Event.getTarget(evt);

            var id = target.id;

            if (!id) {
                return;
            }

            // Just for demonstration.
            var params = {};
            params[kUsername] = 'dummy';
            params[kPassword] = 'dummy';

            if (id.indexOf(kLoginButtonId) === -1) {
                return;
            }

            //TODO: to C
            o2.Jsonp.get(
                o2.String.concat(url.API_ROOT, path.LOGIN),
                params,
                fireUserLogin
            );
        }
    };
}(this));
