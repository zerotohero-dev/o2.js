/*global window, o2*/

/*
* Copyright © by Volkan Özçelik - http://o2js.com/
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

/**
 * @module o2.jsonpstate
 * @requires o2.ajaxstate
 *
 * <p>A <strong>Model</strong> for controlling <strong>JSONP</strong> timeouts
 * etc.
 * An {@link o2.JsonpController} should be registered to this
 * <strong>model</strong>.
 */
( function(o2, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var clone = o2.MethodHelper.bind;

    /**
     * @class {static} o2.JsonpState
     * @extends o2.AjaxState
     *
     * <p>Implements all public methods of {@link o2.AjaxState} for
     * <strong>JSONP</strong> requests.</p>
     */
    o2.JsonpState = {
        // Note that o2.JsonpState uses its own configutarion and state context:
        protecteds : {
            config : {
                LISTEN_TIMEOUT : 1001
            },
            state : {
                listenTimeoutId : null
            },
            observers : []
        }
    };

    var base = o2.AjaxState;
    var baseProtected = o2.AjaxState.protecteds;
    var key = '';

    for(key in base) {
        if(base.hasOwnProperty(key)) {
            if( typeof base[key] == 'function') {
                o2.JsonpState[key] = clone(o2.JsonpState, base[key]);
            }
        }
    }

    for(key in baseProtected) {
        if(baseProtected.hasOwnProperty(key)) {
            if( typeof baseProtected[key] == 'function') {
                o2.JsonpState.protecteds[key] = clone(o2.JsonpState.protecteds, baseProtected[key]);
            }
        }
    }
}(o2, this));
