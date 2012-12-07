/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */

/**
 * Root namespace &ndash; magic goes here ;)
 * @namespace o2
 */

/*
 * Used in <code>o2.noConflict</code>.
 */
(function(window) {
    'use strict';

    var kCache     = '_o2_cached',
        kFramework = 'o2';

    if (window[kFramework]) {
        window[kCache] = window[kFramework];

        return;
    }

    window[kFramework] = {isProduction : false};
}(this));

/**
 * @module core.meta
 *
 * <p>Meta information.</p>
 */
(function(framework, window) {
    'use strict';

    function log() {
        try {window.console.log(arguments);} catch(ignore){}
    }

        /*
         * # Common Constants
         */

    var kAny    = '*',
        kEmpty  = '',
        kObject = 'object',
        kString = 'string',

        /*
         * # Warning Messages
         */

        kDelegateNotdefined   =
            'framework.protecteds: Delegate is undefined: ',
        kMethodAlreadyDefined =
            'framework.protecteds: Method name is already defined: ',
        kMethodNameNotString  =
            'framework.protecteds: "method" should be  a String.',
        kNameNotProvided      =
            'framework.protecteds: name not provided',
        kNoMetaDefinition     =
            'framework.protecteds: no meta definition.',
        kObjectNotDefined     =
            'framework.protecteds: Object not found in mixed collection',
        kObjNameNotString     =
            'framework.protecteds: "name" should be a String.',
        kRootNotFound         =
            'framework.protecteds: root not found for',

        /*
         * # Module Names
         */

        kCore                = 'core',
        kExtend              = 'extend',
        kAjaxCore            = 'ajax.core',
        kAjaxExtend          = 'ajax.extend',
        kAjaxControllerCore  = 'ajaxcontroller.core',
        kAjaxStateCore       = 'ajaxstate.core',
        kCollectionCore      = 'collection.core',
        kCookieCore          = 'cookie.core',
        kDebuggerCore        = 'debugger.core',
        kDateCore            = 'date.core',
        kDomCore             = 'dom.core',
        kDomConstants        = 'dom.constants',
        kDomClass            = 'dom.class',
        kDomDimension        = 'dom.dimension',
        kDomForm             = 'dom.form',
        kDomLoad             = 'dom.load',
        kDomModify           = 'dom.modify',
        kDomReady            = 'dom.ready',
        kDomScroll           = 'dom.scroll',
        kDomTraverseChild    = 'dom.traverse.child',
        kDomTraverseChildren = 'dom.traverse.children',
        kDomTraverseCore     = 'dom.traverse.core',
        kDomTraverseEnds     = 'dom.traverse.ends',
        kDomTraverseNext     = 'dom.traverse.next',
        kDomTraverseNth      = 'dom.traverse.nth',
        kDomTraverseParent   = 'dom.traverse.parent',
        kDomTraversePrev     = 'dom.traverse.prev',
        kDomTraverseSiblings = 'dom.traverse.siblings',
        kDomTraverseValidate = 'dom.traverse.validate',
        kDomStyle            = 'dom.style',
        kEventConstants      = 'event.constants',
        kEventCore           = 'event.core',
        kEventExtend         = 'event.extend',
        kEventCustom         = 'event.custom',
        kJsonpCore           = 'jsonp.core',
        kJsonpControllerCore = 'jsonpcontroller.core',
        kJsonpStateCore      = 'jsonpstate.core',
        kMethodCore          = 'method.core',
        kMethodEvent         = 'method.event',
        kMethodInherit       = 'method.inherit',
        kMethodRepeat        = 'method.repeat',
        kMethodTimer         = 'method.timer',
        kMethodTranspose     = 'method.transpose',
        kObjectCore          = 'object.core',
        kQueryStringCore     = 'querystring.core',
        kSortDelegateCore    = 'sortdelegate.core',
        kStringCore          = 'string.core',
        kStringEncode        = 'string.encode',
        kStringStrip         = 'string.strip',
        kStringTransform     = 'string.transform',
        kSupportsCore        = 'supports.core',
        kTemplateCore        = 'template.core',
        kTimerCore           = 'timer.core',
        kTryCore             = 'try.core',
        kUnitCore            = 'unit.core',
        kValidationCore      = 'validation.core',
        kValidationRegExp    = 'validation.regexp',
        kCoreMeta            = 'core.meta',

        /*
         * # To be Overridden
         */

        fp           = null,
        classes      = null,
        modules      = null;

    /*
     *
     */
    function dbg() {

        // We need to stop execution and observe what went wrong if an invalid
        // assignment happens while construcing the framework. The only way we
        // can achieve this is using the "debugger;" statement. And if we do not
        // encapsulate the "debugger;" statement with "eval", YUICompressor
        // whines about it and does not compress the code.
        //
        // Also JSLint, rightfully, warns about the below eval usage, but
        // there's no other way around.
        //
        // All in all, "eval is 'evil'; and the below ("eval('debugger');")
        // decleration is a rare and legitimate usage of that evil ;)
        eval('debugger');
    }

    /*
     *
     */
    function init(root, key, value) {
        if (!root || typeof root !== kObject) {return null;}
        if (root[key]                       ) {return root[key];}

        root[key] = value;

        return root[key];
    }

    /*
     * Creates a namespace if it does not exists and returns it;
     * returns the existing namespace otherwise.
     */
    function namespace(root, key) {
        log('namespace', arguments);

        if (!root || typeof root !== kObject) {return null;}

        return init(root, key, {});
    }

    /*
     * @namespace {protected static} o2.protecteds
     *
     * <p>A namespace to contain all the <strong>protected</strong> methods
     * of the <code>o2</code> object.</p>
     *
     * <p><strong>protected</strong> in a sense that only this module
     * (<em>o2.core</em>), and friends of this module (<em>the entire suite of
     * <strong>o2.*</strong> modules</em>) can access this namespace.
     * <strong>static</strong>, meaning that you don't need to
     * instantiate anything to access this namespace.</p>
     */
    fp = init(framework, 'protecteds', {});

    /*
     * @property {protected static Object} o2.protecteds.classes
     *
     * <p><strong>Caution:<strong> Highly explosive! Do not mess with it
     * unless you know what you are doing <strong>;)</strong></p>
     *
     * <p>This is a meta-level overview of the <strong>o2.js</strong>
     * framework Any public class and method that <strong>o2.js</strong> uses is
     * listed here.</p>
     *
     * <p>This list is used for constructing classes at script's
     * <strong>evaluation time</strong>, and it's not used afterwards.
     * Therefore, changing the list after the scripts are loaded will have
     * no effect at all.</p>
     *
     * <p>This structure is especially useful while running automated unit
     * tests and checking the consistency of the overall framework.</p>
     */
    classes  = init(fp, 'classes', {});

    /*
     *
     */
    function getClassNotDefinedWarning(name) {
        return ['framework.protecteds: Class "', name,
            '" is not defined yet.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getMethodNotDefinedInMetaWarning(name) {
        return ['framework.protecteds: Method "', name,
            '" is not found in framework meta definition'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getMethodNotDefinedInFrameworkWarning(name) {
        return ['framework.protecteds: method  "', name,
            '" does not exist in framework.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getClassNotDefinedInMetaWarning(name) {
        return ['framework.protecteds: Class "', name,
            '" is not defined in meta definition.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getMethodOfClassNotDefinedInMetaWarning(name, method) {
        return ['framework.protecteds: Class "', name,
            '" does not have a method "', method,
            '" defined in meta definition.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getClassDoesNotExistWarning(name) {
        return ['framework.protecteds: Class "', name,
            '" does not currently exist.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getMethodOfClassDoesNotExistWarning(name, method) {
        return ['framework.protecteds: Class "', name,
            '" does not have a method "', method,
            '" defined.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getRootDoesNotHaveAttributeWarning(name) {
        return ['framework.protecteds: ',
            'root does not have an attribute "', name, '".'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getConstructorAlreadyDefinedWarning(name) {
        return ['framework.protecteds: Constructor "',
            name, '" is already defined.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getNoMethodToOverrideWarning(name) {
        return ['framework.protecteds: No method "',
            name, '" to override.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getIncorrectMetaDefinitionWarning(name) {
        return ['framework.protecteds: Incorrect meta definition for "',
            name, '".'
        ].join(kEmpty);
    }

    /*
     *
     */
    function addItems(moduleName, moduleIdentifier, itemList) {
        var inheritance = moduleName.split(/>/),
            module      = init(classes, inheritance[0], {}),
            items       = null,
            i           = 0,
            len         = 0;

        if (inheritance.length > 1) {
            init(module, 'base', inheritance[1]);
        }

        items = init(module, 'items', {});

        for (i = 0, len = itemList.length; i < len; i++) {
            items[itemList[i]] = {MODULE : moduleIdentifier};
        }
    }

    /*
     *
     */
    function defineMetaData() {
        var i   = 0,
            len = 0;

        for (i = 0, len = arguments.length; i < len; i++) {
            addItems.apply(null, arguments[i]);
        }
    }

    // Define meta data for automated unit tests:
    defineMetaData([
        'o2', kCore, [
            '$', 'build', 'load', 'longName', 'name', 'nill', 'noConflict',
            'now', 'ready', 'url', 'version'
    ]],[
        'o2', kExtend, [
            'n', 'nn', 't', 'tt'
    ]],[
        'Ajax', kAjaxCore, [
            'abort', 'createXhr', 'get', 'post'
    ]],[
        'Ajax', kAjaxExtend, [
            'getSingle', 'postSingle'
    ]],[
        'AjaxController', kAjaxControllerCore, [
            'unregister', 'update'
    ]],[
        'AjaxState', kAjaxStateCore, [
            'protecteds',

            'addObserver', 'countObservers',
            'deleteObserver', 'deleteObservers',
            'init', 'timeoutObservers', 'timeoutAllObservers'
    ]],[
        'Collection', kCollectionCore, [
            'any', 'clear', 'clone', 'compact', 'contains', 'copy', 'detect',
            'diff', 'each', 'every', 'exclude', 'extend', 'filter', 'find',
            'flatten', 'fold', 'foldR', 'forEach', 'getCount', 'getDifference',
            'getFirst', 'getFirstN', 'getFunctions', 'getKeys', 'getLast',
            'getLastN', 'getLength', 'getMax', 'getMethods', 'getMin',
            'getRest', 'getSize', 'getSortedIndex', 'getValues', 'grep',
            'group', 'inArray', 'includes', 'indexOf', 'intersect', 'invoke',
            'isEmpty', 'lastIndexOf', 'map', 'merge', 'pluck', 'reduce',
            'reduceRight', 'reject', 'removeElement', 'removeElementByValue',
            'select', 'shuffle', 'some', 'sort', 'touch', 'toArray', 'union',
            'unique', 'zip'
    ]],[
        'Cookie', kCookieCore, [
            'read', 'remove', 'save'
    ]],[
        'Debugger', kDebuggerCore, [
            'assert', 'error', 'info', 'init', 'log', 'println', 'warn'
    ]],[
        'Date', kDateCore, [
            'getPrettyDate', 'getTime', 'now'
    ]],[
        'Dom', kDomConstants, [
            'nodeType'
    ]],[
        'Dom', kDomCore, [
            'protecteds',

            'append', 'create', 'createDocumentFragment', 'createElement',
            'empty', 'getAttribute', 'getHtml', 'getText', 'insertAfter',
            'insertBefore', 'isDocument', 'isElement', 'isNode', 'prepend',
            'remove', 'removeChildren', 'removeEmpty', 'removeEmptyTextNodes',
            'removeNode', 'setAttribute', 'setHtml'
    ]],[
        'Dom', kDomClass, [
            'addClass', 'createClassNameRegExp', 'hasClass',
            'removeClass', 'toggleClass'
    ]],[
        'Dom', kDomDimension, [
            'getDimension', 'getDocumentDimension', 'getDocumentHeight',
            'getDocumentWidth', 'getHeight', 'getViewportInfo',
            'getWidth', 'getWindowInnerDimension', 'getWindowInnerHeight',
            'getWindowInnerWidth', 'setDimension', 'setHeight', 'setWidth'
    ]],[
        'Dom', kDomForm, [
            'compactField', 'disable', 'preventMultipleSubmit',
            'removePlaceholder', 'resetField', 'trimField'
    ]],[
        'Dom', kDomLoad, [
            'loadCss', 'loadImage', 'loadScript'
    ]],[
        'Dom', kDomModify, [
            'replace', 'unwrap', 'wrap'
    ]],[
        'Dom', kDomReady, [
            'ready'
    ]],[
        'Dom', kDomScroll, [
            'getObjectScrollOfset', 'getScrollOffset', 'getWindowScrollOffset',
            'scrollObjectToBottom', 'scrollObjectToTop', 'scrollTo',
            'scrollToObject', 'scrollWindowToBottom', 'scrollWindowToObject',
            'scrollWindowToTop'
    ]],[
        'Dom', kDomStyle, [
            'activateAlternateStylesheet', 'addCssRules', 'addStyle', 'getCss',
            'getStyle', 'hide', 'isVisible', 'setCss', 'setStyle', 'show',
            'toggleVisibility'
    ]],[
        'Dom', kDomTraverseCore, [
            'getElements', 'getElementsByAttribute', 'getElementsByClass',
            'getElementsWithAttribute', 'getElementsWithClass',
            'getElementsWithId'
    ]],[
        'Dom', kDomTraverseEnds, [
            'getFirst', 'getFirstByAttribute', 'getFirstByClass',
            'getFirstWithAttribute', 'getFirstWithClass', 'getFirstWithId',

            'getLast', 'getLastByAttribute', 'getLastByClass', 'getLastWithId',
            'getLastWithAttribute', 'getLastWithClass'
    ]],[
        'Dom', kDomTraverseChildren, [
            'getChildren', 'getChildrenByAttribute',
            'getChildrenByAttributeUntil', 'getChildrenByClass',
            'getChildrenByClassUntil', 'getChildrenUntil',
            'getChildrenWithAttribute', 'getChildrenWithAttributeUntil',
            'getChildrenWithClass', 'getChildrenWithClassUntil',
            'getChildrenWithId', 'getChildrenWithIdUntil'
    ]],[
        'Dom', kDomTraverseChild, [
            'getFirstChild', 'getFirstChildByAttribute', 'getFirstChildByClass',
            'getFirstChildWithAttribute', 'getFirstChildWithClass',
            'getFirstChildWithId',

            'getLastChild', 'getLastChildByAttribute', 'getLastChildByClass',
            'getLastChildWithAttribute', 'getLastChildWithClass',
            'getLastChildWithId',

            'getNthChild', 'getNthChildByAttribute', 'getNthChildByClass',
            'getNthChildWithAttribute', 'getNthChildWithClass',
            'getNthChildWithId'
    ]],[
        'Dom', kDomTraverseNext, [
            'getNext', 'getNextByAttribute', 'getNextByClass',
            'getNextWithAttribute', 'getNextWithClass', 'getNextWithId',

            'getNextAll', 'getNextAllByAttribute', 'getNextAllByAttributeUntil',
            'getNextAllByClass', 'getNextAllByClassUntil', 'getNextAllUntil',
            'getNextAllWithAttribute', 'getNextAllWithAttributeUntil',
            'getNextAllWithClass', 'getNextAllWithClassUntil',
            'getNextAllWithId', 'getNextAllWithIdUntil'
    ]],[
        'Dom', kDomTraverseNth, [
            'getNth', 'getNthByAttribute', 'getNthByClass',
            'getNthWithAttribute', 'getNthWithClass', 'getNthWithId',

            'getNthNext', 'getNthNextByAttribute', 'getNthNextByClass',
            'getNthNextWithAttribute', 'getNthNextWithClass',
            'getNthNextWithId',

            'getNthPrev', 'getNthPrevByAttribute', 'getNthPrevByClass',
            'getNthPrevWithAttribute', 'getNthPrevWithClass',
            'getNthPrevWithId',

            'getNthParent', 'getNthParentByAttribute', 'getNthParentByClass',
            'getNthParentWithAttribute', 'getNthParentWithClass',
            'getNthParentWithId'
    ]],[
        'Dom', kDomTraverseParent, [
            'getParent', 'getParentByAttribute', 'getParentByClass',
            'getParentWithAttribute', 'getParentWithClass', 'getParentWithId',
            'getParents', 'getParentsByAttribute', 'getParentsByAttributeUntil',
            'getParentsByClass', 'getParentsByClassUntil', 'getParentsUntil',
            'getParentsWithAttribute', 'getParentsWithAttributeUntil',
            'getParentsWithClass', 'getParentsWithClassUntil',
            'getParentsWithId', 'getParentsWithIdUntil'
    ]],[
        'Dom', kDomTraversePrev, [
            'getPrev', 'getPrevByAttribute', 'getPrevByClass',
            'getPrevWithAttribute', 'getPrevWithClass', 'getPrevWithId',
            'getPrevAll', 'getPrevAllByAttribute', 'getPrevAllByAttributeUntil',
            'getPrevAllByClass', 'getPrevAllByClassUntil', 'getPrevAllUntil',
            'getPrevAllWithAttribute', 'getPrevAllWithAttributeUntil',
            'getPrevAllWithClass', 'getPrevAllWithClassUntil',
            'getPrevAllWithId', 'getPrevAllWithIdUntil'
    ]],[
        'Dom', kDomTraverseSiblings, [
            'getSiblings', 'getSiblingsByAttribute',
            'getSiblingsByAttributeUntil', 'getSiblingsByClass',
            'getSiblingsByClassUntil', 'getSiblingsUntil',
            'getSiblingsWithAttribute', 'getSiblingsWithAttributeUntil',
            'getSiblingsWithClass', 'getSiblingsWithClassUntil',
            'getSiblingsWithId', 'getSiblingsWithIdUntil'
    ]],[
        'Dom', kDomTraverseValidate, [
            'isChild', 'isNext', 'isParent', 'isParentOrSelf', 'isPrev',
            'isSibling',

            'isAttributeEquals', 'hasIdAttribute', 'hasClassAttribute',
            'hasAttribute', 'hasClassName', 'isNodeEquals'
    ]],[
        'Event', kEventConstants, [
            'keyCode'
    ]],[
        'Event', kEventCore, [
            'addEventListener', 'addEventListeners', 'getEventObject',
            'getKeyCode', 'getMouseCoordinates', 'getTarget', 'off', 'on',
            'preventDefault', 'removeEventListener', 'stopPropagation'
    ]],[
        'Event', kEventExtend, [
            'isArrowKey', 'isBackspaceKey', 'isCharacterKeypressEvent',
            'isEnterKey', 'isEscapeKey', 'isRightClick', 'isTabKey'
    ]],[
        'Event', kEventCustom, [
            'publish', 'subscribe', 'unsubscribe'
    ]],[
        'Jsonp', kJsonpCore, [
            'get'
    ]],[
        'JsonpController>AjaxController', kJsonpControllerCore, [
            'update', 'unregister'
    ]],[
        'JsonpState>AjaxState', kJsonpStateCore, [
            'protecteds',

            // Overrides:
            'update', 'unregister'
    ]],[
        'Method', kMethodCore, [
            'bind', 'curry', 'identity', 'memoize', 'partial'
    ]],[
        'Method', kMethodEvent, [
            'bindAsEventListener'
    ]],[
        'Method', kMethodInherit, [
            'overload', 'requireAllArguments'
    ]],[
        'Method', kMethodRepeat, [
            'after', 'once', 'times'
    ]],[
        'Method', kMethodTimer, [
            'debounce', 'defer', 'delay', 'throttle'
    ]],[
        'Method', kMethodTranspose, [
            'compose', 'flip', 'wrap'
    ]],[
        'Object', kObjectCore, [
            'copy', 'copyMethods', 'copyPrototype', 'extend', 'stringify',
            'toArray', 'toJsonString', 'touch'
    ]],[
        'QueryString', kQueryStringCore, [
            'encode', 'parse'
    ]],[
        'SortDelegate', kSortDelegateCore, [
            'sort', 'sortAsc', 'sortDesc'
    ]],[
        'String', kStringCore, [
            'compact', 'concat', 'format', 'generateGuid', 'generateRandom',
            'printf', 'remove', 'trim'
    ]],[
        'String', kStringEncode, [
            'decode', 'encode', 'encodeSafeHtml', 'escape', 'htmlEncode',
            'safeHtmlEncode', 'unescape', 'xssEncode'
    ]],[
        'String', kStringStrip, [
            'stripNonAlpha', 'stripNonAlphanumeric', 'stripTags',
            'stripNumeric', 'stripNonNumeric'
    ]],[
        'String', kStringTransform, [
            'br2nl', 'nl2br', 'toCamelCase', 'toDashedFromCamelCase',
            'toJson', 'toUnderscoreFromCamelCase', 'truncate'
    ]],[
        'Supports', kSupportsCore, [
            'ajax', 'cookie', 'dom'
    ]],[
        'Template', kTemplateCore, [
            'parse'
    ]],[
        'Timer', kTimerCore, [
            'set', 'start', 'stop'
    ]],[
        'Try', kTryCore, [
            'all', 'these'
    ]],[
        'Unit', kUnitCore, [
            'add', 'assert', 'assertEqual', 'assertNotEqual',
            'assertStrictEqual', 'assertStrictNotEqual',
            'getGlobalFailureCount', 'getGlobalSuccessCount',
            'isRunning', 'log', 'run'
    ]],[
        'Validation', kValidationCore, [
            'is', 'isArguments', 'isArray', 'isBoolean', 'isDate',
            'isFunction', 'isNaN', 'isNull', 'isNumber', 'isNumeric',
            'isObject', 'isRegExp', 'isString', 'isUndefined', 'isWindow'
    ]],[
        'Validation', kValidationRegExp, [
            'isEmail', 'isUrl', 'isWhitespace'
    ]]);


    //TODO: complete me.
    modules = init(fp, 'dependencies');

//    /*
//     *
//     */
//    function depend(baseModuleName, dependencies) {
//        log('depend', arguments);
//
//        init(modules, baseModuleName,
//            {dependencies:dependencies, isLoaded:false}
//        );
//    }

    //TODO: complete me.
    //TODO: make an automated runner.
    //TODO: raise a 'dependency not loaded error if it is so.
//no need- 1. load all files to the runner. dep tree is auto created
//from ensures, then runner runs tests.
//    depend(kCoreMeta,     []);
//    depend(kCore,         [kCoreMeta]);
//    depend(kTemplateCore, [kCore]);

    // The methods below are <em>internal</em> methods that are used
    // to ensure consistency within the framework.
    // They are not meant for external use.

    /*
     *
     */
    init(fp, 'alias', function(mixed, aliasName, existingName) {
        if (!mixed) {
            log('alias', arguments);

            dbg();

            throw kNoMetaDefinition;
        }

        if (!mixed[1]) {
            log('alias', arguments);

            dbg();

            throw kObjectNotDefined;
        }

        if (!mixed[0][existingName]) {
            log('alias', arguments);

            dbg();

            throw getMethodNotDefinedInMetaWarning(existingName);
        }

        if (!mixed[0][aliasName]) {
            log('alias', arguments);

            dbg();

            throw getMethodNotDefinedInMetaWarning(aliasName);
        }

        if (mixed[1][aliasName]) {
            log('alias', arguments);

            dbg();

            throw [kMethodAlreadyDefined, aliasName].join(kEmpty);
        }

        mixed[1][aliasName] = mixed[1][existingName];
    });

    /*
     *
     */
    init(fp, 'create', function(name) {
        var cls = fp.classes[name];

        if (!cls) {
            log('create', arguments);

            dbg();

            throw getClassNotDefinedInMetaWarning(name);
        }

        if (!cls.items) {
            log('create', arguments);

            dbg();

            throw getIncorrectMetaDefinitionWarning(name);
        }

        return [cls.items, namespace(framework, name)];
    });

    /*
     *
     */
    init(fp, 'construct', function(name, delegate) {
        var cls = fp.classes[name];

        if (!cls) {
            log('construct', arguments);

            dbg();

            throw getClassNotDefinedInMetaWarning(name);
        }

        if (framework[name]) {
            log('construct', arguments);

            dbg();

            throw getConstructorAlreadyDefinedWarning(name);
        }

        framework[name] = delegate;

        return [cls.items, delegate];
    });

    /*
     *
     */
    init(fp, 'define', function(mixed, name, fn) {
        var meta = mixed[0],
            me   = mixed[1];

        if (!me) {
            log('define', arguments);

            dbg();

            throw kObjectNotDefined;
        }

        if (!fn) {
            log('define', arguments);

            dbg();

            throw [kDelegateNotdefined, name].join(kEmpty);
        }

        if (!meta) {
            log('define', arguments);

            dbg();

            throw kNoMetaDefinition;
        }

        if (meta[name]) {
            if (me[name]) {
                log('define', arguments);

                dbg();

                throw [kMethodAlreadyDefined, name].join(kEmpty);
            }

            me[name] = fn;
        }

        //TODO: handle if no meta[name]
        //if the name does not exist in the meta data, then you
        //cannot define it.
    });

//TODO: add documentation to these protected methods, they are
//harder to fully understand from outside.

    /*
     *
     */
    init(fp, 'getAttr', function(root, name) {
        if (!root) {
            log('getAttr', arguments);

            dbg();

            throw [kRootNotFound, ' "', name, '"'].join(kEmpty);
        }

        if (!name) {
            log('getAttr', arguments);

            dbg();

            throw kNameNotProvided;
        }

        var elem = root[name];

        if (!elem) {
            log('getAttr', arguments);

            dbg();

            throw getRootDoesNotHaveAttributeWarning(name);
        }

        return elem;
    });

    /*
     *
     */
    init(fp, 'getObject', function(mixed) {
        return mixed[1];
    });

    /*
     *
     */
    init(fp, 'getRoot', function() {
        return [fp.classes.o2.items, framework];
    });

    /*
     *
     */
    init(fp, 'override', function(mixed, methodName, fn) {
        var meta = mixed[0],
            me   = mixed[1];

        if (!me) {
            log('override', arguments);

            dbg();

            throw 'Object not found in mixed collection';
        }

        if (!fn) {
           log('override', arguments);

            dbg();

            throw [kDelegateNotdefined, methodName].join(kEmpty);
        }

        if (!meta[methodName]) {
            log('override', arguments);

            dbg();

            throw getClassNotDefinedInMetaWarning(methodName);
        }

        if (!me.prototype[methodName]) {
            log('override', arguments);

            dbg();

            throw getNoMethodToOverrideWarning(methodName);
        }

        me.prototype[methodName] = fn;
    });

    /*
     *
     */
    init(fp, 'proto', function(mixed, methodName, fn) {
        var meta = mixed[0],
            me   = mixed[1];

        if (!me) {
            log('proto', arguments);

            dbg();

            throw kObjectNotDefined;
        }

        if (!fn) {
            log('proto', arguments);

            dbg();

            throw [kDelegateNotdefined, methodName].join(kEmpty);
        }

        if (!meta[methodName]) {
            log('proto', arguments);

            dbg();

            throw getMethodOfClassNotDefinedInMetaWarning(kAny, methodName);
        }

        if (me.prototype[methodName]) {
            log('proto', arguments);

            dbg();

            throw [kMethodAlreadyDefined, methodName].join(kEmpty);
        }

        me.prototype[methodName] = fn;
    });

    /*
     *
     */
    init(fp, 'require', function(name, method) {
        var methodName = kEmpty,
            objName    = kEmpty,
            meta       = null,
            classes    = fp.classes,
            result     = null,
            cls        = null,
            mtd        = null,
            obj        = null,
            theMethod  = null;

        if (arguments.length === 1) {
            methodName = name;
            objName = kEmpty;
        } else {
            methodName = method;
            objName = name;
        }

        if (typeof objName !== kString) {
            log('require', arguments);

            dbg();

            throw kObjNameNotString;
        }

        if (typeof methodName !== kString) {
            log('require', arguments);

            dbg();

            throw kMethodNameNotString;
        }

        if (objName === kEmpty) {
            if (classes.hasOwnProperty(methodName)) {
                result = framework[methodName];

                if (!result) {
                    log('require', arguments);

                    dbg();

                    throw getClassNotDefinedWarning(methodName);
                }

                return result;
            }

            meta = classes.o2.items;

            if (!meta[methodName]) {
                log('require', arguments);

                dbg();

                throw getMethodNotDefinedInMetaWarning(methodName);
            }

            result = framework[methodName];

            if (!result) {
                log('require', arguments);

                dbg();

                throw getMethodNotDefinedInFrameworkWarning(methodName);
            }

            return result;
        }

        cls = classes[objName];

        if (!cls) {
            log('require', arguments);

            dbg();

            throw getClassNotDefinedInMetaWarning(objName);
        }

        mtd = cls.items[methodName];

        if (!mtd) {
            log('require', arguments);

            dbg();

            throw getMethodOfClassNotDefinedInMetaWarning(objName,
                methodName);
        }

        obj = framework[objName];

        if (!obj) {
            log('require', arguments);

            dbg();

            throw getClassDoesNotExistWarning(objName);
        }

        theMethod = obj[methodName];

        if (!theMethod) {
            log('require', arguments);

            dbg();

            throw getMethodOfClassDoesNotExistWarning(objName, methodName);
        }

        return theMethod;
    });

    var objectGraph        = {};
    objectGraph[kCoreMeta] = {};

    /*
     *
     */
    init(fp, 'ensure', function(base, dependencies) {

        var i          = 0,
            len        = 0,
            dependency = null;

        objectGraph[base] = objectGraph[base] || {};

        for (i = 0, len = dependencies.length; i < len; i++) {
            dependency = dependencies[i];

            objectGraph[base][dependency] = {};

            if (!objectGraph[dependency]) {
                log('ensure', arguments);

                dbg();

                //TODO: to constants
                throw 'Dependency "' +
                    dependency + '" is not satisfied for "' + base + '".';
            }
        }
    });

    init(fp, 'graph', function() {
        return objectGraph;
    });
}(this.o2, this));
