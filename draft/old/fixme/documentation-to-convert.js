// Convert these docs to a more modern documentation format.
// It should be ideally grunt-compatible.

/**
 * @module ajax.core
 *
 * <p>A cross-browser <strong>AJAX</strong> Wrapper.</p>
 */

     /**
     * @function {static} o2.Ajax.abort
     * <p>Explicitly abort the request.</p>
     * <p>When the request is explicitly abourted, <strong>onaborted</strong>
     * callback is fired.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var request = o2.Ajax.get(url, params, callbacks);
     *
     * ...
     *
     * if (someCondition) {
     *      o2.Ajax.abort(request);
     * }
     * </pre>
     *
     * @param {XMLHttpRequest} xhr - the original
     * <strong>XMLHttpRequest</strong> being sent.
     */

    /**
     * @function {static} o2.Ajax.createXhr
     *
     * <p>Creates a native <code>XMLHttpRequest</code> object.
     * <p>This is a <strong>low-level</strong> function; it simply returns
     * the browser's native object.
     * You may most probably want to use {@link Ajax.get} or {@link
     * Ajax.post} instead, for more functionality.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * // Creates a low-level cross-browser XmlHttpRequest object.
     * var request = o2.Ajax.createXhr();
     * </pre>
     * @return the created <code>XMLHttpRequest</code> object.
     */

    /**
     * @function {static} o2.Ajax.get
     *
     * <p>Sends and <strong>AJAX GET</strong> request.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var request = o2.Ajax.get('/api.php', {
     *      name   : 'Volkan Özçelik',
     *      action : 'add'
     * }, {
     *      oncomplete  : function(text, xml, xhr, status) {},
     *      onerror     : function(statusCode, statusText, xhr) {},
     *      onaborted   : function(xhr) {},
     *      onexception : function(exception, xhr) {}
     * });
     * </pre>
     *
     * @param {String} url - the URL to send the request.
     * @param {Object} parameters - parameters collection as a name/value
     * pair object ({}).
     * @param {Object} callbacks - An object of the form
     * {oncomplete: fn(responseText, responseXml, xhr, status),
     * onerror: fn(status, statusText, xhr), onaborted: fn(xhr),
     * onexception: fn(exception, originalXhr)}.
     * Any of these callbacks are optional.
     * @param {Boolean} isSync - (optional defaults to <code>false</code>).
     * Set this <code>true</code> for sending a snychronous request.
     *
     * @return the original <code>XMLHttpRequest</code> object.
     */

    /**
     * @function {static} o2.Ajax.post
     *
     * <p>Sends an <strong>AJAX POST</strong> request.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var request = o2.Ajax.post('/api.php', {
     *      name   : 'Volkan Özçelik',
     *      action : 'add'
     * }, {
     *      oncomplete  : function(text, xml, xhr, status) {},
     *      onerror     : function(statusCode, statusText, xhr) {},
     *      onaborted   : function(xhr) {},
     *      onexception : function(exception, xhr) {}
     * });
     * </pre>
     *
     * @param {String} url - the <strong>URL</strong> to send the request.
     * @param {Object} parameters - parameters collection as a
     * <strong>name/value</strong> pair object ({}).
     * @param {Object} callbacks - An object of the form
     * {oncomplete: fn(responseText, responseXml, xhr, status),
     * onerror: fn(status, statusText, xhr), onaborted : fn(xhr),
     * onexception: fn(exception, originalXhr)}.
     * Any of these callbacks are optional.
     * @param {Boolean} isSync - (optional defaults to <code>false</code>).
     * Set this <code>true</code> for sending a <strong>snychronous</strong>
     * request.
     *
     * @return the original <code>XMLHttpRequest</code> object.
     */

/**
 * @module ajax.extend
 *
 * <p>An AJAX controller that implements the <strong>Observer
 * Pattern</strong>.</p>
 */

   /**
    * @function {static} o2.Ajax.getSingle
    *
    * <p>Sends a single <strong>AJAX</strong> <strong>GET</strong> request,
    * and discards further requests until a response comes from the first
    * request.</p>
    *
    * <p>Two requests that have identical <strong>URL</strong>s and parameter
    * name-value pairs, are considered unique. This method, ensures that no two
    * unique <strong>GET</strong> requests will be fired without waiting for the
    * other.</p>
    *
    * <p><strong>Usage example:</strong></p>
    *
    * <pre>
    * var request = o2.Ajax.getSingle('/api.php', {
    *      name   : 'Volkan Özçelik',
    *      action : 'add'
    * }, {
    *      oncomplete  : function(text, xml, xhr, status) {},
    *      onerror     : function(statusCode, statusText, xhr) {},
    *      onaborted   : function(xhr) {},
    *      onexception : function(exception, xhr) {}
    * });
    * </pre>
    *
    * @param {String} url - the URL to send the request.
    * @param {Object} parameters - parameters collection as a name/value
    * pair object ({}).
    * @param {Object} callbacks - An object of the form
    * {oncomplete: fn(responseText, responseXml, xhr, status),
    * onerror: fn(status, statusText, xhr), onaborted: fn(xhr),
    * onexception: fn(exception, originalXhr)}.
    * Any of these callbacks are optional.
    *
    * @return the active <code>XMLHttpRequest</code> object.
    *
    * @see o2.Ajax.get
    */

   /**
    * @function {static} o2.Ajax.postSingle
    *
    * <p>Sends a single <strong>AJAX</strong> <strong>POST</strong> request,
    * and discards further requests until a response comes from the first
    * request.</p>
    *
    * <p>Two requests that have identical <strong>URL</strong>s and parameter
    * name-value pairs, are considered unique. This method, ensures that no two
    * unique <strong>POST</strong> requests will be fired without waiting for
    * the other.</p>
    *
    * <p><strong>Usage example:</strong></p>
    *
    * <pre>
    * var request = o2.Ajax.postSingle('/api.php', {
    *      name   : 'Volkan Özçelik',
    *      action : 'add'
    * }, {
    *      oncomplete  : function(text, xml, xhr, status) {},
    *      onerror     : function(statusCode, statusText, xhr) {},
    *      onaborted   : function(xhr) {},
    *      onexception : function(exception, xhr) {}
    * });
    * </pre>
    *
    * @param {String} url - the URL to send the request.
    * @param {Object} parameters - parameters collection as a name/value
    * pair object ({}).
    * @param {Object} callbacks - An object of the form
    * {oncomplete: fn(responseText, responseXml, xhr, status),
    * onerror: fn(status, statusText, xhr), onaborted: fn(xhr),
    * onexception: fn(exception, originalXhr)}.
    * Any of these callbacks are optional.
    *
    * @return the active <code>XMLHttpRequest</code> object.
    *
    * @see o2.Ajax.post
    */

/**
 * @module ajaxcontroller.core
 *
 * <p>An AJAX controller that implements the <strong>Observer
 * Pattern</strong>.</p>
 */

    /**
     * @class o2.AjaxController
     * @implements Observer
     *
     * <p>An AJAX <code>Controller</code>. Registers itself to {@link
     * AjaxState} <code>Observable</code> upon construction.</p>
     *
     * <p>Implements the <code>Observer</code> interface.</p>
     */

    /**
     * @constructor o2.AjaxController.AjaxController
     *
     * <p>See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observer.html
     * </p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var request = o2.Ajax.get('/api.php', {
     *      name   : 'Volkan Özçelik',
     *      action : 'add'
     * }, {
     *      oncomplete  : function(text, xml, xhr, status) {},
     *      onerror     : function(statusCode, statusText, xhr) {},
     *      onaborted   : function(xhr) {},
     *      onexception : function(exception, xhr) {}
     * });
     *
     * // The request will time out after 5 seconds and then ontimeout
     * // will be called.
     * var controller = new o2.AjaxController(request, {
     *      timeout   : 5000,
     *      ontimeout : function() {
     *      }
     * });
     * </pre>
     *
     * @param {XMLHttpRequest} xhr - the original XMLHttpRequest
     * @param {Object} args - an associative array in the form
     * {timeout:[timeoutInMilliSeconds], ontimeout: [function]}
     * both attributes are optional.
     */

    /**
     * @function {virtual} o2.AjaxController.update
     *
     * <p>Implementation of the <code>Observer.update</code> interface
     * method.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var controller = new o2.AjaxController(xhr, params);
     *
     * ...
     *
     * // Timeout the AJAX request immediately.
     * controller.update({isTimedOut : true});
     * </pre>
     *
     * <p>{@link o2.JsonpController} overrides this implementation.</p>
     *
     * @param {Object} data - parameters passed from the <code>Observable</code>
     * to this <code>Observer</code>.
     */

    /**
     * @function {virtual} o2.AjaxController.unregister
     *
     * <p>Unregisters the object from the observer.</p>
     * <p>Call this when the <strong>AJAX</strong> request completes.</p>
     *
     * <p>{@link o2.JsonpController} overrides this implementation.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var controller = new o2.AjaxController(xhr, params);
     *
     * ...
     *
     * // The o2.AjaxState no longer listens to this Controller.
     * controller.unregister();
     * </pre>
     *
     */

        /**
         * @class {static} o2.AjaxState
         * @implements Observable
         *
         * <p>A <code>Model</code> for the available
         * <code>AjaxController</code> objects.</p>
         * <p>Implements the <code>Observable</code> interface.</p>
         *
         * <p>See
         * http://download.oracle.com/javase/1.4.2/docs/api/java/
         * util/Observable.html
         * </p>
         */

    /**
     * @function {protected static} o2.AjaxState.addObserver
     *
     * <p>An implementation of the <code>Observer.addObserver</code>
     * method.</p>
     * <p>Registers an <code>Observer</code>.</p>
     *
     * <p>This method is <strong>protected</strong>, in a sense that it's not
     * meant to be called directly. {@link o2.AjaxController} and
     * {@link o2.JsonpController} use it indirectly to register themselves.</p>
     *
     * @param {Object} observer - the <code>Observer</code> to register.
     */

    /**
     * @function {static} o2.AjaxState.countObservers
     *
     * <p>An implementation of the <code>Observer.countObservers</code>
     * method.</p>
     * <p>Gets the <code>Observer</code> count.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var count = o2.AjaxState.countObservers();
     * </pre>
     *
     * @return the number of registered <code>Observer</code>s.
     */

    /**
     * @function {protected static} o2.AjaxState.deleteObserver
     *
     * <p>An implementation of the <code>Observer.deleteObserver</code>
     * method.</p>
     * <p>Removes an <code>Observer</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <p>This method is <strong>protected</strong>, in a sense that it's not
     * meant to be called directly. {@link o2.AjaxController} and
     * {@link o2.JsonpController} use it indirectly to unregister
     * themselves.</p>
     *
     * @param {Object} observer - the <code>Observer</code> to remove.
     */

    /**
     * @function {static} o2.AjaxState.deleteObservers
     *
     * <p>An implementation of the <code>Observer.deleteObservers</code>
     * method.</p>
     * <p>Unregisters all of the registered <code>Observer</code>s.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.AjaxController.deleteObservers();
     * </pre>
     *
     */

    /**
     * @function {static} o2.AjaxState.init
     *
     * <p>Initializes the <strong>object</strong> and starts notifying
     * registered <strong>observer</strong>s.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.AjaxState.init();
     * </pre>
     *
     */

    /**
     * @function {protected static} o2.AjaxState.timeoutObservers
     *
     * <p>Sends a timeout request and unregisters the given
     * <code>Observer</code>s.</p>
     *
     * <p>This method is <strong>protected</strong>, in a sense that it's not
     * meant to be called directly. {@link o2.AjaxController} and
     * {@link o2.JsonpController} use it indirectly to timeout
     * themselves.</p>
     *
     * @param {Array} observers - A collection of {@link AjaxController}
     * objects.
     */

    /**
     * @function {static} o2.AjaxState.timeoutAllObservers
     *
     * <p>Sends a timeout request and unregisters all registered
     * <code>Observer</code>s.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.AjaxState.timeoutAllObservers();
     * </pre>
     *
     */

        /**
         * @struct {protected readonly} o2.AjaxState.protecteds.config
         *
         * <p>Module configuration.</p>
         */

        /**
         * @struct {protected readonly} o2.AjaxState.state
         *
         * <p>Internal state.</p>
         */

        /**
         * @property {protected readonly Array}
         * o2.AjaxState.observers
         *
         * <p>A collection of the registered <code>Observer</code>s.</p>
         */
/**
 * @module   collection.core
 *
 * <p>A utility <strong>class</strong> to modify collections.</p>
 */
    /**
     * @function {static} o2.Collection.clear
     *
     * <p>Removes all the elements of the <code>Object</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {a:'b'};
     * o2.Collection.clear(obj);
     * // obj is now {}
     * obj = [1,2,3];
     * o2.Collection.clear(obj);
     * // obj is now []
     * </pre>
     *
     * @param {Object} ar - the <code>Object</code> to clear.
     *
     * @return a <strong>reference</strong> to the object itself.
     */

    /**
     * @function {static} o2.Collection.copy
     *
     //TODO: shallow copy. add to docs.
     * <p>Creates a clone of the given <code>Object</code>, and returns it;
     * leaving the original intact.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj1 = {a:'b'};
     * var obj2 = o2.Collection.copy(obj1);
     * </pre>
     *
     * @param {Object} ar - the object to clone.
     *
     * @return the copied <code>Object</code>.
     */

    /**
     * @function {static} o2.Collection.clone
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.copy}.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * @see o2.Collection.copy
     */

    /**
     * @function {static} o2.Collection.compact
     *
     * <p>Remove <code>null</code>, and <code>undefined</code> members from
     * the <code>Object</code>.
     * This function alters the actual <code>Object</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [null, 1, 2, undefined, '', 3, 4];
     * o2.Collection.compact(ar);
     * // ar is now [1, 2, '', 3, 4]
     * </pre>
     *
     * @param {Object} ar - the <code>Object</code> to clean.
     *
     * @return a reference to the <code>Object</code> itself.
     */

    /**
     * @function {static} o2.Collection.indexOf
     *
     * <p>Gets the index of the element in the given <code>Array</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar [1, 2, 3, 4];
     * var id = o2.Collection.indexOf(ar, 3);
     * // id is 2
     * </pre>
     *
     * @param {Object} ar - the <code>Array</code> or <code>Object</code> to
     * search.
     * @param {Object} elm - the <code>Object</code> to match.
     *
     * @return the index of the element if found, <code>-1</code> otherwise.
     */

    /**
     * @function {static} o2.Collection.contains
     *
     * <p>An <strong>alias</strong> to <code>o2.Collection.indexOf(ar,
     * elm) &gt; -1</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 2, 3, 4];
     * var isInAr = o2.Collection.contains(ar, 3);
     * // isInAr is true
     * </pre>
     *
     * @param {Array} ar - the <code>Array</code> to search.
     * @param {Object} elm - the <code>Object</code> to match.
     *
     * @return <code>true</code> if the <code>Array</code> contains the item,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Collection.includes
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.contains}
     *
     * @see o2.Collection.contains
     */

    /**
     * @function {static} o2.Collection.inArray
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.contains}
     *
     * <p><strong>Usage example:</strong></p>
     *
     * @see o2.Collection.contains
     */

    /**
     * @function {static} o2.Collection.find
     *
     * <p>Gets the first <strong>collection</strong> item that validates
     * against the given <strong>delegator</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 2, 3, 4];
     *
     * var res = o2.Collection.find(ar, function(value){
     *      return value === 3;
     * });
     *
     * // res will be 3
     * </pre>
     *
     * @param {Object} obj - the <code>Array</code> or an iterable
     * <code>Object</code>.
     * @param delegate - Iterator <code>Function</code> in the form
     * <code>function(value, index, collection)</code>.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that acts as the <code>this</code>
     * reference in the <strong>iterator</strong>.
     *
     * @return the first "truthy" evaluated item; <code>null</code> if nothing
     * is found.
     */

    /**
     * @function {static} o2.Collection.detect
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.find}.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * @see o2.Collection.find
     */

    /**
     * @function {static} o2.Collection.forEach
     *
     * <p>Executes a delegate of the form
     * <code>fn(item, currentIndex, collection)</code> for each element
     * of the <strong>collection</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     *
     * o2.Collection.forEach(collection, function(item, index, collection) {
     *      log(item);
     * });
     * // will log:
     * 1
     * 2
     * 3
     * 4
     * </pre>
     *
     * @param {Object} obj - the <code>Array</code> or an iterable
     * <code>Object</code>.
     * @param {Function} delegate - the iterator in the form
     * <code>function(item, index, collection)</code>.
     */

    /**
     * @function {static} o2.Collection.each
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.forEach}.</p>
     *
     * @see o2.Collection.forEach
     */

    /**
     * @function {static} o2.Collection.diff
     *
     * <p>Takes the difference between the current collection and a number of
     * other collections. Only items that do not remain in the rest of the
     * collections will be returned.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar1 = [1, 2, 3, 4, 5];
     * var ar2 = [2, 3, 4, 5, 6];
     * var ar3 = o2.Collection.diff(ar1, ar2);
     * // ar3 is [1, 5. 6]
     * </pre>
     *
     * @param {Arguments} ... - variable number of input arguments; each
     * argument should either be an <code>Array</code> or an iterable
     * <code>Object</code>.
     *
     * @return an <code>Array</code> of non-matching items.
     *
     * @see o2.Collection.intersect
     * @see o2.Collection.union
     */

    /**
     * @function {static} o2.Collection.getDifference
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.diff}.</p>
     *
     * @see o2.Collection.diff
     */

    /**
     * @function {static} o2.Collection.every
     *
     * <p>Check whether every element of a collection passes a truth test.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     *
     * var isAllNumeric = o2.Collection.every(collection, function(item) {
     *      return !isNaN(item);
     * });
     * // isAllNumeric will be true
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable collection.
     * @param {Function} delegate - an iterator of the form
     * <code>function(item, index, obj)</code>; where <strong>item</strong> is
     * the current collection item, <strong>index</strong> is the current index
     * and <strong>obj</strong> is the collection itself.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return <code>true</code> if <strong>delegate</strong> returns
     * <code>true</code> for every element of the collection; <code>false</code>
     * otherwise.
     */

    /**
     * @function {static} o2.Collection.exclude
     *
     * <p>Excludes filtered out items from the collection. Returns a new
     * collection without altering the initial one.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     *
     * var rest = o2.Collection.exclude(collection, function(item) {
     *      return item % 2 === 0;
     * });
     *
     * // rest will be [1, 3, 5]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - the iterator in the form
     * <code>function(context, value, index, obj)</code> where
     * <strong>value</strong> is the current element of <strong>obj</strong>
     * being iterated over, and <strong>index</strong> is the index of that
     * element.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return a new filtered object.
     *
     * @see o2.Collection.grep
     */

    /**
     * @function {static} o2.Collection.reject
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.exclude}.</p>
     *
     * @see o2.Collection.reject
     */

    /**
     * @function {static} o2.Collection.extend
     *
     * <p>Merges two <code>Object</code>s or <code>Array</code>s.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var base = {lorem: 'ipsum'};
     * var child = {dolor: 'sit'};
     *
     * o2.Collection.extend(child, base);
     *
     * // child => {lorem : 'ipsum', dolor : 'sit'}
     * </pre>
     *
     * @param {Object} toObj - the <code>Object</code> to copy values to.
     * @param {Object} fromObj - the <code>Object</code> to copy values from.
     *
     * @return a <strong>reference</strong> to the modified <code>toObj</code>.
     */

    /**
     * @function {static} o2.Collection.merge
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.extend}.</p>
     *
     * @see o2.Collection.extend
     */

    /**
     * @function {static} o2.Collection.getFirst
     *
     * <p>Gets the first item in the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return the first item in the collection if exists; <code>null</code>
     * otherwise.
     */

    /**
     * @function {static} o2.Collection.getFirstN
     *
     * <p>Gets the first <strong>n</strong> elements of the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5, 6];
     * var firstFew = o2.Collection.getFirstN(collection, 3);
     * // firstFew will be [1, 2, 3]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Integer} n - the number of items to retrieve.
     *
     * @return the first <strong>n</strong> elements of the collection if
     * the collection has more than <strong>n</strong> items; all of the items
     * in the collection otherwise.
     */

    /**
     * @function {static} o2.Collection.getFunctions
     *
     * <p>Gets all the <strong>static</strong> methods of the object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {fn1 : function(){}, fn2 : function() {}, lorem : 1};
     * var methods = o2.Collection.getFunctions(obj);
     * // methods now is [fn1, fn2]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return gets all the member <code>Function</code>s in the current
     * object.
     */

    /**
     * @function {static} o2.Collection.getMethods
     *
     * <p>An <strong>alias</strong> to
     * {@link o2.Collection.getFunctions}.</p>
     *
     * @see o2.Collection.getFunctions
     */

    /**
     * @function {static} o2.Collection.getKeys
     *
     * <p>Gets all the keys of the object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : 'ipsum', dolor : 'sit'};
     * var keys = o2.Collection.getKeys(obj);
     * // keys will be ['lorem', 'dolor']
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return an <code>Array</code> of the object's keys.
     */

    /**
     * @function {static} o2.Collection.getLast
     *
     * <p>Gets the last item in the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var last = o2.Collection.getLast(collection);
     * // last will be 5
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return the last item in the collection if any; <code>null</code>
     * otherwise.
     */

    /**
     * @function {static} o2.Collection.getLastN
     *
     * <p>Gets the last <strong>n</strong> items in the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var lastFew = o2.Collection.getLastN(collection, 3);
     * // lastFew will be [3, 4, 5]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Integer} n - the number of items to retrieve.
     *
     * @return the last <strong>n</strong> items if the collection has at least
     * <strong>n</strong> items; all the items of the collection otherwise.
     */

    /**
     * @function {static} o2.Collection.isEmpty
     *
     * <p>Check whether the collection contains any members.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * // This will return true:
     * o2.Collection.isEmpty([]);
     *
     * // This will also return true:
     * o2.Collection.isEmpty({});
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return <code>true</code> if the collection is empty; <code>false</code>
     * otherwise.
     */

    /**
     * @function {static} o2.Collection.getMax
     *
     * <p>Gets the maximum value of the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 3, 11, 42, 4, 5, 6];
     * var meaningOfLife = o2.Collection.getMax(collection);
     * // meaningOfLife will be 42
     *
     * var meaningOfUniverse = o2.Collection.getMax(collection, function(item) {
     *      return item !== 42 ? Math.PI : 42;
     * });
     * // meaningOfUniverse will also be 42
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - (optional, defaults to
     * <code>undefined</code>) the evaluator <code>Function</code> in the
     * form <code>function(item, index, obj)</code> where <strong>item</strong>
     * is the current collection item; <strong>index</strong> is the index
     * of that item.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return the maximum value in the collection.
     */

    /**
     * @function {static} o2.Collection.getMin
     *
     * <p>Gets the maximum value of the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [111, 311, 1211, 42, 114, 235, 126];
     * var meaningOfLife = o2.Collection.getMin(collection);
     * // meaningOfLife will be 42
     *
     * var meaningOfUniverse = o2.Collection.getMin(collection, function(item) {
     *      return item !== 42 ? 42 * Math.PI : 42;
     * });
     * // meaningOfUniverse will also be 42
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - (optional, defaults to
     * <code>undefined</code>) the evaluator <code>Function</code> in the
     * form <code>function(item, index, obj)</code> where <strong>item</strong>
     * is the current collection item; <strong>index</strong> is the index
     * of that item.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return the minimum value in the collection.
     */

    /**
     * @function {static} o2.Collection.getRest
     *
     * <p>Gets the elements of the collection after index n.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     *
     * var rest = o2.Collection.getRest(collection);
     * // rest will be [2, 3, 4, 5]
     *
     * rest = o2.Collection.getRest(collection, 2);
     * // rest will be [3, 4, 5];
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Integer} n - (optional; defaults to <code>1</code>) the
     * zero-based index to cut at.
     *
     * @return the items after the index <strong>n</strong> (n<sup>th</sup>
     * item included)
     */

    /**
     * @function {static} o2.Collection.getSize
     *
     * <p>Gets the number of items in the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var size = o2.Collection.getSize(collection);
     * // size will be 5
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return the number of items in the collection.
     */

    /**
     * @function {static} o2.Collection.getCount
     *
     * <p>An <strong>alias</strong> to {o2.Collection.getSize}</p>
     *
     * @see o2.Collection.getSize
     */

    /**
     * @function {static} o2.Collection.getLength
     *
     * <p>An <strong>alias</strong> to {o2.Collection.getSize}</p>
     *
     * @see o2.Collection.getSize
     */

    /**
     * @function {static} o2.Collection.getSortedIndex
     *
     * <p>Gets an index to insert the item at a sorted <code>Array</code>,
     * so that is not needed to be resorted.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 2, 24, 30, 44, 66, 100];
     * var idx = o2.Collection.getSortedIndex(42);
     * // idx will be 4
     * </pre>
     *
     * @param {Array} array - an <code>Array</code> to work on.
     * @param {Object} item - the item to insert.
     * @param {Function} delegate - (optional, defaults to identity function),
     * a <code>Function</code> that takes the current item as a parameter and
     * returns an <code>Integer</code> value.
     *
     * @return <code>-1</code> if the collection is not an <code>Array</code>;
     * the computed sorted index otherwise.
     */

    /**
     * @function {static} o2.Collection.getValues
     *
     * <p>Gets the value of an <code>Object</code> that has
     * <code>{key1 : value1, key2 : value2 ... }</code> kind of layout.</p>
     *
     * <p>If an <code>Array</code> is passed, it makes a shallow copy of that
     * array and returns it.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = {lorem : 1, ipsum : 2, dolor : 3};
     * var values = o2.Collection.getValues(collection);
     * // values will be ['lorem', 'ipsum', 'dolor']
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return the values in the collection.
     */

    /**
     * @function {static} o2.Collection.grep
     *
     * <p>Filters the items of a collections using an evaluator delegate
     * and returns the filtered result set.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5, 6];
     * var evens = o2.Collection.grep(collection, function(item) {
     *      return item % 2 === 0;
     * });
     * // evens will be [2, 4, 6]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - the filter <code>Function</code> in the form
     * <code>[Boolean] function(item)</code>.
     *
     * @return the filtered collection.
     */

    /**
     * @function {static} o2.Collection.select
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.grep}.</p>
     *
     * @see o2.Collection.grep
     */

    /**
     * @function {static} o2.Collection.filter
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.grep}.</p>
     *
     * @see o2.Collection.grep
     */

    /**
     * @function {static} o2.Collection.group
     *
     * <p>Groups the items in the collection by a key or an evaluator
     * <code>Function</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [
     *      {lorem : 1},
     *      {lorem : 2},
     *      {lorem : 3},
     *      {ipsum : 1},
     *      {ipsum : 2}
     * ];
     *
     * var lorems = o2.Collection.group(collection, 'lorem')
     * //lorems will be {lorem : [1, 2, 3]}
     *
     * var grouped = o2.Collection.group(collection, function(item) {
     *      for(key in item) {
     *          if (item.hasOwnProperty(key)) {
     *              return key;
     *          }
     *      }
     * });
     * // grouped will be {lorem : [1, 2, 3], ipsum : [1, 2]}
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - A <code>String</code> key that the items
     * in the collection share, or a <code>Function</code> in the form
     * <code>[key] function(item, index)</code> where <strong>item</strong>
     * is the current collection item, <strong>index</strong> if that item's
     * index; and the return value is a key to group.
     *
     * @return an <code>Array</code> of grouped items.
     *
     * @see o2.Collection.pluck
     */

    /**
     * @function {static} o2.Collection.toArray
     *
     * <p>Safely converts the <code>Object</code> in question into an
     * array.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : 1, ipsum : 2};
     * var ar = o2.Collection.toArray(obj);
     * // ar will be [1, 2]
     * </pre>
     *
     * @param {Object} obj - Any <code>Object</code> to convert to an
     * <code>Array</code>. If <strong>obj</strong> is, in deed, an
     * <code>Array</code>, then a shallow copy of it is returned without
     * altering the original <code>Object</code>.
     *
     * @return the generated <code>Array</code>.
     *
     * @see o2.Object.toArray
     */

    /**
     * @function {static} o2.Collection.map
     *
     * <p>Calls a <code>Function</code> for each member of the collection,
     * passing the current item as a parameter. Returns an <code>Array</code>
     * containing the results of each call.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var squared = o2.Collection.map(collection, function(item) {
     *      return item*item;
     * });
     * // squared will be [1, 4, 9, 25]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - A mapper in the form
     * <code>function(item, index, collection)</code> where
     * <strong>item</strong> is the current collection element,
     * <strong>index</strong> is its index, and <strong>collection</strong> is
     * the current object <strong>obj</strong>.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return a mapped <code>Array</code>.
     *
     * @see o2.Collection.invoke
     */

    /**
     * @function {static} o2.Collection.union
     *
     * <p>Merges several collections into a single <code>Array</code></p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var union = o2.Collection.union([1, 2], [2, 3], [3, 4], [5]);
     * // union will be [1, 2, 3, 4, 5]
     * </pre>
     *
     * @param {...} varargin - the collections to merge as input parameters.
     *
     * @return the merged <code>Array</code>.
     *
     * @see o2.Collection.diff
     * @see o2.Collection.intersect
     */

    /**
     * @function {static} o2.Collection.zip
     *
     * <p>Takes a set of <code>Array</code>s as parameters and brings together
     * the elements that have the same index.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar1 = [1,2,3];
     * var ar2 = ['a', 'b', 'c', 'd'];
     * var ar3 = [true, false];
     *
     * // returns:
     * // [
     * //       [1, 'a', true],
     * //       [2. 'b', false],
     * //       [3, 'c'],
     * //       ['d']
     * // ]
     * zip(ar1, ar2, ar3);
     * </pre>
     *
     * @param {...} varargin - the <code>Array</code>s to zip as a variable
     * number of input arguments.
     *
     * @return a zipped <code>Array</code>.
     */

    /**
     * @function {static} o2.Collection.flatten
     *
     * <p>Shallow flattens an <code>Array</code>.</p>
     * <p>Does not alter the original object, returns a new flattened object
     * instead.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [[1, 2], [3, 4], 5]
     * var flattened = o2.Object.flatten(ar);
     * // flattened is [1, 2, 3, 4, 5]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return the flattened collection.
     */

    /**
     * @function {static} o2.Collection.any
     *
     * <p>An <strong>alias</strong> to {@link o2.Collection.some}.</p>
     *
     * @see o2.Collection.some
     */

    /**
     * @function {static} o2.Collection.some
     *
     * <p>Checks whether at least one element of the given
     * <strong>collection</strong> satisfies a condition given with
     * the <strong>delegate</strong>.</p>
     * <p>The <strong>delegate</strong> is in the form
     * <code>function(context, value, index, collection)</code>, iterates
     * through the items of the <strong>collection</strong> and returns
     * a <strong>boolean</strong> value. When this <strong>delegate</strong>
     * returns <code>true</code> in any iteration, <strong>some(...)</strong>
     * also returns true; it returns <code>false</code> otherwise.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var isSome = o2.Collection.some(collection, function(item) {
     *      return item > 4;
     * });
     * // isSome will be true
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param delegate - Iterator <code>Function</code> in the form
     * <code>function(value, index, collection)</code>.
     * @param {Object} context - The context to regard as <code>this</code>
     * reference.
     *
     * @return <code>true</code> if the <strong>iterator</strong> returns
     * <code>true</code> for at least one element; returns <code>false</code>
     * otherwise.
     */

    /**
     * @function {static} o2.Collection.sort
     *
     * <p>Sorts the collection.</p>
     *
     * <p>Contrary to <code>Array.prototype.sort</code>, this function does not
     * sort the collection in place, and therefore it  does not alter the
     * initial object's contents.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 5, 4, 7];
     * var sorted = o2.Collection.sort(collection, function(item) {
     *      return item;
     * });
     * // sorted will be [1, 2, 4, 5, 7]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - (Optional, defaults to an identity function
     * that returns the original item) the sorter in the form
     * <code>function(value, index, collection)</code> where
     * <strong>value</strong> is the current item, <strong>index</strong> is
     * that item's index; and <strong>collection</strong> is
     * <strong>obj</strong>; this delegate should return an <code>Integer</code>
     * value.
     * <code>function(item, index, collection)</code>.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return a sorted copy of the initial collection.
     */

    /**
     * @function {static} o2.Collection.shuffle
     *
     * <p>Randomizes the collection. Does not alter the original collection,
     * just returns a randomized copy.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 2, 3, 4, 5];
     * var shuffled = o2.Collection.shuffle(ar);
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     *
     * @return an <code>Array</code> that's a shuffled copy of the initial
     * collection.
     */

    /**
     * @function {static} o2.Collection.removeElementByValue
     *
     * <p>Removes and element from the collection if it has a property named
     * <strong>name</strong> with a value <strong>value</strong>.</p>
     *
     * <p>This method works by reference, and alters the given collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = { lorem : 1, ipsum : 2, sit : 3}
     * o2.Collection.removeElementByValue(collection, 'sit', 3);
     * // collection will be {lorem : 1, ipsum : 2}
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {String} name - the name of the property.
     * @param {Object} value - the value to compare.
     *
     * @return a reference to <strong>obj</strong> itself.
     */

    /**
     * @function {static} o2.Collection.removeElement
     *
     * <p>Removes all occurrences of the element from the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5]
     * var result = o2.Collection.removeElement(collection, 3);
     * // result will be [1, 2, 4, 5]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Object} elm - the element to remove.
     */

    /**
     * @function {static} o2.Collection.foldR
     *
     * <p>An <strong>alias</strong> to
     * {@link o2.Collection.reduceRight}.</p>
     *
     * @see o2.Collection.reduceRight
     */

    /**
     * @function {static} o2.Collection.reduceRight
     *
     * <p>Works similar to {@link o2.Collection.fold}, but goes from
     * the end of the collection to the beginning of the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var reduced = o2.Collection.reduceRight(collection, function(
     *              store, value) {
     *      return store + value;
     * }, 0);
     * // reduced will be 15
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Functon} delegate - the reducer <code>Function</code>.
     * @param {Object} store - the initial seed.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return a single reduced value.
     *
     * @see o2.Collection.reduce
     */

    /**
     * @function {static} o2.Collection.fold
     *
     * <p>An <strong>alias</strong> to {o2.Collection.reduce}.</p>
     *
     * @see o2.Collection.reduce
     */

    /**
     * @function {static} o2.Collection.reduce
     *
     * <p>Works similar to the <strong>reduce</strong> part of the
     * <a href="http://www.mongodb.org/display/DOCS/MapReduce">Map Reduce</a>
     * algorithm.</p>
     * <p>Reduces a <strong>collection</strong> into a single value by
     * applying a <strong>delegate</strong> of the form
     * <code>function(cache, value, index, collection)</code> where
     * <strong>cache</strong> is the accumulator, <strong>value</strong>
     * is the iterated item, <strong>index</strong> is the item's index,
     * and <strong>collection</strong> is the collection we are working on.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * var reduced = o2.Collection.reduce(collection, function(store, value) {
     *      return store + value;
     * }, 0);
     * // reduced will be 15
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Functon} delegate - the reducer <code>Function</code>.
     * @param {Object} store - the initial seed.
     * @param {Object} context - (optional, defaults to <code>undefined</code>)
     * the context that the <strong>delegate</strong>
     * uses as the <code>this</code> reference.
     *
     * @return a single reduced value.
     */

    /**
     * @function {static} o2.Collection.pluck
     *
     * <p>Hard to explain in words. Let us demonstrate by an example:</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [
     *      {key1 : {lorem1 : 'ipsum1'}, key2 : {dolor1 : 'amet1'}},
     *      {key1 : {lorem2 : 'ipsum2'}, key2 : {dolor2 : 'amet2'}},
     *      {key1 : {lorem3 : 'ipsum3'}, key2 : {dolor3 : 'amet3'}}
     * ];
     *
     * // Will return:
     * // [
     * //    {dolor1 : 'amet1'},
     * //    {dolor2 : 'amet2'},
     * //    {dolor3 : 'amet3'}
     * // ]
     * o2.Collection.pluck(collection, 'key2');
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Object} key - the key to pluck.
     *
     * @return a plucked subset.
     *
     * @see o2.Collection.group
     */

    /**
     * @function {static} o2.Collection.lastIndexOf
     *
     * <p>Returns the last index of the given item.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 4, 2, 42, 2, 4, 42, 21, 12, 1];
     * var idx = o2.Collection.lastIndexOf(collection, 42);
     * // idx will be 7
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Object} item - the item to check the index of.
     *
     * @return the last index of the item if exists, <code>-1</code> otherwise.
     */

    /*
     * @param {varargin} -
     */

    /**
     * @function {static} o2.Collection.invoke
     *
     * <p>Calls the delegate <code>Function</code> with an optional set
     * of parameters for each item in the collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var collection = [1, 2, 3, 4, 5];
     * function log(item) { console.log(item); }
     * o2.Collection.invoke(collection, log);
     * // will log:
     * // 1
     * // 2
     * // 3
     * // 4
     * // 5
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Object} delegate - the delegate to invoke in the form
     * delegate(item, ...varargin). If it's a <code>String</code> then
     * <code>item[delegate]</code> will be used instead.
     * @param {varargin} ... - A set of parameters to pass after the delegate.
     *
     * @see o2.Collection.map
     */

    /**
     * @function {static} o2.Collection.intersect
     *
     * <p>Returns an <code>Array</code> of items that are common in all of
     * the collections passed in as parameters.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar1 = [1, 2, 3, 4, 5];
     * var ar2 = [2, 3, 4, 5, 6];
     * var ar3 = o2.Collection.intersect(ar1, ar2);
     * // ar3 is [2, 3, 4, 5]
     * </pre>
     *
     * @param {...} varargin - the objects to intersect as input arguments.
     *
     * @return an <code>Array</code> containing only the values that are common
     * in all of the collections given.
     *
     * @see o2.Collection.diff
     * @see o2.Collection.union
     */

    /**
     * @function {static} o2.Collection.unique
     *
     * <p>Removes duplicate entries from the collection. Returns a new
     * <code>Array</code>; does not alter the original collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 2, 3, 2, 4, 2, 42];
     * var uniq = o2.Collection.unique(ar);
     * // uniq will be [1, 2, 3, 4, 42]
     * </pre>
     *
     * @param {Object} obj - an <code>Array</code> or an iterable
     * <code>Object</code> to work on.
     * @param {Function} delegate - (optional,
     * defaults to <code>undefined</code>) a mapper in the form
     * <code>function(item, index, collection)</code> where
     * <strong>item</strong> is the current collection element,
     * <strong>index</strong> is its index, and <strong>collection</strong> is
     * the current object <strong>obj</strong>.
     *
     * @return a copy of the collection containing unique items.
     */

/**
 * @module cookie.core
 *
 * <p>A <strong>Cookie</strong> helper.</p>
 */

    /**
     * @function {static} o2.Cookie.read
     *
     * <p>Reads the value of the <strong>cookie</strong> with the given
     * name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var value = o2.Cookie.read('cookieName');
     * </pre>
     *
     * @param {String} name - the name of the <strong>cookie</strong> to
     * read.
     *
     * @return the value of the <strong>cookie</strong>; or <code>null</code>
     * if the <strong>cookie</strong> is not found.
     */

    /**
     * @function {static} o2.Cookie.save
     *
     * <p>Saves a <strong>cookie</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Cookie.save('testCookie', 'testValue', 10);
     * </pre>
     *
     * @param {String} name - the name of the <strong>cookie</strong>.
     * @param {String} value - the value of the <strong>cookie</strong>.
     * @param {Integer} days - (optional) how many days should the
     * <strong>cookie</strong> persist.
     * @param {String} path - (optional) the path of the cookie.
     * @param {String} domain - (optional) the domain of the cookie.
     * @param {Boolean} isSecure - (optional) will the cookie be used for a
     * secure connection.
     */

    /**
     * @function {static} o2.Cookie.remove
     *
     * <p>Removes a <strong>cookie</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Cookie.remove('testCookie');
     * </pre>
     *
     * @param {String} name - the name of the <strong>cookie</strong> to
     * remove.
     * @param {String} path - (optional) the path of the cookie.
     * @param {String} domain - (optional) the domain of the cookie.
     * @param {Boolean} isSecure - (optional) will the cookie be used for a
     * secure connection.
     */

// TODO: add these banners with Grunt!
/**
 *  <b>o2.js</b>
 *
 *  <p style="border:1px solid;background:#ccc;padding:10px;margin:10px">
 *  This program is distributed under the terms of the "MIT License".<br />
 *  Please see the <strong><a
 *  href="https://github.com/v0lkan/o2.js/blob/master/LICENSE"
 *  >LICENSE</a></strong> file for details.<br /><br />
 *  <p>
 *
 * @project     o2.js
 * @version     0.25.a.0001369602378
 * @author      Volkan Özçelik and Community
 * @description o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 */

/**
 * @module   core
 *
 * @requires core.meta
 *
 * <p>The core module.</p>
 */

    /**
     * @function {static} o2.nill
     *
     * <p>An empty function.</p>
     */

    /**
     * @property {readonly String} o2.name
     *
     * <p>Short name of the framework, to be used in
     * prefixes, class names etc.</p>
     */

    /**
     * @property {readonly String} o2.url
     *
     * <p>URL of the project.</p>
     */

    /**
     * @property {readonly String} o2.longName
     *
     * <p>Full name of the project.</p>
     */

    /**
     * @property {readonly String} o2.appVersion
     *
     * <p>Project version.</p>
     */

    /**
     * @property {readonly String} o2.build
     *
     * <p>Project build number.</p>
     */

    /**
     * @function {static} o2.$
     *
     * <p>An alias for <code>document.getElementById</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var domRef = o2.$('elementId');
     * </pre>
     *
     * @param {Object} obj - the id to check.
     *
     * @return document.getElementById(obj) if obj is a <code>String</code>;
     * obj itself otherwise.
     *
     * @throws Exception - if obj is <code>undefined</code>.
     */

    /**
     * @function {static} o2.ready
     *
     * <p>An alias for <code>Dom.ready</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.ready(function() {
     *      initializeWidget();
     * });
     * </pre>
     *
     * @param {Function} callback - The callback to execute when DOM is
     * ready.
     */

    /**
     * @function {static} o2.load
     *
     * <p>An alias for <code>Event.addEventListener(window, 'load',
     * callback)</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.load(function() {
     *      initializeWidget();
     * });
     * </pre>
     *
     * @param {Function} callback - The callback to execute when window is
     * loaded.
     */

    /**
     * @function {static} o2.now
     *
     * <p>Returns the Unix time (i.e. the number of milliseconds since
     * midnight of January 1, 1970)</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var unixTimestamp = o2.now();
     * </pre>
     *
     * @return the current Unix time.
     */

    /**
     * @function {static} o2.n
     *
     * <p>A <code>getElementsByName</code> wrapper.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var allTags = o2.n('username', 'testForm');
     * </pre>
     *
     * @param {String} tagName - the name of the form item to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return a collection of matching elements.
     */

    /**
     * @function {static} o2.nn
     *
     * <p>Acts similar to {link o2.n} -- with one exception: The method
     * returns the first matched node, instead of returning a node
     * collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var firstDiv = o2.nn('userprefs', 'testForm');
     * </pre>
     *
     * @param {String} name - the name of the element to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return the first matched element if found; <code>null</code>
     * otherwise.
     */

    /**
     * @function {static} o2.t
     *
     * <p>A <code>getElementsByTagName</code> wrapper.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var allNodes = o2.t('*')
     * </pre>
     *
     * @param {String} tagName - the name of the tag to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return a collection of matching elements.
     */

    /**
     * @function {static} o2.tt
     *
     * <p>Acts similar to {link o2.t} -- with one exception: The method
     * returns the first matched node, instead of returning a node
     * collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var firstDiv = o2.tt('div', 'MasterContainer');
     * </pre>
     *
     * @param {String} tagName - the name of the tag to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return the first matched element if found; <code>null</code>
     * otherwise.
     */

    /**
     * @module   date.core
     *
     * @requires core
     *
     * <p>A <code>Date</code> helper module.</p>
     */

    /**
     * @function {static} o2.Date.getPrettyDate
     *
     * <p>Prints a human-readable time string, by looking at the difference
     * between two timestamps.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var timeString = o2.Date.getPrettyDate((new Date()).getTime());
     * // timeString is 'just now'
     * </pre>
     *
     * @param {Integer} time - the offset time in milliseconds.
     * @param {Integer} currTime - (Optional, default to NOW) the base time
     * in milliseconds.
     */

    /**
     * @function {static} o2.Date.getTime
     *
     * <p>An alias to {@link o2.now}.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var linuxTime = o2.Date.getTime();
     * </pre>
     *
     * @see o2.now
     */

    /**
     * @function {static} o2.Date.now
     *
     * <p>An alias to {@link o2.Date.getTime}.</p>
     *
     * @see o2.Date.getTime
     */

    /**
     * @class o2.JsonpController
     * @extends o2.AjaxController
     *
     * <p>A JSONP <code>Controller</code>. Registers itself to {@link
     * JsonpState} <code>Observable</code> upon construction.</p>
     *
     * <p>Implements the <code>Observer</code> interface.</p>
     */

    /**
     * @constructor o2.JsonpController.JsonpController
     *
     * See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observer.html
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var jsonp = o2.Jsonp.get('http://example.com/api.php', handleResponse);
     * var controller = new o2.JsonpController(jsonp, {timeout: 5000});
     * </pre>
     *
     * @param {String} jsonp - the current jsonp unique identifier.
     * @param {Object} args - an associative array in the form
     * {timeout:[timeoutInMilliSeconds], ontimeout: [function]}
     * both attributes are optional.
     */

    /**
     * @function {override} o2.JsonpController.update
     *
     * <p>Overrides {@link o2.AjaxController.update}.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * controller.update({isTimedOut : true});
     * </pre>
     *
     * @param {JsonpState} observable - the <code>Observable</code> state
     * object.
     * @param {Object} data - parameters passed from the
     * <code>Observable</code> to this <code>Observer</code>.
     *
     * @see o2.AjaxController.update
     */

    /**
     * @function {override} o2.JsonpController.unregister
     *
     * <p>Overrides {@link o2.AjaxController.unregister}.</p>
     *
     * <p>Unregisters this object from its associated observable.
     * (<em>i.e. <strong>JsonpState</strong></em>)</p>
     *
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * controller.unregister();
     * </pre>
     *
     */

/**
 * @module ajaxstate.core
 *
 * <p>a model for controlling ajax timeouts etc.</p>
 * <p>an {@link o2.AjaxController} should be registered to this model.</p>
 */

    /**
     * @module   jsonp.core
     *
     * @requires core
     * @requires string.core
     *
     * <p>An object to make <strong>JSONP</strong> calls.</p>
     */

        /**
         * @class {static} o2.Jsonp
         *
         * <p>An object to make <strong>JSONP</strong> calls.</p>
         */

     /**
     * @module   jsonpstate.core
     *
     * @requires core
     * @requires ajaxstate.core
     * @requires object.core
     *
     * <p>A <strong>Model</strong> for controlling <strong>JSONP</strong>
     * timeouts etc. A {@link JsonpController} should be registered to this
     * <strong>model</strong>.
     */

        /**
         * @class {static} o2.JsonpState
         * @extends o2.AjaxState
         *
         * <p>Implements all public methods of {@link AjaxState} for
         * <strong>JSONP</strong> requests.</p>
         */


    /**
     * @module   sortdelegate.core
     *
     * @requires core
     *
     * <p>Custom delegates for <code>Array.sort</code> method.</p>
     */

        /**
         * @class {static} o2.SortDelegate
         *
         * <p>Custom delegates for <code>Array.sort</code> method.</p>
         */

    /**
     * @function {static} o2.SortDelegate.sort
     *
     * <p>A generic sort function.</p>
     * <p>If the collecion consists of <code>String</code>s and
     * <code>Number</code>s, <code>String</code>s will be stored
     * alphabeticaly at the bottom, and
     * <code>Number</code>s will be sorted numerically before them.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 7, '12', 8, 'lorem', 'c', 42, 7];
     * a.sort(o2.SortDelegatae.sort);
     * </pre>
     */

    /**
     * @function {static} o2.SortDelegate.sortAsc
     *
     * <p>An <strong>alias</strong> to {@link o2.SortDelegate.sort}.</p>
     *
     * @see o2.SortDelegate.sort
     */

    /**
     * @function {static} o2.SortDelegate.sortDesc
     *
     * <p>Works similar to {link o2.SortDelegate.sort}. The only difference
     * is that the items are sorted in a <strong>descending</strong>
     * order.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ar = [1, 7, '12', 8, 'lorem', 'c', 42, 7];
     * a.sort(o2.SortDelegatae.sortDesc);
     * </pre>
     *
     */

    /**
     * @module   debugger.core
     *
     * @requires core
     *
     * <p>A debugging helper.</p>
     */

        /**
         * @class {static} o2.Debugger
         *
         * <p>A static object for debugging purposes.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * // note: initialize Debugger only once,
         * // possibly on window.load or DOM content ready
         * o2.Debugger.init(someDomNode, true);
         *
         * //then inside your code use this syntax.
         * o2.Debugger.println('stuff to debug');
         * </pre>
         *
         * @see o2.Unit
         */

    /**
     * @function {static} o2.Debugger.assert
     *
     * <p>Checks the value of pass, and displays the message with a proper
     * className.</p>
     * <p>The class name can be one of the {@link
     * Debugger.config.constants.className} members.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.assert((1==true), '1 == true');
     * </pre>
     *
     * @param {Expression} pass - the expression to evaluate.
     * @param {String} message - the message to display.
     *
     * @see o2.Unit.assert
     */

    /**
     * @function {static} o2.Debugger.error
     *
     * <p>Prints an error message to the output.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.error('A serious error occurred');
     * </pre>
     *
     * @param {String} message - the error message to display.
     */

    /**
     * @function {static} o2.Debugger.info
     *
     * <p>Prints an info message to the output.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.info('An info.');
     * </pre>
     *
     * @param {String} message - the info message to display.
     */

    /**
     * @function {static} o2.Debugger.init
     *
     * <p>Initializes the {@link Debugger} <code>static</code> class.</p>
     * <p>Either <strong>outputElement</strong>, or
     * <strong>shouldUseConsole</strong>, or both should be provided.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.init('divConsole', true);
     * </pre>
     *
     * @param {Object} outputElm - Either the <strong>id</strong> of the
     * element, or the element itself to append debug messages.
     * @param {Boolean} shouldUseConsole - should browser's built-in console
     * be used, if available.
     */

    /**
     * @function {static} o2.Debugger.log
     *
     * <p>This is an <strong>alias</strong> to {@link Debugger.println}.</p>
     * <p>Simply logs a message.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.log('Hello world');
     * </pre>
     *
     * @param {String} message - the message to log.
     *
     * @see o2.Unit.log
     */

    /**
     * @function {static} o2.Debugger.println
     *
     * <p>Prints the string representation of value to the next line.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.println('Hello world.');
     * </pre>
     *
     * @param {String} value - the value to print.
     * @param {String} className - the CSS class name that is associated with
     * the line.
     */

    /**
     * @function {static} o2.Debugger.warn
     *
     * <p>Prints an warning message to the output.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Debugger.warn('caution!');
     * </pre>
     *
     * @param {String} message - the warning message to display.
     */

    /**
     * @module   dom.class
     *
     * @requires core
     * @requires string.core
     *
     * <p>A utility package to add/remove/modify <code>class</code>es.</p>
     */

    /**
     * @function {static} o2.Dom.createClassNameRegExp
     *
     * <p>Creates a regular expression that will match a given
     * <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var reg = o2.Dom.createClassNameRegExp('testClass');
     * </pre>
     *
     * @param {String} c - The name of the class.
     *
     * @returns a <code>RegExp</code> that matches the given class name.
     */

    /**
     * @function {static} o2.Dom.hasClass
     *
     * <p>Checks whether an <strong>element</strong> has the given
     * <strong>className</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * if (o2.Dom.hasClass('container', 'active')) {
     *      doStuff();
     * }
     * </pre>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the <strong>className</strong> to test.
     *
     * @return <code>true</code> if <strong>el</strong> has the
     * <code>className</code> <strong>c</strong>, <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Dom.addClass
     *
     * <p>Add a class to the given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.addClass('container', 'active');
     * </pre>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the <strong>className</strong> to add.
     */

    /**
     * @function {static} o2.Dom.removeClass
     *
     * <p>Removes a <strong>class</strong> name from the given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.removeClass('container', 'active');
     * </pre>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the className to remove.
     */

    /**
     * @function {static} o2.Dom.toggleClass
     *
     * <p>Toggles the <strong>CSS</strong> <code>className</code> of a given
     * element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.toggleClass('container', 'active');
     * </pre>
     *
     * @param {Object} el - the <strong>DOM</strong> element to toggle or its
     * <code>String</code> id.
     * @param {String} c - the class name to toggle.
     * @param {Boolean} state - (Optional, defaults to <code>undefined</code>),
     * if <code>true</code> add class <strong>c</strong> to
     * <strong>el</strong>, if <code>true</code> removes class
     * <strong>c</strong> from <strong>el</strong>. If the parameter is not
     * given, the class is toggled (i.e. added if the class does not exist,
     * and removed if the class exists).
     */

    /**
     * @struct {static} o2.Dom.nodeType
     *
     * <code>DOM</code> node types.
     */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.ELEMENT - element node.
         */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.ATTRIBUTE - atribute node.
         */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.TEXT - text node.
         */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.CDATA - CDATA section.
         */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.ENTITY_REFERENCE - entity reference.
         */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.ENTITY - entity.
         */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.PROCESSING_INSTRUCTION - processing
         * instruction.
         */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.COMMENT - comment node.
         */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.DOCUMENT - document (root) node.
         */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.DOCUMENT_TYPE - DTD node.
         */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.DOCUMENT_FRAGMENT - document fragment.
         */

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.NOTATION - notation.
         */

        /**
         * @class {static} o2.Dom
         *
         * A cross-browser <strong>DOM</strong> manipulation helper.
         */

    /**
     * @module   dom.constants
     *
     * @requires core
     *
     * <p>Constant definitions for {@link o2.Dom}.</p>
     */

    /**
     * @module   dom.dimension
     *
     * @requires core
     * @requires dom.style
     * @requires string.core
     *
     * <p>Includes dimension (<strong>i.e. width-height related</strong>)
     * helper methods.</p>
     */

    /**
     * @function {static} o2.Dom.getDocumentDimension
     *
     * <p>Gets the dimension of the document in the form <code>{width: w,
     * height: h}</code>. If the visible (i.e. <code>clientHeight</code>) is
     * greater than the document's height returns the height of the visible
     * area as the height portion.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var viewportInfo = o2.Dom.getDocumentDimension();
     * </pre>
     *
     * @return the dimension of the document in the form <code>{width: w,
     * height: h}</code>.
     */

    /**
     * @function {static} o2.Dom.getDocumentHeight
     *
     * <p>Gets the total height of the document in pixels.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var viewportHeight = o2.Dom.getDocumentHeight();
     * </pre>
     *
     * @return the document's height.
     */

    /**
     * @function {static} o2.Dom.getDocumentWidth
     *
     * <p>Gets the total width of the document in pixels.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var viewportWidth = o2.Dom.getDocumentWidth();
     * </pre>
     *
     * @return the document's width.
     */
    /**
     * @function {static} o2.Dom.getHeight
     *
     * <p>Gets the <strong>height</strong> of the given element, in pixels.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var containerHeight = o2.Dom.getHeight('container');
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * @return the height of the element, in pixels.
     */

    /**
     * @function {static} o2.Dom.getViewportInfo
     *
     * <p>Gets the viewport information in the form
     * <code>{scrollTop : #, scrollLeft: #, width: #, height: #}</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var details = o2.Dom.getViewportInfo();
     * </pre>
     *
     * @return the viewport information.
     */

    /**
     * @function {static} o2.Dom.getWidth
     *
     * <p>Gets the <strong>width</strong> of the given element, in pixels.</p>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var elementWidth = o2.Dom.getWidth('container');
     * </pre>
     *
     * @return the width of the element, in pixels.
     */

        /**
         * @function {static} o2.Dom.getWindowInnerDimension
         *
         * <p>Gets the dimension of the visible area of the browser in the form
         * <code>{width: w, height: h}</code>.
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var windowDimensions = o2.Dom.getWindowInnerDimension();
         * </pre>
         *
         * @return the dimension of the visible area of the browser in the form
         * <code>{width: w, height: h}</code>.
         */

    /**
     * @function {static} o2.Dom.getWindowInnerHeight
     *
     * <p>Gets the inner height of the visible area.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var innerHeight = o2.Dom.getWindowInnerHeight();
     * </pre>
     *
     * @return the inner height of the window in pixels.
     */

    /**
     * @function {static} o2.Dom.getWindowInnerWidth
     *
     * <p>Gets the inner width of the visible area.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var innerWidth = o2.Dom.getWindowInnerWidth();
     * </pre>
     *
     * @return the inner width of the window in pixels.
     */

    /**
     * @function {static} o2.Dom.setWidth
     *
     * <p>Sets the <strong>width</strong> of the given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.setWidth('container', 500);
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Integer} width - the new width in pixels.
     */

    /**
     * @function {static} o2.Dom.setHeight
     *
     * <p>Sets the <strong>height</strong> of the given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.setHeight('container', 300);
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Integer} height - the new height in pixels.
     */

    /**
     * @function {static} o2.Dom.setDimension
     *
     * <p>Sets the dimension of the given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.setDimension('container', {width: 400, height: 200});
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Object} dimension - the new dimension in the form
     * <code>{width: w, height: h}</code>.
     */

    /**
     * @function {static} o2.Dom.getDimension
     *
     * <p>Gets the dimension of the given element in the form
     * <code>{width: w, height: h}</code>, where <strong>w</strong> and
     * <strong>h</strong> are in pixels.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var dimensions = o2.Dom.getDimension('container');
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * @return the dimension of the <strong>DOMNode</strong> in the form
     * <code>{width: w, height: h}</code>.
     */

    /**
     * @module   dom.form
     *
     * @requires core
     * @requires string.core
     *
     * <p>A HTML <code>Form</code> utility class.</p>
     */

    /**
     * @function {static} o2.Dom.compactField
     *
     * <p>Trims a given field, and returns the compacted value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.compactField('txtInput');
     * </pre>
     *
     * @param {Object} field - the field to be compacted, or its
     * <strong>id</strong>.
     *
     * @return field's compacted value; or <code>null</code> if the field
     * does not exist.
     *
     * @see o2.String.compact
     */

    /**
     * @function {static} o2.Dom.trimField
     *
     * <p>Trims a given field, and returns the trimmed value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.trimField('txtInput');
     * </pre>
     *
     * @param {Object} field - the field to be trimmed, or its
     * <strong>id</strong>.
     *
     * @return field's trimmed value; or <code>null</code> if the field
     * does not exist.
     *
     * @see o2.String.trim
     */

    /**
     * @function {static} o2.Dom.preventMultipleSubmit
     *
     * <p>Prevents the form to re-submit itself when the submit button
     * is pressed more than once.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.preventMultipleSubmit('actionForm');
     * </pre>
     *
     * @param {Object} form - A <strong>DOM</strong> reference to the form
     * object or its <code>String</code> id.
     */

    /**
     * @module   dom.load
     *
     * @requires core
     * @requires string.core
     *
     * <p>This package is for asynchronously loading resources such as images
     * and scripts.</p>
     */

    /**
     * @function {static} o2.Dom.loadCss
     *
     * <p>Asynchronously loads a <strong>CSS</strong> file with a given
     * <strong>src</strong>.</p>
     * <p>Cross-domain loading is also okay: The <strong>CSS</strong> file does
     * not have to be in the same domain as the web page.</p>
     *
     * <p>The success and failure callbacks is a somewhat hacky way of handling
     * <strong>CSS</strong> load events. In deed, detecting <strong>CSS</strong>
     * load is not an easy task, and it's not necessary most of the time.</p>
     * <p>Though it may get handy to prevent the Flash of Unstyled Content
     * (FOUC) issues.</p>
     * <p>A more robust way of handling load callbacks is polling
     * the property of a test element (such as the background color), that
     * you know that the loaded <strong>CSS</strong> will change for sure.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.loadCss('http://cdn.example.com/theme.css', function() {
     *      handleSuccess();
     * });
     * </pre>
     *
     * @param {String} src - the source <strong>URL</strong> of the
     * <strong>css</strong> file.
     * @param {Function} successCallback - the callback to execute when the load
     * operation completes.
     */

    /**
     * @function {static} o2.Dom.loadImage
     *
     * <p>Tries to load the image into a <strong>JavaScript</strong>
     * <code>Image</code> object; then triggers
     * <strong>successCallback</strong> or
     * <strong>failureCallback</strong> depending on
     * the result of the load attempt.</p>
     *
     * <p>This function can be used for pre-loading or post-loading images.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.loadImage('http//asset.example.com/spinner.png', function() {
     *      handleSuccess();
     * });
     * </pre>
     *
     * @param {String} url - the <strong>URL</strong> of the
     * <strong>image</strong>.
     * @param {Function} successCallback - gets called when the
     * <strong>image</strong> is loaded successfully.
     */

    /**
     * @function {static} o2.Dom.loadScript
     *
     * <p>Asynchronously loads a <strong>script</strong> with a given
     * <strong>src</strong>.</p>
     *
     * <p>Cross-domain loading is also okay: The <strong>script</strong> does
     * not have to be in the same domain as the web page.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.loadImage('http//asset.example.com/script.js', function() {
     *      handleSuccess();
     * });
     * </pre>
     *
     * @param {String} src - the source <strong>URL</strong> of the
     * <strong>script</strong>.
     * @param {Function} callback - the callback to execute when the load
     * operation completes.
     */

    /**
     * @module dom.modify
     *
     * @requires core
     * @requires dom.core
     *
     * <p>A utility package for additional <strong>DOM</strong>
     * modifications.</p>
     */

    /**
     * @function {static} o2.Dom.replace
     *
     * <p>Replaces one node with another.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.replace('firstContainer', 'secondContainer');
     * </pre>
     *
     * @param elmTarget - the target node or its <code>String</code> id.
     * @param elmToReplace - the replacement node or its <code>String</code> id.
     */

    /**
     * @function {static} o2.Dom.unwrap
     *
     * <p>This is like {@link o2.Dom.wrap} in reverse.</p>
     * <p>Moves all the elements inside the container to the container's
     * position and removes the container from the <strong>DOM</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.unwrap('container');
     * </pre>
     *
     * @param {Object} elmTarget - the target node or its <code>String</code> id
     * to unwrap.
     */

    /**
     * @function {public static} o2.Dom.wrap
     *
     * <p>Puts the target element into the wrapper element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var wrapper = o2.$('wrapper');
     * var target = o2.$('content');
     * o2.Dom.wrap(target, wrapper);
     * </pre>
     *
     * @param {Object} elmTarget - the node to wrap or its <code>String</code>
     * id.
     * @param {Object} elmWrapper - the wrapper node to its <code>String</code>
     * id.
     *
     * @return the wrapped node.
     */

    /**
     * @module   dom.ready
     *
     * @requires core
     *
     * <p>A helper to fire events when the <code>DOM</code> content
     * is loaded.</p>
     */

    /**
     * @function {static} o2.Dom.ready
     *
     * <p>Fires when the <code>HTML DOM</code> is ready.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.ready(function() {
     *      doInitializaton();
     * });
     * </pre>
     *
     * @param {Function} delegate - the callback that's called when the DOM is
     * ready.
     */

    /**
     * @module   dom.scroll
     *
     * @requires core
     * @requires dom.core
     *
     * <p>A window/div scroll helper.</p>
     */

    /**
     * @function {static} o2.Dom.getObjectScrollOffset
     *
     * <p>Gets the <strong>DOM</strong> object's scroll offset.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var offsets = o2.Dom.getObjectScrollOfset('container');
     * </pre>
     *
     * @param {Object} obj - the <strong>DOM</strong> node to check, or its
     * <code>String</code> id.
     *
     * @return the the <strong>DOM</strong> object's scroll offset in the form
     * <code>{left: l, top: t}</code>.
     */

    /**
     * @function {static} o2.Dom.getScrollOffset
     *
     * <p>An alias to {@link o2.Dom.getObjectScrollOffset}.</p>
     *
     * @see o2.Dom.getObjectScrollOffset
     */

        /**
         * @function {static} o2.Dom.scrollWindowToTop
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Dom.scrollWindowToTop();
         * </pre>
         *
         * <p>Scrolls window to top.</p>
         */

        /**
         * @function {static} o2.Dom.getWindowScrollOffset
         *
         * <p>Gets the <strong>window</strong>'s scroll offset.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var offsets = o2.Dom.getWindowScrollOffset();
         * </pre>
         *
         * @return the the <strong>window</strong>'s scroll offset in the form
         * <code>{left: l, top: t}</code>.
         */

        /**
         * @function {static} o2.Dom.scrollWindowToBottom
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Dom.scrollWindowToBottom();
         * </pre>
         *
         * <p>Scrolls window to bottom.</p>
         */

    /**
     * @function {static} o2.Dom.scrollObjectToTop
     *
     * <p>Scrolls an element to top.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.scrollObjectToTop('container');
     * </pre>
     *
     * @param {Object} obj - the element, or the <strong>id</strong> of the
     * element, to scroll.
     */

    /**
     * @function {static} o2.Dom.scrollObjectToBottom
     *
     * <p>Scrolls an element to bottom.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.scrollObjectToBottom('container');
     * </pre>
     *
     * @param {Object} obj - the element, or the <strong>id</strong> of it, to
     * scroll.
     */

    /**
     * @function {static} o2.Dom.scrollTo
     *
     * <p>An alias to {@link o2.Dom.scrollWindowToObject}.</p>
     *
     * @see o2.Dom.scrollWindowToObject
     */

    /**
     * @function {static} o2.Dom.scrollWindowToObject
     *
     * <p>An alias to {@link o2.Dom.scrollWindowToObject}.</p>
     *
     * @see o2.Dom.scrollWindowToObject
     */

    /**
     * @function {static} o2.Dom.scrollToObject
     *
     * <p>An alias to {@link o2.Dom.scrollWindowToObject}.</p>
     *
     * @see o2.Dom.scrollWindowToObject
     */

    /**
     * @module   dom.style
     *
     * @requires core
     * @requires string.core
     * @requires string.transform
     *
     * <p>A utility package to
     * <strong>add</strong>/<strong>remove</strong>/<strong>modify</strong>
     * styles.</p>
     */

    /**
     * @function {static} o2.Dom.activateAlternateStylesheet
     *
     * <p>Activates the <strong>alternate style sheet</strong> with the given
     * <code>title</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.activateAlternateStylesheet('alternateTheme');
     * </pre>
     *
     * @param {String} title - the <code>title</code> of the <strong>alternate
     * style sheet</strong> to activate.
     */

        /**
         * @function {static} o2.Dom.addCssRules
         *
         * <p>Adds the CSS rules given in the <strong>cssText</strong> parameter
         * to the document.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Dom.addCssRules(
         *      'div.warning { background-color:#c00; color:#fff };'
         * );
         * </pre>
         */

    /**
     * @function {static} o2.Dom.addStyle
     *
     * <p>Adds style attributes to a <code>DOM</code> node.</p>
     *
     * <p>Note that adding and removing style attributes to a
     * <strong>DOM</strong>
     * not is considered "bad practice". Do not use inline styles to modify the
     * view;
     * assign <strong>className</strong>'s instead of <strong>style</strong>
     * values.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.addStyle('container', {color : '#bada55'})
     * </pre>
     *
     * @param {Object} obj - the current <code>DOM</code> node, or the
     * <strong>id</strong> of that node, to add styles to.
     * @param {Object} style - styles in the form <code>{style1:value1,
     * style2:value2}</code>.
     */

    /**
     * @function {static} o2.Dom.setCss
     *
     * <p>An alias to {@link o2.Dom.addStyle}.</p>
     *
     * @see o2.Dom.addStyle
     */

    /**
     * @function {static} o2.Dom.setStyle
     *
     * <p>An alias to {@link o2.Dom.addStyle}.</p>
     *
     * @see o2.Dom.addStyle
     */

        /**
         * @function {static} o2.Dom.getStyle
         *
         * <p>Gets the <strong>style</strong> of a given property of
         * the element.</p>
         * <p>Tries to parse the <code>currentStyle</code>, if available;
         * otherwise tries to calculate the style using
         * <code>window.getComputedStyle</code>;
         * gets <code>obj.style</code> if everything else fails.
         *
         * <p>Note that adding and removing style attributes to a
         * <strong>DOM</strong> not is considered "bad practice". Do not use
         * inline styles to modify the view;
         * assign <strong>className</strong>'s instead of <strong>style</strong>
         * values.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var color = o2.Dom.getStyle('container', 'color');
         * </pre>
         *
         * @param {Object} elm - the element, or the <strong>id</strong> of it,
         * to check.
         * @param {String} cssProperty - the css property either
         * <strong>dash-separated</strong>
         * or <strong>camelCased</strong> (i.e.: 'border-color' or
         * 'borderColor')
         * @param {Boolean} isNoForce - (optional; defaults to
         * <code>false</code>)
         * if <code>true</code> inherited values from the CSS files will also be
         * parsed, otherwise, only inline styles will be parsed.
         *
         * @return the calculated <strong>style</strong> value.
         */

    /**
     * @function {static} o2.Dom.getCss
     *
     * <p>An alias to {@link o2.Dom.getStyle}.</p>
     *
     * @see o2.Dom.getStyle
     */

    /**
     * @function {static} o2.Dom.hide
     *
     * <p>Hides the given object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.hide('container');
     * </pre>
     *
     * @param {Object} obj - the <strong>DOM</strong> node, or the
     * <strong>id</strong> to hide.
     */

    /**
     * @function {static} o2.Dom.show
     *
     * <p>Shows the given object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.show('container');
     * </pre>
     *
     * @param {Object} elm - the <strong>DOM</strong> node, or the
     * <strong>id</strong> of it, to show.
     */

    /**
     * @function {static} o2.Dom.isVisible
     *
     * <p>Checks whether the <strong>DOM</strong> node is visible.</p>
     * <p>Note that being visible does not necessarily mean being available
     * inside the <strong>viewport</strong>.</p>
     * <p>If a <strong>DOM</strong> node has <code>display == 'none'</code>
     * or <code>visibility == 'hidden'</code> <strong>CSS</strong> properties,
     * then it's regarded as "invisible", otherwise it is considered to be
     * "visible".</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isContainerVisible = o2.Dom.isVisible('container');
     * </pre>
     *
     * @param {Object} obj - the <strong>DOM</strong> element, or the
     * <strong>id</strong> of it, to test.
     *
     * @return <code>true</code> if the element is visible, <code>false</code>
     * otherwise.
     */

    /**
     * @function {static} o2.Dom.toggleVisibility
     *
     * <p>Toggles the visibility of the given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.toggleVisibility('container');
     * </pre>
     *
     * @param {Object} elm - a <strong>DOM</strong> reference or its
     * <code>String</code> id.
     * @param {Boolean} state - (Optional, defaults to <code>undefined</code>)
     * if <code>true</code>, show the item; if <code>false</code> hides the
     * item; if <code>undefined</code> simply toggles the visibility of the
     * item.
     */

    /**
     * @module   dom.core
     *
     * @requires core
     * @requires dom.constants
     *
     * <p>A cross-browser <strong>DOM</strong> manipulation helper.</p>
     */

    /**
     * @function {static} o2.Dom.append
     *
     * <p>Appends the element to the bottom of its parent.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var child = o2.$('childNode');
     * var parent = o2.$('parentNode');
     * o2.Dom.append(child, parent);
     * </pre>
     *
     * @param {Object} elmChild - the child node, or the <strong>id</strong> of
     * the node to append.
     * @param {Object} elmParent - the parent container, or the
     * <strong>id</strong> of the container.
     */

    /**
     * @function {static} o2.Dom.createDocumentFragment
     *
     * <p>Creates a <strong>Document Fragment</strong> from an
     * <strong>HTML</strong> <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var frag = o2.Dom.createDocumentFragment('[div]test[/div]');
     * </pre>
     *
     * @param {String} html - the <strong>HTML</strong> to create a fragment
     * from.
     *
     * @return {HTMLDocumentFragment} - the generated <code>document</code>
     * fragment.
     */

    /**
     * @function {static} o2.Dom.createElement
     *
     * <p>Creates an element with given name and attributes.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var el = o2.Dom.createElement(
     *      'div',
     *      {className : 'active', style : 'font-weight : bold'}
     * );
     * </pre>
     *
     * @param {String} name - the node name of the element (i.e. 'div', 'a').
     * @param {Object} attributes - an associative array in the form
     * <code>{att1:value1, att2:value2}</code>.
     *
     * @return the created element.
     */

    /**
     * @function {static} o2.Dom.create
     *
     * <p>An alias to {@link o2.Dom.createElement}.</p>
     *
     * @see o2.Dom.createElement
     */

    /**
     * @function {static} o2.Dom.getAttribute
     *
     * <p>Gets the attribute of a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var uid = o2.Dom.getAttribute('container', 'data-user-id');
     * </pre>
     *
     * @param {Object} elm - the node, or the <strong>id</strong> of the
     * node, to get the attribute of.
     * @param {String} attribute - the attribute to gather.
     *
     * @return the value of the attribute if found; <code>null</code>
     * otherwise.
     */

    /**
     * @function {static} o2.Dom.getHtml
     *
     * <p>Gets the <strong>HTML</strong> of a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var html = o2.Dom.getHtml('container');
     * </pre>
     *
     * @param {Object} elm - the <strong>DOM</strong> node or its
     * <code>String</code> id.
     *
     * @return the <code>innerHTML</code> of the given node, if it exists;
     * <code>null</code> otherwise.
     */

        /**
         * @function {static} o2.Dom.getText
         *
         * <p>Gets the textual content of the given node, replacing entities
         * like <code>& amp;</code> with it's corresponding character
         * counterpart (<strong>&</strong> in this example).</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var txt = o2.Dom.getText('container');
         * </pre>
         *
         * @param {Object} elm - the <strong>DOM</strong> node or its
         * <code>String</code> id.
         *
         * @return the textual content of the given node.
         */

    /**
     * @function {static} o2.Dom.insertAfter
     *
     * <p>Adds the node after the reference node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ref = o2.$('ref');
     * var new = o2.$('new');
     * o2.Dom.insertAfter(new, ref);
     * </pre>
     *
     * @param {Object} elmNewNode - the DOM node, or the <strong>id</strong> of
     * the node, to insert after.
     * @param {Object} elmRefNode - the reference node, or the
     * <strong>id</strong> of the node.
     */

    /**
     * @function {static} o2.Dom.insertBefore
     *
     * <p>Adds the node before the reference node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ref = o2.$('ref');
     * var new = o2.$('new');
     * o2.Dom.insertBefore(new, ref);
     * </pre>
     *
     * @param {Object} elmNewNode - the node, or the <strong>id</strong> of the
     * node, to insert before.
     * @param {Object} elmRefNode - the reference, or the <strong>id</strong>
     * of the node.
     */

    /**
     * @function {static} o2.Dom.isDocument
     *
     * <p>Checks whether the given node is a <code>document</code> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isDocument = o2.Dom.isDocument(currentNode);
     * </pre>
     *
     * @param {DOMNode} obj - the <strong>node</strong> to test.
     *
     * @return <code>true</code> if the <strong>node</strong> is the
     * <code>document</code> element; <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Dom.isElement
     *
     * <p>Checks whether the given node is an <strong>element</strong>
     * node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isElement = o2.Dom.isElement(currentNode);
     * </pre>
     *
     * @param {DOMNode} obj - the <strong>node</strong> to test.
     *
     * @return <code>true</code> if the <strong>node</strong> is an
     * <strong>element</strong> node; <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Dom.prepend
     *
     * <p>Prepends the element to the top of its parent.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var child = o2.$('ChildContainer');
     * var parent = o2.$('MasterContainer');
     * o2.Dom.prepend(child, parent);
     * </pre>
     *
     * @param {Object} elmChild - the child node, or the id of the node to
     * prepend.
     * @param {Object} elmParent - the parent container, or the id of the
     * container.
     */

    /**
     * @function {static} o2.Dom.remove
     *
     * <p>Removes the element from the <strong>DOM</strong> flow.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.remove('navigation');
     * </pre>
     *
     * @param {Object} e - either the <strong>element</strong>, or the
     * <strong>id</strong> of it, to remove.
     *
     * @return the removed node.
     */

    /**
     * @function {static} o2.Dom.removeNode
     *
     * <p>An <strong>alias</strong> to {@link o2.Dom.remove}.</p>
     *
     * @see o2.Dom.remove
     */

    /**
     * @function {static} o2.Dom.removeChildren
     *
     * <p>Removes all the children of the element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.removeChildren('container');
     * </pre>
     *
     * @param {Object} e - either the <strong>element</strong>, or the
     * <strong>id</strong> of it to process.
     */

    /**
     * @function {static} o2.Dom.empty
     *
     * <p>An <strong>alias</strong> to {@link o2.Dom.removeChildren}.</p>
     *
     * @param {Object} elm - either the <strong>element</strong>, or the
     * <strong>id</strong> of it to process.
     */

    /**
     * @function {static} o2.Dom.removeEmptyTextNodes
     *
     * <p>Removes empty text nodes from the element.</p>
     * <p>Note that this removal is not recursive; only the first-level empty
     * child nodes of the element will be removed.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.removeEmptyTextNodes('container');
     * </pre>
     *
     * @param {Object} e - either the <strong>element</strong>, or the
     * <strong>id</strong> of it to process.
     */

    /**
     * @function {static} o2.Dom.removeEmpty
     *
     * <p>An <strong>alias</strong> to
     * {@link o2.Dom.removeEmptyTextNodes}.</p>
     *
     * @see o2.Dom.removeEmptyTextNodes
     */

    /**
     * @function {static} o2.Dom.setAttribute
     *
     * <p>Sets the attribute of the given object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.setAttribute('container', 'data-user-id', '123');
     * </pre>
     *
     * @param {Object} elm - the object or the <code>String</code> id of it.
     * @param {String} attribute - the name of the attribute.
     * @param {String} value - the value of the attribute.
     */

    /**
     * @function {static} o2.Dom.setHtml
     *
     * <p>Simply sets the <code>innerHTML</code> of the element.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.setHtml('container', '[h1]hello[/h1]');
     * </pre>
     *
     * @param {Object} elm - The <strong>DOM</strong> element to set the
     * <strong>HTML</strong> of, or its <code>String</code> id.
     */

    /**
     * @function {static} o2.Jsonp.get
     *
     * <p>Creates a <strong>JSONP</strong> request.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Jsonp.get('http://example.com/api.php', {param: 'value'},
     *      function(data) {
     *
     *      }
     * );
     * </pre>
     *
     * @param {String} url - the <strong>URL</strong> of the
     * <strong>JSONP</strong> service.
     * @param {Object} params - parameters in the form of {name1:value1,...}
     * @param {Function} callback - callback to execute after
     * <strong>JSONP</strong> arrives.
     */

    /**
     * @module   validation.core
     *
     * @requires core
     *
     * <p>A validation helper.</p>
     */

        /**
         * @class {static} o2.Validation
         *
         * <p>A simple class for validating various kinds of
         * <strong>object</strong>s.</p>
         */

    /**
     * @function {private} o2.Validation.is
     *
     * <p>Returns the type information of the given object.</p>
     * <p>The type can be any of the following:</p>
     * <p><code>Array, Boolean, Date, Error, Function, JSON,
     * Math, Number, Object, RegExp, String, Arguments</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : 'dolor'};
     * var isObject = o2.Validation.is(obj, 'Object');
     * </pre>
     *
     * @param {Object} obj - the object to check type against.
     * @param {String} type - the type to compare.
     *
     * @return <code>true</code> if the <strong>object</strong>'s type matches
     * the <strong>type</strong> parameter, <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isArguments
     *
     * <p>Checks whether the object is an <code>arguments</code> object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isArguments = o2.Validation.isArguments(arguments);
     * </pre>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is an <code>arguments</code> object,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isArray
     *
     * <p>Checks whether the object is an <code>Array</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isArray = o2.Validation.isArray([]);
     * </pre>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is an <code>Array</code>,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isBoolean
     *
     * <p>Checks whether the object is a <code>Boolean</code>.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isBoolean = o2.Validation.isBoolean(false);
     * </pre>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>Boolean</code>,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isDate
     *
     * <p>Checks whether the object is a <code>Date</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isDate = o2.Validation.isDate((ew Date());
     * </pre>
     *
     * @param {Arguments} varargin - if a single argument is given it checks
     * whether it identifies a <code>Date</code> object. Otherwise the
     * function takes three parameters (year, month, date) and cheks whether
     * they denote a valid Date.
     *
     * @return <code>true</code> if obj is a <code>Date</code>,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isFunction
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isFunction = o2.Validation.isFunction(fnTest);
     * </pre>
     *
     * <p>Checks whether the object is a <code>Function</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>Function</code>,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isNaN
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isNaN = o2.Validation.isNaN('lorem');
     * </pre>
     *
     * <p>Checks whether the given parameter is <code>NaN</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is <code>NaN</code>,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isNull
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isNull = o2.Validation.isNull(null);
     * </pre>
     *
     * <p>Checks whether the given parameter is <code>null</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is <code>null</code>,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isNumber
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isNumber = o2.Validation.isNumber(42);
     * </pre>
     *
     * <p>Checks whether the object is a <code>Number</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>Number</code>,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isNumeric
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isNumeric = o2.Validation.isNumeric('4.2');
     * </pre>
     *
     * <p>Checks whether the given parameter is a numeric entity.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is a numeric entity,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isObject
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isObject = o2.Validation.isObject({});
     * </pre>
     *
     * <p>Checks whether the object is an <code>Object</code>({}).</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is an <code>Object</code> ({}),
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isRegExp
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isRegExp = o2.Validation.isRegExp(/test/ig);
     * </pre>
     *
     * <p>Checks whether the object is a <code>RegExp</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>RegExp</code>,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isString
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isString = o2.Validation.isString('lorem');
     * </pre>
     *
     * <p>Checks whether the object is a <code>String</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return true if obj is a String, false otherwise.
     */

    /**
     * @function {static} o2.Validation.isUndefined
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isUndefined = o2.Validation.isUndefined(undefined);
     * </pre>
     *
     * <p>Checks whether the given parameter is <code>undefined</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is <code>undefined</code>,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isWindow
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isWindow = o2.Validation.isWindow(window);
     * </pre>
     *
     * <p>Checks whether the given parameter is a <code>window</code>
     * object.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is a <code>window</code>,
     * <code>false</code> otherwise.
     */

    /**
     * @module   supports.core
     *
     * @requires core
     *
     * <p>An object support checker.</p>
     */

        /**
         * @class {static} o2.Supports
         *
         * <p>Checks support for various objects and properties like
         * <strong>DOM</strong> and <strong>cookie</strong>s.</p>
         */

    /**
     * @function {static} o2.Supports.ajax
     *
     * <p>Checks whether <strong>AJAX</strong> (At least XmlHttpRequest Level 1)
     * is supported.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isAjaxSupported = o2.Supports.ajax();
     * </pre>
     *
     * @return <code>true</code> if <strong>AJAX</strong> is supported,
     * <code>false</code> otherwise.
     *
     * @throws Exception - if <code>o2.Ajax</code> does not exist.
     */

    /**
     * @function {static} o2.Supports.cookie
     *
     * <p>Checks for <strong>cookie</strong> support.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isCookieSupported = o2.Supports.cookie();
     * </pre>
     *
     * @return <code>true</code> if <strong>cookie</strong>s are supported,
     * <code>false</code> otherwise.
     *
     * @throws Exception - if <code>o2.Cookie</code> does not exist.
     */

    /**
     * @function {static} o2.Supports.dom
     *
     * <p>Checks whether <strong>DOM</strong> is adequately supported.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isDomSupported = o2.Supports.dom();
     * </pre>
     *
     * @return <code>true</code> if <strong>DOM</strong> is supported,
     * <code>false</code> otherwise.
     */

     /**
      * @module   validation.regexp
      *
      * @requires core
      *
      * <p>Does validation by matching test subjects against predefined
      * <strong>regular expression</strong>s.<p>
      */

    /**
     * @function {static} o2.Validation.isEmail
     *
     * <p>Did you know that <code>Abc\@def@example.com</code>, and
     * <code>customer/department=shipping@example.com</code> are all valid
     * e-mails?</p>
     * <p>There is no good (and realistic) regular expression to match an
     * e-mail address.<p>
     * <p>The grammar ( http://www.ietf.org/rfc/rfc5322.txt ) is too
     * complicated for that.</p>
     * <p>This method matches <strong>e-mail</strong> addresses, while giving
     * some false-positives.</p>
     * <p>The correct action to validate an <strong>e-mail</strong> address is
     * to validate by trying
     * (i.e. try sending an account activation <strong>e-mail</strong> to a
     * newly registered user, for example.).</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isEmail = o2.Validation.isEmail('volkan@o2js.com');
     * </pre>
     *
     * @param {String} mail - the <strong>e-mail</strong> address to test.
     *
     * @return <code>true</code> if the <strong>e-mail</strong> address is a
     * potentially valid e-mail, <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isUrl
     *
     * <p>Checks whether the given argument is a valid <strong>URL</strong>
     * address.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isUrl = o2.Validation.isUrl('http://o2js.com/');
     * </pre>
     *
     * @param {String} url - the address to check.
     *
     * @return <code>true</code> if the address is a valid <strong>URL</strong>,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Validation.isWhitespace
     *
     * <p>Checks whether the given argument consists of only whitespace
     * characters.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isWhitespace = o2.Validation.isWhitespace('  \t\r\n   \n  ');
     * </pre>
     *
     * @param {String} text - the text to check.
     *
     * @return <code>true</code> if the argument consists of only whitespace
     * characters, <code>false</code> otherwise.
     */

    /**
     * @module   unit.core
     *
     * @requires core
     * @requires debugger.core
     * @requires dom.scroll
     * @requires string.core
     *
     * <p>This package is a unit test runner, that is used to test
     * <strong>js</strong> units.</p>
     */

        /**
         * @class {static} o2.Unit
         *
         * <p>A "unit test" <strong>runner</strong>.</p>
         * <p>Runs <code>UnitTest</code>s.</p>
         */

    /**
     * @class {isolated} UnitTest
     *
     * <p>Defines a test unit.</p>
     * <p>This <strong>class</strong> is <strong>isolated</strong>, and it is
     * only available in the unit meta's callback given to the
     * {@link o2.Unit.add} method.
     */

    /**
     * @constructor UnitTest.UnitTest
     *
     * <p>Creates a new <code>UnitTest</code>.</p>
     *
     * @param {String} description - the description of the unit test.
     * @param {String} totalAssertionCount - the overall number of assertions
     * that the <code>UnitTest</code>'s <strong>testCase</strong> will run.
     * @param {Function} testCase - the test case to run when executing the
     * <code>UnitTest</code>.
     *
     * @param {String} description - the description of the test case.
     * @param {Integer} totalAssertionCount - a non zero integer for the total
     * assertion count in the test case.
     * @param {Function} testCase - the actual test case reference.
     *
     * @see o2.Unit.add
     */

    /**
     * @function o2.UnitTest.terminate
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * test.terminate();
     * </pre>
     *
     * <p>Terminates the unit test by setting remaining assertion count to
     * zero.</p>
     */

    /**
     * @function {static} o2.Unit.add
     *
     * <p>Creates a test suite parsing the <strong>testMeta</strong>, and
     * adds it to the test queue.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.add('some method SHOULD meet a requirement', {
     *      count: 1,
     *      test : function() {
     *          var me = this;
     *          o2.Unit.assert(me, false, 'I pass.');
     *      }
     * });
     * </pre>
     *
     * @param {String} description - the description of the test.
     * @param {Object} testMeta - test meta data in the form {count:
     * [number], test: [callback]}, where <strong>count</strong> is the
     * total number of assertions in the test suite, and
     * <strong>test</strong> is the actual test suite <code>Function</code>.
     */

    /**
     * @function {static} o2.Unit.assert
     * <p>Asserts whether the given <strong>expression</strong> evaluates to
     * <code>true</code> or not.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.assert(me, condition, 'condition is true');
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Expression} expression - the expression to evaluate.
     * @param {String} message - the associated message.
     */

    /**
     * @function {static} o2.Unit.assertEqual
     * <p>Asserts whether two values are equal.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.assertEqual(me, 10, '10', '10 is 10');
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */

    /**
     * @function {static} o2.Unit.assertNotEqual
     * <p>Asserts whether two values are <strong>NOT</strong> equal.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.assertNotEqual(me, 10, '11', '10 is not 11');
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */

    /**
     * @function {static} o2.Unit.assertStrictEqual
     *
     * <p>Asserts whether two values are strictly equal (by value and
     * type).</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.assertStrictEqual(me, 10, 10, '10 is 10');
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */

    /**
     * @function {static} o2.Unit.assertStrictNotEqual
     *
     * <p>Asserts whether two values are strictly <strong>NOT</strong> equal
     * (by value and type).</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.assertStrictNotEqual(me, 10, '10', '10 is not 10');
     * </pre>
     *
     * @param {o2.UnitTest} unitTest - the current active unit test.
     * @param {Object} currentValue - the current value to assert.
     * @param {Object} expectedValue - the expected value to check against.
     * @param {String} message - the associated message.
     */

    /**
     * @function {static} o2.Unit.getGlobalFailureCount
     *
     * <p>Gets the total number of failed assertions so far.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var totalFail = o2.Unit.getGlobalFailureCount();
     * </pre>
     *
     * @return the total number of failed assertions.
     */

    /**
     * @function {static} o2.Unit.getGlobalSuccessCount
     *
     * <p>Gets the total number of successful assertions so far.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var totalSuccess = o2.Unit.getGlobalSuccessCount();
     * </pre>
     *
     * @return the total number of successful assertions.
     */

    /**
     * @function {static} o2.Unit.isRunning
     *
     * <p>Checks whether the current <strong>test suite</strong> is still
     * running.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isActive = o2.Unit.isRunning();
     * </pre>
     *
     * @return <code>true</code> if the current <strong>test suite</strong>
     * is still runing; <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Unit.log
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.log('hello world');
     * </pre>
     *
     * <p>Logs the <strong>message</strong>.</p>
     * <p>An alias to {@link Debugger.log}.</p>
     *
     * @see o2.Debugger.log
     */

    /**
     * @function {static} o2.Unit.run
     *
     * <p>Asynchronously runs all of the registered
     * <code>UnitTest</code>s, one after another.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Unit.run(function() {
     *      // Completed.
     * });
     * </pre>
     *
     * @param {Function} globalCompletionCallback - (Optional) this callback
     * will be run with <code>o2.Unit</code> as a parameter passed to it.
     */

   /**
    * @module   event.constants
    *
    * @requires core
    *
    * <p>A cross-browser event management object.</p>
    */

        /**
         * @class {static} o2.Event
         *
         * <p>A cross-browser event handling and event utilities class.</p>
         */

    /**
     * @struct {static} o2.Event.keyCode
     */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.ENTER - enter key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.RETURN - enter key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.LEFT - left arrow key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.RIGHT - right arrow key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.TOP - up arrow key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.BOTTOM - down arrow key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.UP - up arrow key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.DOWN - down arrow key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.BACKSPACE - backspace key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.TAB - TAB key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.SHIFT - shift key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.CTRL - CTRL key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.ALT - ALT key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.CAPS_LOCK - caps lock key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.ESCAPE - ESC key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.DELETE - DEL key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.SPACE - SPACE key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.PAGE_UP - PAGE UP key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.PAGE_DOWN - PAGE DOWN key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.END - END key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.HOME - HOME key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.NUMPAD_ENTER - NUMPAD ENTER key.
         */

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.COMMA - COMMA key.
         */

     /**
      * @module   event.extend
      *
      * @requires core
      * @requires event.constants
      * @requires event.core
      *
      * <p>Extension methods for the {@link Event} object.</p>
      */

    /**
     * @function {static} o2.Event.isArrowKey
     *
     * <p>Checks whether the pressed key is an arrow key.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'keydown', function(evt) {
     *      var isArrowKey = o2.Event.isArrowKey(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is an arrow key,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Event.isBackspaceKey
     *
     * <p>Checks whether the pressed key is the backspace (DEL) key.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'keydown', function(evt) {
     *      var isBackspaceKey = o2.Event.isBackspaceKey(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the backspace key,
     * <code>false</code> otherwise.
     */

        /**
         * @function {static} o2.Event.isCharacterKeypressEvent
         *
         * <p>Checks whether the character in a <code>onkeypress</code> event
         * actually produces a printable char.</p>
         *
         * <p>The thing you have to remember is that you can't reliably tell
         * <strong>anything at all</strong> about any character that may be
         * typed in a <code>onkeydown</code> or <code>onkeyup</code> event:
         * The printable key is determined only in the <code>onkeypress</code>
         * handler.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Event.addEventListener('container', 'keypress', function(evt) {
         *      var isCharKeypress = o2.Event.isCharacterKeypressEvent(evt);
         * });
         * </pre>
         *
         * @return <code>true</code> if the pressed key is a printable
         * character; <code>false</code> otherwise.
         */

    /**
     * @function {static} o2.Event.isEnterKey
     *
     * <p>Checks whether the pressed key is the enter (return) key.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'keypress', function(evt) {
     *      var isEnterKey = o2.Event.isEnterKey(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the enter key,
     * <code>false</code> otherwise.
     */

    /**
     * @function {static} o2.Event.isEscapeKey
     *
     * <p>Checks whether the pressed key is the escape (ESC) key.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'keypress', function(evt) {
     *      var isEscapeKey = o2.Event.isEscapeKey(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the escape key,
     * <code>false</code> otherwise.
     */

        /**
         * @function {static} o2.Event.isRightClick
         *
         * <p>Checks whether or not the curent action is a right click
         * action.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Event.addEventListener('container', 'click', function(evt) {
         *      var isRightClick = o2.Event.isRightClick(evt);
         * });
         * </pre>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally in {@link o2.Event.addEventListener}.
         *
         * @return <code>true</code> if the event is a right click event,
         * <code>false</code> otherwise.
         */


    /**
     * @function {static} o2.Event.isTabKey
     *
     * <p>Checks whether the pressed key is the tab key.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'keypress', function(evt) {
     *      var isTabKey = o2.Event.isTabKey(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the tab key,
     * <code>false</code> otherwise.
     */

    /**
     * @module   event.core
     *
     * @requires core
     * @requires event.constants
     * @requires string.core
     *
     * <p>A cross-browser event management object.</p>
     */

        /**
         * @function {static} o2.Event.addEventListener
         *
         * <p>Adds a new event listener to the <strong>DOM</strong> Node.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Event.addEventListener('container', 'click', function(evt) {
         *      doClickHandling();
         * });
         * </pre>
         *
         * @param {DomNode} node - the <strong>DOM</strong> object (or its
         * <code>String</code> id) the evet shall be attached.
         * @param {String} evt - the name of the event (like "click",
         * "mousemove"...)
         * @param {Function} fn - a reference to the on[event] callback action.
         *
         * @throws exception - if <strong>fn</strong> callback is not defined.
         */

        /**
         * @function {static} o2.Event.removeEventListener
         *
         * <p>Removes an already-added new event listener from the DOM Node.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Event.removeEventListener('container', 'click', container_click);
         * </pre>
         *
         * @param {DomNode} node - the DOM object (or its <code>String</code>
         * reference) the evet shall be removed.
         * @param {String} evt - the name of the event (like "click",
         * "mousemove"...)
         * @param {Function} fn - a reference to the on[event] callback action.
         *
         * @throws Exception - if <strong>fn</strong> callback is not defined.
         */

    /**
     * @function {static} o2.Event.addEventListeners
     *
     * <p>Adds a set of event handlers the the <strong>eventName</strong> of
     * the given <strong>collection</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListeners(['elm1', 'elm2'], 'click', function(evt) {
     *      handleClickEvent();
     * });
     * </pre>
     *
     * @param {Object} collection - an <code>Object</code> or an
     * <code>Array</code> of <strong>DOM</strong> nodes, or their
     * <strong>id</strong>s.
     * @param {String} eventName - the name of the <strong>event</strong> to
     * attach to.
     * @param {Function} handler - the common event handling
     * <strong>callback</strong>.
     *
     * @throws Exception - if the <strong>handler</strong> callback is not
     * defined.
     */

        /**
         * @function {static} o2.Event.getEventObject
         *
         * <p>Gets the actual event object.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Event.addEventListener('container', 'click', function(evt) {
         *      var e = o2.Event.getEventObject(evt);
         * });
         * </pre>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally in {@link Event.addEventListener}
         *
         * @return the actual <code>DOM Event</code> object.
         */

        /**
         * @function {static} o2.Event.getTarget
         *
         * <p>Gets the originating source of the event.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Event.addEventListener('container', 'click', function(evt) {
         *      var src = o2.Event.getTarget(evt);
         * });
         * </pre>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally in {@link o2.Event.addEventListener}
         *
         * @return the actual <strong>DOM</strong> target of the event object.
         */

    /**
     * @function {static} o2.Event.getKeyCode
     *
     * <p>Gets the key code of the key-related event (keydown, keyup, keypress
     * etc.).</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'keydown', function(evt) {
     *      var code = o2.Event.getKeyCode(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the <strong>unicode</strong> key code associated
     * with the event as an <code>Integer</code>, if found; <code>0</code>
     * otherwise.
     */

    /**
     * @function {static} o2.Event.getMouseCoordinates
     *
     * <p>Gets the current mouse coordinates.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'mousemove', function(evt) {
     *      var dimensions = o2.Event.getMouseCoordinates(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the coordinates in the form of
     * <code>{x: mouseX, y: mouseY}</code>
     * where <code>x</code> is the distance from the top of the screen, and
     * <code>y</code> is the distance from the left of the screen.
     */

        /**
         * @function {static} o2.Event.preventDefault
         *
         * <p>Prevents the default action. When this method is called inside an
         * even handling callback, the default action associated with that
         * event is not triggered. Like, if it is an <code>onclick</code>
         * event on a link, then the browser does not go to the
         * <code>href</code> of that link.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Event.addEventListener('container', 'click', function(evt) {
         *      o2.Event.preventDefault(evt);
         * });
         * </pre>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally in {@link Event.addEventListener}
         */

        /**
         * @function {static} o2.Event.stopPropagation
         *
         * <p>Stops the propagation of the event upwards in the DOM
         * hierarchy.</p>
         *
         * <p>Note that "change" event does not bubble.</p>
         *
         * <p>Also, events: change, submit, reset, focus, blur do not bubble
         * in Internet Explorer.</p>
         *
         * <p>According to specification, "focus" and "blur" should not bubble,
         * while "change", "submit", "reset" should.</p>
         *
         * <p>This behavior implemented properly in all web browsers but IE.</p>
         *
         * <p>See {@link
         * http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow}
         * for details.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Event.addEventListener('container', 'click', function(evt) {
         *      o2.Event.stopPropagation(evt);
         * });
         * </pre>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally in {@link Event.addEventListener}
         */

    /**
     * @module   method.event
     *
     * @requires core
     *
     * <p>Event-handling-related helper methods.</p>
     */

   /**
    * @function {static} o2.Method.bindAsEventListener
    *
    * <p>Binds the given function as an event listener, ensuring that
    * the first parameter is always the event object.</p>
    *
    * <p>This method is generally used in conjunction with
    * {@link o2.Event.addEventListener}.</p>
    *
    * <p><strong>Usage example:</strong></p>
    *
    * <pre>
    * var $ = o2.$;
    * var listen = o2.Event.addEventListener;
    * var getTarget = o2.Event.getTarget;
    * var bind = o2.Method.bindAsEventListener;
    *
    * var context = {id : 1, description : 'hello world.'};
    * var kClick = 'click';
    * var menu = $('mainMenu');
    *
    * function test(evt, a, b) {
    *      console.log( getTarget(evt) );
    *      console.log( this.id );
    *      console.log( this.description );
    *      console.log( a );
    *      console.log( b );
    * }
    *
    * var delegate = bind(context, test, 20, 30);
    * listen(menu, kClick, delegate);
    *
    * // When mainMenu element is clicked the output will be as follows:
    * //
    * // [DOM Element]
    * // 1
    * // hello world
    * // 20
    * // 30
    * </pre>
    *
    * @return the bound <code>Function</code>.
    *
    * @see o2.Event.addEventListener
    */

/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */

    /**
     * @module   method.inherit
     *
     * @requires core
     * @requires string.corei
     *
     * <p>OOJS/Inheritance related method helpers.</p>
     */

    /**
     * @function {static} o2.Method.overload
     *
     * <p>Adds a method to the <code>Object</code>.</p>
     * <p>If parameters count is different but the name is same,
     * adds the method with a different signature, overloading the former
     * one.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var Context = {};
     *
     * o2.Method.overload(Context, 'test', function(a) {
     *      console.log(a);
     * });
     *
     * o2.Method.overload(Context, 'test', function(a, b) {
     *      console.log(a + b);
     * });
     *
     * Context.test(1);
     * Context.test(1, 2);
     *
     * // will output:
     * // 1
     * // 3
     * </pre>
     *
     * @param {Object} object - the <code>Object</code> to add methods to.
     * @param {String} name - the name of the method.
     * @param {Function} fn - the method reference.
     *
     * @return the overloaded <code>Function</code>.
     */

    /**
     * @function {static} o2.Method.requireAllArguments
     *
     * <p>Checks the passed in arguments, and if all arguments are present,
     * executes <code>Function</code>. Otherwise throws an error.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function test(a, b) {
     *
     * }
     *
     * var testEnsure = o2.Method.requireAllArguments(test);
     *
     * testEnsure(1);    // will throw an exception.
     * testEnsure(1, 2); // will NOT throw an exception.
     * </pre>
     *
     * @param {Function} fn - the <code>Function</code> to check.
     *
     * @return the applied <code>Function</code>.
     *
     * @throws Excpetion if all of the arguments is not provided to the
     * <code>Function</code>.
     */

    /**
     * @module   method.repeat
     *
     * @requires core
     *
     * <p>A <code>Function</code> helper for stuff repetitive method calls.</p>
     */

    /**
     * @function {static} o2.Method.after
     *
     * <p>Creates a <code>Function</code> that only executes after being called
     * <strong>count</strong> times.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var bump = o2.Method.after(3, function() {
     *      console.log('bump');
     * });
     *
     * bump();bump();bump();bump();
     * // Will log 'bump' only once.
     * </pre>
     *
     * @param {Integer} count - the numer of calls required to the
     * <code>Function</code> before executing it.
     * @param {Function} delegate - the delegate to execute.
     *
     * @return a <code>Function</code> that will only execute after being
     * called <strong>count</strong> times.
     */

    /**
     * @function {static} o2.Method.once
     *
     * <p>Creates a <code>Function</code> that will only get called once.<p>
     * <p>May be useful for creating <strong>singleton</strong>
     * <code>Object</code>s, or for lazy-loading modules.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var init = o2.Method.once(function() {
     *      console.log('done');
     * });
     *
     * init();init();
     * // Will log 'done' only once.
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to execute.
     *
     * @return a <code>Function</code> that will execute only once.
     */

    /**
     * @function {static} o2.Method.times
     *
     * <p>Sequentially executes a given <code>Function</code> given amount
     * of times.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Method.times(3, function(i) {
     *   console.log(i);
     * });
     * // Will log:
     * // 0
     * // 1
     * // 2
     * </pre>
     *
     * @param {Integer} count - number of times to execute.
     * @param {Function} delegate - the <code>Function</code> to execute (in
     * the form <code>function(i, payload)</code>).
     * @param {Object} context - what should <code>this</code> refer to inside
     * the <code>Function</code>.
     * @param {Object} payload - the <code>Object</code> to pass to the
     * <strong>delegate</strong> as a second argument.
     */

    /**
     * @module   method.timer
     *
     * @requires core
     *
     * <p>A <code>Function</code> helper for timer-related actions, like
     * delaying a <code>Function</code> call.</p>
     */

    /**
     * @function o2.Method.debounce
     *
     * <p>Creates a <code>Function</code> that will not be triggered, as long as
     * it continues to get invoked within a certain time window.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var debounceAction = o2.Method.debuonce(function() {
     *      console('if you call me within a second, I will skip.');
     * }, 1000);
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to debounce.
     * @param {Integer} waitMs - the least amount of time (in milliseconds)
     * to wait between calls.
     *
     * @return the debounced <code>Function</code>.
     */

    /**
     * @function {static} o2.Method.defer
     *
     * <p>Defers a <code>Function</code> for a specified amount of time.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var deferAction = o2.Method.defer(function() {
     *      console.log('I will be delayed for 1 second');
     * }, 1000);
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to defer.
     * @param {Integer} interval - the interval to defer in milliseconds.
     * @param {Object} context - the context (this reference) to bind.
     * @param {Array} args - arguments to pass to the function.
     */

    /**
     * @function {static} o2.Method.delay
     *
     * <p>An <strong>alias</strong> to {@link o2.Method.defer}.</p>
     *
     * @see o2.Method.defer
     */

    /**
     * @function {static} o2.Method.throttle
     *
     * <p>Returns a <code>Function</code> that will execute at most once in a
     * given time window. That is to say, quick repetitive calls to the function
     * are <strong>throttled</strong>.</p>
     *
     * <p>This may be especially useful for asyncronous <strong>AJAX</strong>,
     * requests, preventing the client to bombard the server with too many
     * simultaneous requests.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Method.throttle(function() {
     *      console.log('You can call me at max once within a second');
     * }, 1000);
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to throttle.
     * @param {Integer} waitMs - the least amount of time (in milliseconds)
     * to wait between calls.
     *
     * @return the throttled <code>Function</code>.
     */

    /**
     * @module   method.transpose
     *
     * @requires core
     *
     * <p>flip/fold/merge kind of method helper that ammend/transpose
     * <code>Function</code>s.</p>
     */

    /**
     * @function {static} o2.Method.compose
     *
     * <p>Create a method that calls the <strong>invoker</strong> with the
     * return value of the evaluated function <strong>fn</strong>. The current
     * arguments are passed to <strong>fn</strong>, and the evaluated result
     * is passed to the <strong>invoker</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function double(a) { return a*2; }
     * var min = Math.min;
     * var doubleMin = o2.Method.compose(double, min);
     * var res = doubleMin(3, 5);
     * // res will be 6
     * </pre>
     *
     * @param {Function} invoker - the invoker.
     * @param {Function} delegate - the invokee.
     *
     * @return the created <code>Function</code>.
     */

    /**
     * @function {static} o2.Method.flip
     *
     * <p>Flips two arguments of the given <code>Function</code>, and returns a
     * new <code>Function</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function factor(a, b) { return a / b; }
     * var flipped = o2.Method.flip(factor, 0, 1);
     * var result = factor(5, 2) == flipped(2, 5);
     * // result will be true
     * </pre>
     *
     * @param {Function} fn - the delegate to flip arguments of.
     * @param {Integer} index1 - the index of the first argument.
     * @param {Integer} index2 - the index of the second argument.
     *
     * @return the created <code>Function</code>.
     */

    /**
     * @function {static} o2.Method.wrap
     *
     * <p>Returns the first <strong>delegate</strong> passed as an argument
     * to the second <strong>wrapper</strong> followed by the arguments of
     * the returned <code>Funciton</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function wrapper(fn, a, b) { return fn(a, b) + a + b; }
     * function delegate { return a * b; }
     * var wrapped = o2.Method.wrap(delegate, wrapper);
     *
     * var result = wrapped(3, 5);
     * // result will be 23
     * </pre>
     *
     * @param {Function} delegate - the first <code>Function</code> to pass
     * as parameter.
     * @param {Function} wrapper - the wrapper <code>Function</code>.
     *
     * @return the wrapped <code>Function</code>.
     */

    /**
     * @module   method.core
     *
     * @requires core
     *
     * <p>A <code>Function</code> helper for stuff like
     * <strong>memoization</strong>, <strong>partial functions</strong> and
     * <strong>currying</strong>.</p>
     */

        /**
         * @function {static} o2.Method.bind
         *
         * <p>Creates a <code>Function</code> that uses <strong>base</strong> as
         * the "<code>this</code>" reference.</p>
         *
         * <p><strong>bind</strong> can often be used to bind a different
         * context to a <strong>curried</strong> function.
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * function test(a,b,c){ return this.number + (a*b+c); };
         * var context = {number:10};
         * var bound = o2.Method.bind(context, test);
         * bound(20,2,10);//gives 60
         * var bound2 = o2.Method.bind(context, test, 20);
         * bound2(2, 10);//gives 60
         * </pre>
         *
         * @param {Object} base - the context of the newly created
         * <code>Function</code>.
         * @param {Function} fn - the <code>Function</code> to modify.
         * @param {Arguments} varargin - variable number of input arguments
         * to be passed as initial set of arguments.
         *
         * @return the modified <code>Function</code>.
         */

    /**
     * @function {static} o2.Method.curry
     *
     * <p>Curries the <code>Function</code>.</p>
     * <p>See http://www.dustindiaz.com/javascript-curry/ for a
     * discussion.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function test(a,b,c) { return a+b+c; }
     * var curried = o2.Method.curry(this, test, 1, 2);
     * var result = curried(3);//returns 6;
     * </pre>
     *
     * @return the modified <code>Function</code>.
     */

    /**
     * @function {static} o2.Method.identity
     *
     * <p>Just an identity function, that return what it's given without
     * changing it.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var result = o2.identity(4);
     * // result will be 4
     * </pre>
     *
     * @param {Object} value - input.
     * @return the <strong>value</strong> itself.
     */

    /**
     * @function {static} o2.Method.memoize
     *
     * <p><strong>Memoizes</strong> the given <code>Function</code>'s
     * outcome and presents it from cache, instead of recalculating.</p>
     * <p>See http://en.wikipedia.org/wiki/Memoization for details.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function multiply(a,b){return a*b; }
     * var memoized = o2.Method.memoize(multiply);
     * var result = memoized(2,3);//fresh calculation.
     * result = memoized(4,2);//fresh calculation.
     * result = memoized(2,3);//retrieve from cache.
     * </pre>
     *
     * @param {Function} fn - the <code>Function</code> to memoize.
     * @param {Object} context - what should "this" refer to.
     * @param {...} ... - variable number of input arguments to pass
     * arguments to fn.
     *
     * @return a reference to the memoized <code>Function</code>.
     */

    /**
     * @function {static} o2.Method.partial
     *
     * <p>Defines a partial <code>Function</code>.</p>
     * <p>See http://ejohn.org/blog/partial-functions-in-javascript/ for a
     * detailed discussion.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function test(a,b,c){ return a*b+c; }
     * var partial = o2.Method.partial(this, test, 10, undefined, 20);
     * var result = partial(3);//returns 50;
     * </pre>
     *
     * @param {Object} base - the context of the newly created
     * <code>Function</code>.
     * @param {Function} fn - the <code>Function</code> to modify.
     * @param {Arguments} varargin - variable number of input arguments to
     * be passed as initial set of arguments.
     *
     * @return the modified <code>Function</code>.
     */

        /**
         * @class {static} o2.Method
         *
         * <p>A method helper class.</p>
         */

    /**
     * @module   object.core
     *
     * @requires core
     * @requires collection.core
     * @requires string.core
     *
     * <p>An object/clone/copy/inheritance helper.</p>
     */

        /**
         * @class {static} o2.Object
         *
         * <p>A helper class for <strong>JavaScript</strong> <code>Object</code>
         * inheritance.</p>
         */

    /**
     * @function {static} o2.Object.copy
     *
     * <p>Copies members from <strong>base</strong> to
     * <strong>child</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var base = {lorem : 1};
     * var child = {ipsum : 2};
     * o2.Object.copy(child, base);
     * // child is now {lorem : 1, ipsum : 2}
     * </pre>
     *
     * @param {Object} child
     * @param {Object} base
     *
     * @see o2.Collection.union
     */

    /**
     * @function {static} o2.Object.copyMethods
     * <p>Copies <strong>base</strong>'s methods, to
     * <strong>child</strong>.  </p>
     * <p>Note that the methods are copied by ref. Therefore any change in
     * <strong>base</strong> object's methods will be directly reflected to
     * the <strong>child</strong> object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var child = {lorem : 1};
     * var base = {ipsum : function() {}};
     * o2.Object.copyMethods(child, base);
     * // child is now {lorem : 1, ipsum : function() {}}
     * </pre>
     *
     * @param {Object} child - the child <strong>object</strong> to copy
     * methods to.
     * @param {Object} base - the base <strong>object</strong> to copy
     * methods from.
     */

    /**
     * @function {static} o2.Object.copyPrototype
     *
     * <p>Copies every propery in <strong>base.prototype</strong>, to
     * <strong>child.prototype</strong>.</p>
     * <p>This is similar to extending <strong>child</strong>
     * to <strong>base</strong>.</p>
     * <p>Note that the methods are copied by ref. Therefore any change in
     * <strong>base</strong> object's prototype methods will be directly
     * reflected to the <strong>child</strong> object's protoype.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var Child = function() {};
     * Child.prototype.method1 = function() {};
     * var Base = function() {};
     * Base.prototype.method2 = function() {};
     * o2.Object.copyPrototype(Child, Base);
     * // Child.prototype has both method1 and method2 now.
     * </pre>
     *
     * @param {Object} child - the child <strong>object</strong> to copy
     * methods to.
     * @param {Object} base - the base <strong>object</strong> to copy
     * methods from.
     */

    /**
     * @function {static} o2.Object.extend
     *
     * <p>A simple way of extending objects.<p>
     * <p>Although the so called "object-oriented <strong>JavaScript</strong>"
     * is rarely useful and is against the <strong>functional</strong> nature of
     * the language, this helper method may be handy at times.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function Fruit() {}
     * Fruit.prototype.grow = function() {};
     * Fruit.prototype.name = 'fruit';
     *
     * function Apple() {}
     * Apple.prototype.name = 'Steve';
     *
     * o2.Object.extend(Apple, Fruit, new Fruit());
     *
     * var fruit = new Fruit();
     * var apple = new Apple();
     *
     * log(typeof apple.grow); // function
     * log(apple.constructor); // Apple
     * log(apple.parent);      // {grow: function(){}, name : 'fruit'}
     * log(apple.name);        // 'Steve'
     * log(apple.parent.name); // 'fruit'
     * </pre>
     *
     * @param {Function} childConstructor - the child object.
     * @param {Function} baseConstructor - the <code>Object</code> to extend.
     * @param {Object} baseConstructed - base object initialized to a default
     * state.
     */

    /**
     * @function {static} o2.Object.toArray
     *
     * <p>Converts a given <code>Object</code> to an <code>Array</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to convert to an
     * <code>Array</code>.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : 1, ipsum : 2};
     * var ar = o2.Object.toArray(obj);
     * // ar will be [1, 2]
     * </pre>
     *
     * @return the converted <code>Array</code>.
     *
     * @see o2.Collection.toArray
     */

    /**
     * o2.Object.toJsonString
     *
     * <p>Converts the <code>Object</code> to a <strong>JSON</strong>
     * <code>String</code>, if <strong>JSON</strong> is supported.
     * you can use 3rdparty/json2/json2.js to add cross-browser
     * <strong>JSON</strong> support.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : 1};
     * var str = o2.Object.toJsonString(obj);
     * // str will be '{"lorem":1}' (a serialized String literal)
     * </pre>
     *
     * @param {Object} obj - the <code>Object</code> to convert to a
     * <strong>JSON</strong> <code>String</code>.
     *
     * @return the converted <strong>JSON</strong> <code>String</code>.
     */

    /**
     * @function {static} o2.Object.stringify
     *
     * <p>An <strong>alias</strong> to {@link o2.Object.toJsonString}.</p>
     *
     * @see o2.Object.toJsonString
     */

    /**
     * @function {static} o2.Object.touch
     *
     * <p>Executes the delegate by passing the <strong>obj</strong> to it as a
     * parameter, then returns the <strong>obj</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : '1'};
     * o2.Object.touch(obj, function(o) {
     *   o.lorem = '3';
     * });
     * // now obj is {lorem : '3'}
     * </pre>
     *
     * @param {Object} obj - the <code>Object</code> to touch.
     * @param {Function} delegate - the delegate to execute
     * on <strong>obj</strong>.
     *
     * @return <code>null</code> if <strong>obj</strong> is falsy or it's a
     * primitive type; returns the <strong>obj</strong> itself (after applying
     * delagate to it) otherwise.
     */

    /**
     * @module   string.encode
     *
     * @requires core
     * @requires string.core
     *
     * <p>This package is responsible for encoding and decoding
     * <code>String</code>s.</p>
     */

    /**
     * @function {static} o2.String.decode
     *
     * <p>Decodes <strong>HTML</strong> entities back to normal characters.</p>
     * <p>If possible try using standard decoding methods like
     * <code>decodeURIComponent</code>, instead of using this method.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var decoded = o2.String.decode(encodedString);
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */

    /**
     * @function {static} o2.String.encode
     *
     * <p>Encodes special charaters to their corresponding <strong>HTML</strong>
     * entities.</p>
     * <p>If possible try using standard encoding methods like
     * <code>encodeURIComponent</code>,
     * instead of using this method.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var encoded = o2.String.decode(inputString);
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */

    /**
     * @function {static} o2.String.htmlEncode
     *
     * <p>An <strong>alias</strong> to {@link o2.String.encode}.</p>
     *
     * @see o2.String.encode
     */

    /**
     * @function {static} o2.String.encodeSafeHtml
     *
     * <p>Works similar to {@link o2.String.encode}.</p>
     * <p>Encodes the <code>String</code> by converting it into a text node
     * and returning the node's value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var encoded = o2.String.encodeSafeHtml(inputString);
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     *
     * @see o2.String.encode
     */

    /**
     * @function {static} o2.String.safeHtmlEncode
     *
     * <p>An <strong>alias</strong> to
     * {@link o2.String.encodeSafeHtml}.</p>
     *
     * @see o2.String.encodeSafeHtml
     */

    /**
     * @function {static} o2.String.escape
     *
     * <p>An <strong>alias</strong> to <code>encodeURIComponent</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */

    /**
     * @function {static} o2.String.unescape
     *
     * <p>An <strong>alias</strong> to <code>decodeURIComponent</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     */

    /**
     * @function {static} o2.String.xssEncode
     *
     * <p>Encodes special charaters to their corresponding <strong>HTML</strong>
     * entities. Works similar to {link String.encode}, with an
     * exception that it does not encode whitespace characters.</p>
     * <p>This method is specially designed to prevent cross-site script
     * injection attacks.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var encoded = o2.String.xssEncode(inputString);
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process
     * @param {Boolean} isAmpersandsPreserved - (Optional. Defaults to
     * <code>false</code>). If <code>true</code> & characters will not be
     * encoded, otherwise they will be.
     *
     * @return the processed <code>String</code>.
     */

    /**
     * @module   querystring.core
     *
     * @requires core
     *
     * <p>A <strong>query string</strong> parser.</p>
     */

        /**
         * @class {static} o2.QueryString
         *
         * <p>Used for parsing the browser's <strong>query string</strong>.</p>
         */
    /**
     * @function {static} o2.QueryString.encode
     *
     * <p>Converts the <strong>JSON</strong> object in parameters into a
     * query string.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var query = {lorem : 'ipsum', dolor : sit};
     * var qs = o2.QueryString.encode(query);
     * </pre>
     *
     */

    /**
     * @function {static} o2.QueryString.parse
     *
     * <p>Parses the <strong>query string</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var params = o2.QueryString.parse(window.location.href);
     * </pre>
     *
     * @param {String} url - (Optional) if given, parses the
     * <strong>URL</strong>.
     * given, parses <code>window.location.href</code> otherwise.
     *
     * @return the parsed <strong>query string</strong> as a {name1:value1,
     * name2:value2} <code>Object</code>.
     */

    /**
     * @module   string.strip
     *
     * @requires core
     *
     * <p>This package is responsible for simple <code>String</code> stripping
     * operations.</p>
     */

    /**
     * @function {static} o2.String.stripNonAlpha
     *
     * <p>Removes non alphabetical characters from the <code>String</code>
     * (excluding numbers).</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var stripped = o2.String.stripNonAlpha('abc123.!');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */

    /**
     * @function {static} o2.String.stripNonAlphanumeric
     *
     * <p>Removes alpha-numeric characters from the <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var stripped = o2.String.stripNonAlphanumeric('abc123.!');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */

    /**
     * @function {static} o2.String.stripTags
     *
     * <p>Removes tags from the <code>String</code>.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var stripped = o2.String.stripTags('<p>abc123.!</p>');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */

    /**
     * @function {static} o2.String.stripNonNumeric
     *
     * <p>Removes non-numeric characters from the <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var stripped = o2.String.stripNonNumeric('abc123.!');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */

    /**
     * @function {static} o2.String.stripNumeric
     *
     * <p>Removes numeric characters from the <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var stripped = o2.String.stripNumeric('abc123.!');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */

    /**
     * @module   string.transform
     *
     * @requires core
     *
     * <p>This package is responsible for simple <code>String</code>
     * transformation operations.</p>
     */

    /**
     * @function {static} o2.String.br2nl
     *
     * <p>Replaces HTML [br /] tags with new line.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var replaced = o2.String.br2nl('hello<br />world.');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */

    /**
     * @function {static} o2.String.nl2br
     *
     * <p>Replaces new lines [\n] with HTML [br /] tags.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var replaced = o2.String.nl2br('hello\nworld.');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */

    /**
     * @function {static} o2.String.toCamelCase
     *
     * <p>Converts the input to camel case.</p>
     * <p>i.e. if input is 'lorem-ipsum', the output is 'loremIpsum'.</p>
     * <p>This is especially useful for converting <code>CSS</code> classes
     * to their <strong>DOM</strong> style representations.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var camelized = o2.String.toCamelCase('font-family');
     * </pre>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted String.
     */

    /**
     * @function {static} o2.String.toDashedFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem-ipsum'.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var dashed = o2.String.toDashedFromCamelCase('fontFamily');
     * </pre>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted <code>String</code>.
     */

    /**
     * @function {static} o2.String.toJson
     *
     * <p>Converts the given <code>String</code> to a <strong>JSON</strong>
     * object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var parsed = o2.String.toJson('{"name" : "value"}');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to convert.
     *
     * @return the converted <strong>JSON</strong> <code>Object</code>.
     *
     * @throws Exception - if <strong>str</strong> is not a well-formed
     * <strong>JSON</strong> <code>String</code>.
     */

    /**
     * @function {static} o2.String.toUnderscoreFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem_ipsum'.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var replaced = o2.String.toUnderscoreFromCamelCase('fontFamily');
     * </pre>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted <code>String</code>.
     */

    /**
     * @function {static} o2.String.truncate
     *
     * <p>Adds an ellipsis (&hellip;), if the length of the <code>String</code>
     * is greater than <strong>maxLen</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var truncated = o2.String.truncate('This ... is a very long String.');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     * @param {Integer} maxLen - Optional (defaults TRUNCATION_LENGTH},
     * maximum <code>String</code> length that's allowed without truncation.
     *
     * @return the processed <code>String</code>.
     */

    /**
     * @module   string.core
     *
     * @requires core
     *
     * <p>A <code>String</code> helper.</p>
     */

    /**
     * @function {static} o2.String.concat
     *
     * <p>Concatanes all its arguments into a single <code>String</code>.
     * This is faster than adding those <code>String</code>s with
     * <code>+</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var joined = o2.String.concat('lorem', ipsum);
     * </pre>
     *
     * @return the concataneted <code>String</code>.
     */

    /**
     * @function {static} o2.String.format
     *
     * <p>Works similar to <strong>C#</strong>'s
     * <code>String.Format</code>.</p>
     *
     * <p>Usage example:<p>
     *
     * <pre>
     * o2.String.format("Hello {0}. What's going on in {1}?", 'Ninja',
     * 'California');
     * //will return "Hello Ninja. What's going on in California?"
     * </pre>
     *
     * @return the formated <code>String</code>.
     */

    /**
     * @function {static} o2.String.generateGuid
     *
     * <p>Creates a globally unique identifier (i.e. <strong>GUID</strong>),
     * for that browsing session.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var guid = o2.String.generateGuid();
     * </pre>
     *
     * @return a <strong>GUID</strong>.
     */

    /**
     * @function {static} o2.String.generateRandom
     *
     * <p>Generates a random <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var rnd = o2.String.generateRandom();
     * </pre>
     *
     * @param {Integer} length - (optional - default: {@link
     * String.config.constants.DEFAULT_RANDOM_LENGTH})
     * length of the <code>String</code> to be generated.
     *
     * @return the generated <code>String</code>.
     */

    /**
     * @function {static} o2.String.printf
     *
     * <p>Works similar to <strong>C</strong>'s <strong>printf</strong>
     * function.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var test1 = 'lorem %s %s sit amet';
     * var test2 = 'lorem %1:s %2:s sit %2:s amet %1:s';
     * var test3 = 'lorem %id:s ipsum';
     *
     * //This will return 'lorem ipsum dolor sit amet''
     * o2.String.printf(test1, 'ipsum', 'dolor');
     *
     * //This will return 'lorem ipsum dolor sit dolor amet ipsum'
     * o2.String.printf(test1, 'ipsum', 'dolor');
     *
     * //This will return 'lorem test ipsum'.
     * o2.String.printf(test3, {id : 'test'});
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */

    /**
     * @function {static} o2.String.printf
     *
     * <p>Works similar to <strong>C</strong>'s <strong>printf</strong>
     * function.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var test1 = 'lorem %s %s sit amet';
     * var test2 = 'lorem %1:s %2:s sit %2:s amet %1:s';
     * var test3 = 'lorem %id:s ipsum';
     *
     * //This will return 'lorem ipsum dolor sit amet''
     * o2.String.printf(test1, 'ipsum', 'dolor');
     *
     * //This will return 'lorem ipsum dolor sit dolor amet ipsum'
     * o2.String.printf(test1, 'ipsum', 'dolor');
     *
     * //This will return 'lorem test ipsum'.
     * o2.String.printf(test3, {id : 'test'});
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */

    /**
     * @function {static} o2.String.remove
     *
     * <p>Simply removes the phrases that match the <code>RegExp</code> from
     * the <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var removed = o2.String.remove('lorem', /e/ig);
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     * @param {RegExp} regExp - the <code>RegExp</code> to process against.
     *
     * @return the processed <code>String</code>.
     */

        /**
         * @function {static} o2.String.trim
         *
         * <p>Trims white space from beginning and end of the
         * <code>String</code>.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var trimmed = o2.String.trim('    lorem     ');
         * </pre>
         *
         * @param {String} str - the <code>String</code> to process.
         * @param {Boolean} shouldCompact - Optional (default:
         * <code>false</code>) if <code>true</code>, multiple whitespace
         * is compacted into single whitespace.
         *
         * @return the processed <code>String</code>.
         */

    /**
     * @function {static} o2.String.compact
     *
     * <p>Works identical to <code>String.trim(str,
     * true)</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var compacted = o2.String.compact('   lorem      ipsum     ');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     *
     * @see String.trim
     */

    /**
     * @module   template.core
     *
     * @requires core
     *
     * <p>A "very" fast templating engine.</p>
     */

        /**
         * @class {static} o2.Template
         *
         * <p>A really <strong>fast</strong> template engine.</p>
         */

    /**
     * @function {static} o2.Template.parse
     *
     * <p>Parses the given template.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var data = {
     *      users : [
     *          {name : 'Joe' },
     *          {name : 'Jill'},
     *          {name : 'Jack'}
     *      ]
     * };
     *
     * var tpl = [
     *      'ul id="Products"',
     *          ['each users',
     *              'li {{name}} /li'],
     *      '/ul'
     * ];
     *
     * var html = o2.Template.parse(data, tpl);
     * </pre>
     *
     * @param {Object} data - the source data as a <strong>JSON</strong> object.
     * @param {String} tpl - the template to parse against.
     *
     * @return {String} the parsed template.
     */

   /**
    * @module   timer.core
    *
    * @requires core
    * @requires string.core
    *
    * <p>A static class for timeout related operations.</p>
    */

        /**
         * @class {static} o2.Timer
         *
         * <p>A class for executing repeated timed actions.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * // A unique id for the timer.
         * var kCheckId = 'my_timer';
         *
         * // Auto start timer with id kCheckId to repeat doStuff approximately
         * // every 500 milliseconds, please note that this is an approximation.
         * // for further details see John Resig's excellent article on this:
         * // http://ejohn.org/blog/how-javascript-timers-work/
         * o2.Timer.set(kCheckId, doStuff, 500, {start: true, repeat: true});
         *
         * // Stops the timer (i.e. doStuff will not be executed further).
         * o2.Timer.stop(kCheckId);
         *
         * // Restarts the timer (i.e. doStuff will be periodically executed
         * // again).
         * o2.Timer.start(kCheckId);
         * </pre>
         */

    /**
     * @function {static} o2.Timer.start
     *
     * <p>Starts/restarts the timer with the given id.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Timer.start('myTimer');
     * </pre>
     *
     * @param {String} id - the id of the timer to start.
     */

    /**
     * @function {static} o2.Timer.stop
     *
     * <p>Stops the timer with the given id.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Timer.stop('myTimer');
     * </pre>
     *
     * @param {String} id - the id of the timer to stop.
     */

    /**
     * @function {static} o2.Timer.set
     *
     * <p>Sets and optionally starts a new timer.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Timer.set('myTimer', function() {
     *      console.log('hello');
     * }, 1000, {repeat : true});
     * </pre>
     *
     * @param {String} id - a unique identifier for the timer.
     * @param {Function} delegate - action to be done when the timer ticks.
     * @param {Integer} timeout - interval of the timer in milliseconds.
     * @param {Object} option - optional configuration in the form
     * <code>{start: true, repeat: true}</code>, if <strong>start</strong>
     * is <code>true</code> timer will start after being set; otherwise
     * it should be explicitly started using the
     * {@link o2.Timer.start} method. If <strong>repeat</strong> is
     * <code>false</code> the delegate will be executed only once, othwerwise
     * it will be executed at each interval until {@link o2.Timer.stop}
     * is called.
     */

    /**
     * @module   try.core
     *
     * @requires core
     *
     * <p>Used for consequentially executing a set of
     * <code>Function</code>s.</p>
     * <p>The functions are guaranteed to be called.</p>
     * <p>Even if an error occurs when calling a <code>Function</code>,
     * the next function will be tried, disregarding the error.</p>
     */

        /**
         * @class {static} o2.Try
         *
         * <p>Used for consequentially executing a set of
         * <code>Function</code>s.</p>
         * <p>The <strong>function</strong>s are guaranteed to be called.</p>
         * <p>Even if an error occurs when calling a <code>Function</code>,
         * the next <code>Function</code> will be tried, disregarding the
         * error.</p>
         */

    /**
     * @function {static} o2.Try.all
     *
     * <p>Executes all the given delegates one by one.</p>
     * <p>If an exception occurs while executing the argument, the next one
     * will be tried.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Try.all(fn1, fn2, fn3);
     * </pre>
     *
     * @param {Arguments} ... - each argument as a function.
     */

    /**
     * @function {static} o2.Try.these
     *
     * <p>Tries all the given delegates, will stop at the first successful
     * execution.</p>
     * <p>If an exception occurs while executing the argument, the next one
     * will be tried.</p>
     * <p>But after the first successful execution, with no error,
     * no further functions will be executed.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Try.these(fn1, fn2, fn3);
     * </pre>
     *
     * @param {Arguments} ... - each argument as a function.
     */
