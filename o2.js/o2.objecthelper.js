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
 * @module o2.objecthelper
 * @requires o2
 * @requires o2.methodhelper.core
 *
 * <p>An object/clone/copy/inheritance helper.</p>
 */
( function(o2, window, UNDEFINED) {

    /*
     * Aliases
     */
    var clone = o2.MethodHelper.bind;

	/**
	 * @class {static} o2.ObjectHelper
	 *
	 * <p>A helper class for <strong>JavaScript</strong> <code>object</code>
	 * inheritance.</p>
	 */
	o2.ObjectHelper = {

		/**
		 * @function {static} o2.ObjectHelper.copy
		 * <p>Copies <code>base</code>'s methods, to <code>child</code>.
		 */
		copyMethods: function(child, base) {

			var shouldCopy = false;

			for(var key in base) {
				if(base.hasOwnProperty(key)) {
					shouldCopy = base.hasOwnProperty(key) && typeof base[key] == 'function';
					if(!shouldCopy) {
						continue;
					}
					child[key] = clone(o2.JsonpState, base[key]);
				}
			}

		}

	};
}(o2, this));