/**
 * Root namespace &ndash; magic goes here ;)
 * @namespace o2
 */
this.o2 = this.o2 || {
    isProduction : false
};

/**
 * @module core.meta
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-29 08:18:08.993166
 * -->
 *
 * <p>Meta information.</p>
 */
(function(framework) {
    'use strict';

    /*
     * Common Constants
     */

    var kAny    = '*';
    var kEmpty  = '';
    var kObject = 'object';
    var kString = 'string';

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
        if (!root || typeof root !== kObject) {
            return null;
        }

        if (root[key]) {
            return root[key];
        }

        root[key] = value;

        return root[key];
    }

    /*
     * Creates a namespace if it does not exists and returns it;
     * returns the existing namespace otherwise.
     */
    function namespace(root, key) {
        if (!root || typeof root !== kObject) {
            return null;
        }

        return init(root, key, {});
    }

    var fp = init(framework, 'protecteds', {});

    /*
     *
     */
    var isProduction = framework.isProduction;

    /*
     * @property {protected Object} o2.protecteds.classes
     *
     * <p><storng>Caution:<strong> Highly explosive! Do not mess with it
     * unless you know what you are doing <strong>;)</strong></p>
     *
     * <p>This is a meta-level overview of the <strong>o2.js</strong>
     * framework Any public class and method that <strong>o2.js</storng> uses is
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

    var kDelegateNotdefined   = 'framework.protecteds: Delegate is undefined: ';
    var kMethodAlreadyDefined = 'framework.protecteds: Method name is undefined : ';
    var kMethodNameNotString  = 'framework.protecteds: "method" should be  a String.';
    var kNameNotProvided      = 'framework.protecteds: name not provided';
    var kNoMetaDefinition     = 'framework.protecteds: no meta definition.';
    var kObjectNotDefined     = 'framework.protecteds: Object not found in mixed collection';
    var kObjNameNotString     = 'framework.protecteds: "name" should be  a String.';
    var kRootNotFound         = 'framework.protecteds: root not found';

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
        return ['framework.protecteds: Method"', name,
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
            '"" defined in meta definition.'
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
            '"" defined.'
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
     * These constants save some space during minification:
     */
     var kAjaxControllerCore    = 'ajaxcontroller.core';
     var kAjaxCore              = 'ajax.core';
     var kAjaxExtend            = 'ajax.extend';
     var kAjaxStateCore         = 'ajaxstate.core';
     var kCollectionHelperCore  = 'collectionhelper.core';
     var kCookieCore            = 'cookie.core';
     var kCore                  = 'core';
     var kDebuggerCore          = 'debugger.core';
     var kDateHelperCore        = 'datehelper.core';
     var kDomHelperClass        = 'domhelper.class';
     var kDomHelperConstants    = 'domhelper.constants';
     var kDomHelperCore         = 'domhelper.core';
     var kDomHelperDimension    = 'domhelper.dimension';
     var kDomHelperForm         = 'domhelper.form';
     var kDomHelperLoad         = 'domhelper.load';
     var kDomHelperModify       = 'domhelper.modify';
     var kDomHelperReady        = 'domhelper.ready';
     var kDomHelperScroll       = 'domhelper.scroll';
     var kDomHelperStyle        = 'domhelper.style';
     var kDomHelperTraverse     = 'domhelper.traverse';
     var kEventHandlerConstants = 'eventhandler.constants';
     var kEventHandlerCore      = 'eventhandler.core';
     var kEventHandlerExtend    = 'eventhandler.extend';
     var kExtend                = 'extend';
     var kFormHelperCore        = 'formhelper.core';
     var kJsonpCore             = 'jsonp.core';
     var kJsonpControllerCore   = 'jsonpcontroller.core';
     var kJsonpStateCore        = 'jsonpstate.core';
     var kMethodHelperCore      = 'methodhelper.core';
     var kMethodHelperEvent     = 'methodhelper.event';
     var kMethodHelperInherit   = 'methodhelper.inherit';
     var kMethodHelperRepeat    = 'methodhelper.repeat';
     var kMethodHelperTimer     = 'methodhelper.timer';
     var kMethodHelperTranspose = 'methodhelper.transpose';
     var kObjectHelperCore      = 'objecthelper.core';
     var kQueryParserCore       = 'queryparser.core';
     var kSortDelegateCore      = 'sortdelegate.core';
     var kStringHelperCore      = 'stringhelper.core';
     var kStringHelperEncode    = 'stringhelper.encode';
     var kStringHelperStrip     = 'stringhelper.strip';
     var kStringHelperTransform = 'stringhelper.transform';
     var kSupportsCore          = 'supports.core';
     var kTemplateCore          = 'template.core';
     var kTimerCore             = 'timer.core';
     var kTryCore               = 'try.core';
     var kUnitCore              = 'unit.core';
     var kValidatorCore         = 'validator.core';
     var kValidatorRegExp       = 'validator.regexp';

     init(fp, 'classes', {
        o2 : {
            items : {
                $          : {MODULE : kCore},
                build      : {MODULE : kCore},
                load       : {MODULE : kCore},
                longName   : {MODULE : kCore},
                name       : {MODULE : kCore},
                nill       : {MODULE : kCore},
                noConflict : {MODULE : kCore},
                now        : {MODULE : kCore},
                ready      : {MODULE : kCore},
                url        : {MODULE : kCore},
                version    : {MODULE : kCore},

                n  : {MODULE : kExtend},
                nn : {MODULE : kExtend},
                t  : {MODULE : kExtend},
                tt : {MODULE : kExtend}

            }
        },
        Ajax : {
            items : {
                 abort     : {MODULE : kAjaxCore},
                 createXhr : {MODULE : kAjaxCore},
                 get       : {MODULE : kAjaxCore},
                 post      : {MODULE : kAjaxCore},

                 getSingle  : {MODULE : kAjaxExtend},
                 postSingle : {MODULE : kAjaxExtend}
            }
        },
        AjaxController : {
            items : {
                unregister : {MODULE : kAjaxControllerCore},
                update     : {MODULE : kAjaxControllerCore}
            }
        },
        AjaxState : {
            items : {
                protecteds          : {MODULE : kAjaxStateCore},

                addObserver         : {MODULE : kAjaxStateCore},
                countObservers      : {MODULE : kAjaxStateCore},
                deleteObserver      : {MODULE : kAjaxStateCore},
                deleteObservers     : {MODULE : kAjaxStateCore},
                init                : {MODULE : kAjaxStateCore},
                timeoutObservers    : {MODULE : kAjaxStateCore},
                timeoutAllObservers : {MODULE : kAjaxStateCore}
            }
        },
        CollectionHelper : {
            any            : {MODULE : kCollectionHelperCore},
            clear          : {MODULE : kCollectionHelperCore},
            clone          : {MODULE : kCollectionHelperCore},
            compact        : {MODULE : kCollectionHelperCore},
            contains       : {MODULE : kCollectionHelperCore},
            copy           : {MODULE : kCollectionHelperCore},
            detect         : {MODULE : kCollectionHelperCore},
            getDifference  : {MODULE : kCollectionHelperCore},
            each           : {MODULE : kCollectionHelperCore},
            every          : {MODULE : kCollectionHelperCore},
            exclude        : {MODULE : kCollectionHelperCore},
            extend         : {MODULE : kCollectionHelperCore},
            find           : {MODULE : kCollectionHelperCore},
            flatten        : {MODULE : kCollectionHelperCore},
            fold           : {MODULE : kCollectionHelperCore},
            forEach        : {MODULE : kCollectionHelperCore},
            getFirst       : {MODULE : kCollectionHelperCore},
            getFirstN      : {MODULE : kCollectionHelperCore},
            getFunctions   : {MODULE : kCollectionHelperCore},
            getKeys        : {MODULE : kCollectionHelperCore},
            getLast        : {MODULE : kCollectionHelperCore},
            getLastN       : {MODULE : kCollectionHelperCore},
            getMax         : {MODULE : kCollectionHelperCore},
            getMethods     : {MODULE : kCollectionHelperCore},
            getMin         : {MODULE : kCollectionHelperCore},
            getRest        : {MODULE : kCollectionHelperCore},
            getSize        : {MODULE : kCollectionHelperCore},
            getSortedIndex : {MODULE : kCollectionHelperCore},
            getValues      : {MODULE : kCollectionHelperCore},
            grep           : {MODULE : kCollectionHelperCore},
            group          : {MODULE : kCollectionHelperCore},
            inArray        : {MODULE : kCollectionHelperCore},
            includes       : {MODULE : kCollectionHelperCore},
            indexOf        : {MODULE : kCollectionHelperCore},
            intersect      : {MODULE : kCollectionHelperCore},
            invoke         : {MODULE : kCollectionHelperCore},
            isEmpty        : {MODULE : kCollectionHelperCore},
            lastIndexOf    : {MODULE : kCollectionHelperCore},
            map            : {MODULE : kCollectionHelperCore},
            pluck          : {MODULE : kCollectionHelperCore},
            reduce         : {MODULE : kCollectionHelperCore},
            reduceRight    : {MODULE : kCollectionHelperCore},
            reject         : {MODULE : kCollectionHelperCore},
            removeElement  : {MODULE : kCollectionHelperCore},
            select         : {MODULE : kCollectionHelperCore},
            shuffle        : {MODULE : kCollectionHelperCore},
            some           : {MODULE : kCollectionHelperCore},
            sort           : {MODULE : kCollectionHelperCore},
            tap            : {MODULE : kCollectionHelperCore},
            toArray        : {MODULE : kCollectionHelperCore},
            touch          : {MODULE : kCollectionHelperCore},
            union          : {MODULE : kCollectionHelperCore},
            unique         : {MODULE : kCollectionHelperCore},
            zip            : {MODULE : kCollectionHelperCore}
        },
        Cookie : {
            items : {
                read   : {MODULE : kCookieCore},
                remove : {MODULE : kCookieCore},
                save   : {MODULE : kCookieCore}
            }
        },
        Debugger : {
            items : {
                assert  : {MODULE : kDebuggerCore},
                error   : {MODULE : kDebuggerCore},
                info    : {MODULE : kDebuggerCore},
                init    : {MODULE : kDebuggerCore},
                log     : {MODULE : kDebuggerCore},
                println : {MODULE : kDebuggerCore},
                warn    : {MODULE : kDebuggerCore}
            }
        },
        DateHelper : {
            items : {
                getPrettyDate : {MODULE : kDateHelperCore},
                getTime       : {MODULE : kDateHelperCore},
                now           : {MODULE : kDateHelperCore}
            }
        },
        DomHelper : {
            items : {
                nodeType : {MODULE : kDomHelperConstants},

                append                  : {MODULE : kDomHelperCore},
                create                  : {MODULE : kDomHelperCore},
                createDocumentFragment  : {MODULE : kDomHelperCore},
                createElement           : {MODULE : kDomHelperCore},
                empty                   : {MODULE : kDomHelperCore},
                getAttribute            : {MODULE : kDomHelperCore},
                getHtml                 : {MODULE : kDomHelperCore},
                getText                 : {MODULE : kDomHelperCore},
                insertAfter             : {MODULE : kDomHelperCore},
                insertBefore            : {MODULE : kDomHelperCore},
                isDocument              : {MODULE : kDomHelperCore},
                isElement               : {MODULE : kDomHelperCore},
                prepend                 : {MODULE : kDomHelperCore},
                remove                  : {MODULE : kDomHelperCore},
                removeChildren          : {MODULE : kDomHelperCore},
                removeEmpty             : {MODULE : kDomHelperCore},
                removeEmptyTextNodes    : {MODULE : kDomHelperCore},
                removeNode              : {MODULE : kDomHelperCore},
                setAttribute            : {MODULE : kDomHelperCore},
                setHtml                 : {MODULE : kDomHelperCore},

                addClass              : {MODULE : kDomHelperClass},
                createClassNameRegExp : {MODULE : kDomHelperClass},
                hasClass              : {MODULE : kDomHelperClass},
                removeClass           : {MODULE : kDomHelperClass},
                toggleClass           : {MODULE : kDomHelperClass},

                getDimension            : {MODULE : kDomHelperDimension},
                getDocumentDimension    : {MODULE : kDomHelperDimension},
                getDocumentHeight       : {MODULE : kDomHelperDimension},
                getDocumentWidth        : {MODULE : kDomHelperDimension},
                getHeight               : {MODULE : kDomHelperDimension},
                getViewportInfo         : {MODULE : kDomHelperDimension},
                getWidth                : {MODULE : kDomHelperDimension},
                getWindowInnerDimension : {MODULE : kDomHelperDimension},
                getWindowInnerHeight    : {MODULE : kDomHelperDimension},
                getWindowInnerWidth     : {MODULE : kDomHelperDimension},
                setDimension            : {MODULE : kDomHelperDimension},
                setHeight               : {MODULE : kDomHelperDimension},
                setWidth                : {MODULE : kDomHelperDimension},

                compactField : {MODULE : kDomHelperForm},
                trimField    : {MODULE : kDomHelperForm},

                loadCss    : {MODULE : kDomHelperLoad},
                loadImage  : {MODULE : kDomHelperLoad},
                loadScript : {MODULE : kDomHelperLoad},

                replace : {MODULE : kDomHelperModify},
                unwrap  : {MODULE : kDomHelperModify},
                wrap    : {MODULE : kDomHelperModify},

                ready : {MODULE : kDomHelperReady},

                getObjectScrollOfset  : {MODULE : kDomHelperScroll},
                getScrollOffset       : {MODULE : kDomHelperScroll},
                getWindowScrollOffset : {MODULE : kDomHelperScroll},
                scrollObjectToBottom  : {MODULE : kDomHelperScroll},
                scrollObjectToTop     : {MODULE : kDomHelperScroll},
                scrollTo              : {MODULE : kDomHelperScroll},
                scrollToObject        : {MODULE : kDomHelperScroll},
                scrollWindowToBottom  : {MODULE : kDomHelperScroll},
                scrollWindowToObject  : {MODULE : kDomHelperScroll},
                scrollWindowToTop     : {MODULE : kDomHelperScroll},

                activateAlternateStylesheet : {MODULE : kDomHelperStyle},
                addCssRules                 : {MODULE : kDomHelperStyle},
                addStyle                    : {MODULE : kDomHelperStyle},
                getStyle                    : {MODULE : kDomHelperStyle},
                hide                        : {MODULE : kDomHelperStyle},
                isVisible                   : {MODULE : kDomHelperStyle},
                show                        : {MODULE : kDomHelperStyle},
                toggleVisibility            : {MODULE : kDomHelperStyle},

                getChildren                   : {MODULE : kDomHelperTraverse},
                getChildrenByAttribute        : {MODULE : kDomHelperTraverse},
                getChildrenByAttributeUntil   : {MODULE : kDomHelperTraverse},
                getChildrenByClass            : {MODULE : kDomHelperTraverse},
                getChildrenByClassUntil       : {MODULE : kDomHelperTraverse},
                getChildrenUntil              : {MODULE : kDomHelperTraverse},
                getChildrenWithAttribute      : {MODULE : kDomHelperTraverse},
                getChildrenWithAttributeUntil : {MODULE : kDomHelperTraverse},
                getChildrenWithClass          : {MODULE : kDomHelperTraverse},
                getChildrenWithClassUntil     : {MODULE : kDomHelperTraverse},
                getChildrenWithId             : {MODULE : kDomHelperTraverse},
                getChildrenWithIdUntil        : {MODULE : kDomHelperTraverse},

                getElements                   : {MODULE : kDomHelperTraverse},
                getElementsByAttribute        : {MODULE : kDomHelperTraverse},
                getElementsByClass            : {MODULE : kDomHelperTraverse},
                getElementsWithAttribute      : {MODULE : kDomHelperTraverse},
                getElementsWithClass          : {MODULE : kDomHelperTraverse},
                getElementsWithId             : {MODULE : kDomHelperTraverse},

                getFirst              : {MODULE : kDomHelperTraverse},
                getFirstByAttribute   : {MODULE : kDomHelperTraverse},
                getFirstByClass       : {MODULE : kDomHelperTraverse},
                getFirstWithAttribute : {MODULE : kDomHelperTraverse},
                getFirstWithClass     : {MODULE : kDomHelperTraverse},
                getFirstWithId        : {MODULE : kDomHelperTraverse},

                getFirstChild              : {MODULE : kDomHelperTraverse},
                getFirstChildByAttribute   : {MODULE : kDomHelperTraverse},
                getFirstChildByClass       : {MODULE : kDomHelperTraverse},
                getFirstChildWithAttribute : {MODULE : kDomHelperTraverse},
                getFirstChildWithClass     : {MODULE : kDomHelperTraverse},
                getFirstChildWithId        : {MODULE : kDomHelperTraverse},

                getLast              : {MODULE : kDomHelperTraverse},
                getLastByAttribute   : {MODULE : kDomHelperTraverse},
                getLastByClass       : {MODULE : kDomHelperTraverse},
                getLastWithId        : {MODULE : kDomHelperTraverse},
                getLastWithAttribute : {MODULE : kDomHelperTraverse},
                getLastWithClass     : {MODULE : kDomHelperTraverse},

                getLastChild              : {MODULE : kDomHelperTraverse},
                getLastChildByAttribute   : {MODULE : kDomHelperTraverse},
                getLastChildByClass       : {MODULE : kDomHelperTraverse},
                getLastChildWithAttribute : {MODULE : kDomHelperTraverse},
                getLastChildWithClass     : {MODULE : kDomHelperTraverse},
                getLastChildWithId        : {MODULE : kDomHelperTraverse},

                getNext              : {MODULE : kDomHelperTraverse},
                getNextByAttribute   : {MODULE : kDomHelperTraverse},
                getNextByClass       : {MODULE : kDomHelperTraverse},
                getNextWithAttribute : {MODULE : kDomHelperTraverse},
                getNextWithClass     : {MODULE : kDomHelperTraverse},
                getNextWithId        : {MODULE : kDomHelperTraverse},

                getNextAll                   : {MODULE : kDomHelperTraverse},
                getNextAllByAttribute        : {MODULE : kDomHelperTraverse},
                getNextAllByAttributeUntil   : {MODULE : kDomHelperTraverse},
                getNextAllByClass            : {MODULE : kDomHelperTraverse},
                getNextAllByClassUntil       : {MODULE : kDomHelperTraverse},
                getNextAllUntil              : {MODULE : kDomHelperTraverse},
                getNextAllWithAttribute      : {MODULE : kDomHelperTraverse},
                getNextAllWithAttributeUntil : {MODULE : kDomHelperTraverse},
                getNextAllWithClass          : {MODULE : kDomHelperTraverse},
                getNextAllWithClassUntil     : {MODULE : kDomHelperTraverse},
                getNextAllWithId             : {MODULE : kDomHelperTraverse},
                getNextAllWithIdUntil        : {MODULE : kDomHelperTraverse},

                getNth              : {MODULE : kDomHelperTraverse},
                getNthByAttribute   : {MODULE : kDomHelperTraverse},
                getNthByClass       : {MODULE : kDomHelperTraverse},
                getNthWithAttribute : {MODULE : kDomHelperTraverse},
                getNthWithClass     : {MODULE : kDomHelperTraverse},
                getNthWithId        : {MODULE : kDomHelperTraverse},

                getNthChild              : {MODULE : kDomHelperTraverse},
                getNthChildByAttribute   : {MODULE : kDomHelperTraverse},
                getNthChildByClass       : {MODULE : kDomHelperTraverse},
                getNthChildWithAttribute : {MODULE : kDomHelperTraverse},
                getNthChildWithClass     : {MODULE : kDomHelperTraverse},
                getNthChildWithId        : {MODULE : kDomHelperTraverse},

                getNthNext              : {MODULE : kDomHelperTraverse},
                getNthNextByAttribute   : {MODULE : kDomHelperTraverse},
                getNthNextByClass       : {MODULE : kDomHelperTraverse},
                getNthNextWithAttribute : {MODULE : kDomHelperTraverse},
                getNthNextWithClass     : {MODULE : kDomHelperTraverse},
                getNthNextWithId        : {MODULE : kDomHelperTraverse},

                getNthParent              : {MODULE : kDomHelperTraverse},
                getNthParentByAttribute   : {MODULE : kDomHelperTraverse},
                getNthParentByClass       : {MODULE : kDomHelperTraverse},
                getNthParentWithAttribute : {MODULE : kDomHelperTraverse},
                getNthParentWithClass     : {MODULE : kDomHelperTraverse},
                getNthParentWithId        : {MODULE : kDomHelperTraverse},

                getNthPrev              : {MODULE : kDomHelperTraverse},
                getNthPrevByAttribute   : {MODULE : kDomHelperTraverse},
                getNthPrevByClass       : {MODULE : kDomHelperTraverse},
                getNthPrevWithAttribute : {MODULE : kDomHelperTraverse},
                getNthPrevWithClass     : {MODULE : kDomHelperTraverse},
                getNthPrevWithId        : {MODULE : kDomHelperTraverse},

                getParent              : {MODULE : kDomHelperTraverse},
                getParentByAttribute   : {MODULE : kDomHelperTraverse},
                getParentByClass       : {MODULE : kDomHelperTraverse},
                getParentWithAttribute : {MODULE : kDomHelperTraverse},
                getParentWithClass     : {MODULE : kDomHelperTraverse},
                getParentWithId        : {MODULE : kDomHelperTraverse},

                getParents                   : {MODULE : kDomHelperTraverse},
                getParentsByAttribute        : {MODULE : kDomHelperTraverse},
                getParentsByAttributeUntil   : {MODULE : kDomHelperTraverse},
                getParentsByClass            : {MODULE : kDomHelperTraverse},
                getParentsByClassUntil       : {MODULE : kDomHelperTraverse},
                getParentsUntil              : {MODULE : kDomHelperTraverse},
                getParentsWithAttribute      : {MODULE : kDomHelperTraverse},
                getParentsWithAttributeUntil : {MODULE : kDomHelperTraverse},
                getParentsWithClass          : {MODULE : kDomHelperTraverse},
                getParentsWithClassUntil     : {MODULE : kDomHelperTraverse},
                getParentsWithId             : {MODULE : kDomHelperTraverse},
                getParentsWithIdUntil        : {MODULE : kDomHelperTraverse},

                getParentsAndSelf                   : {MODULE : kDomHelperTraverse},
                getParentsAndSelfByAttribute        : {MODULE : kDomHelperTraverse},
                getParentsAndSelfByAttributeUntil   : {MODULE : kDomHelperTraverse},
                getParentsAndSelfByClass            : {MODULE : kDomHelperTraverse},
                getParentsAndSelfByClassUntil       : {MODULE : kDomHelperTraverse},
                getParentsAndSelfUntil              : {MODULE : kDomHelperTraverse},
                getParentsAndSelfWithAttribute      : {MODULE : kDomHelperTraverse},
                getParentsAndSelfWithAttributeUntil : {MODULE : kDomHelperTraverse},
                getParentsAndSelfWithClass          : {MODULE : kDomHelperTraverse},
                getParentsAndSelfWithClassUntil     : {MODULE : kDomHelperTraverse},
                getParentsAndSelfWithId             : {MODULE : kDomHelperTraverse},
                getParentsAndSelfWithIdUntil        : {MODULE : kDomHelperTraverse},

                getPrev              : {MODULE : kDomHelperTraverse},
                getPrevByAttribute   : {MODULE : kDomHelperTraverse},
                getPrevByClass       : {MODULE : kDomHelperTraverse},
                getPrevWithAttribute : {MODULE : kDomHelperTraverse},
                getPrevWithClass     : {MODULE : kDomHelperTraverse},
                getPrevWithId        : {MODULE : kDomHelperTraverse},

                getPrevAll                   : {MODULE : kDomHelperTraverse},
                getPrevAllByAttribute        : {MODULE : kDomHelperTraverse},
                getPrevAllByClass            : {MODULE : kDomHelperTraverse},
                getPrevAllByClassUntil       : {MODULE : kDomHelperTraverse},
                getPrevAllUntil              : {MODULE : kDomHelperTraverse},
                getPrevAllWithAttribute      : {MODULE : kDomHelperTraverse},
                getPrevAllWithAttributeUntil : {MODULE : kDomHelperTraverse},
                getPrevAllWithClass          : {MODULE : kDomHelperTraverse},
                getPrevAllWithClassUntil     : {MODULE : kDomHelperTraverse},
                getPrevAllWithId             : {MODULE : kDomHelperTraverse},
                getPrevAllWithIdUntil        : {MODULE : kDomHelperTraverse},

                getSiblings                   : {MODULE : kDomHelperTraverse},
                getSiblingsByAttribute        : {MODULE : kDomHelperTraverse},
                getSiblingsByAttributeUntil   : {MODULE : kDomHelperTraverse},
                getSiblingsByClass            : {MODULE : kDomHelperTraverse},
                getSiblingsByClassUntil       : {MODULE : kDomHelperTraverse},
                getSiblingsUntil              : {MODULE : kDomHelperTraverse},
                getSiblingsWithAttribute      : {MODULE : kDomHelperTraverse},
                getSiblingsWithAttributeUntil : {MODULE : kDomHelperTraverse},
                getSiblingsWithClass          : {MODULE : kDomHelperTraverse},
                getSiblingsWithClassUntil     : {MODULE : kDomHelperTraverse},
                getSiblingsWithId             : {MODULE : kDomHelperTraverse},
                getSiblingsWithIdUntil        : {MODULE : kDomHelperTraverse},

                isChild              : {MODULE : kDomHelperTraverse},
                isChildByAttribute   : {MODULE : kDomHelperTraverse},
                isChildByClass       : {MODULE : kDomHelperTraverse},
                isChildWithAttribute : {MODULE : kDomHelperTraverse},
                isChildWithClass     : {MODULE : kDomHelperTraverse},
                isChildWithId        : {MODULE : kDomHelperTraverse},

                isNext              : {MODULE : kDomHelperTraverse},
                isNextByAttribute   : {MODULE : kDomHelperTraverse},
                isNextByClass       : {MODULE : kDomHelperTraverse},
                isNextWithAttribute : {MODULE : kDomHelperTraverse},
                isNextWithClass     : {MODULE : kDomHelperTraverse},
                isNextWithId        : {MODULE : kDomHelperTraverse},

                isParent              : {MODULE : kDomHelperTraverse},
                isParentByAttribute   : {MODULE : kDomHelperTraverse},
                isParentByClass       : {MODULE : kDomHelperTraverse},
                isParentWithAttribute : {MODULE : kDomHelperTraverse},
                isParentWithClass     : {MODULE : kDomHelperTraverse},
                isParentWithId        : {MODULE : kDomHelperTraverse},

                isParentOrSelf              : {MODULE : kDomHelperTraverse},
                isParentOrSelfByAttribute   : {MODULE : kDomHelperTraverse},
                isParentOrSelfByClass       : {MODULE : kDomHelperTraverse},
                isParentOrSelfWithAttribute : {MODULE : kDomHelperTraverse},
                isParentOrSelfWithClass     : {MODULE : kDomHelperTraverse},
                isParentOrSelfWithId        : {MODULE : kDomHelperTraverse},

                isPrev              : {MODULE : kDomHelperTraverse},
                isPrevByAttribute   : {MODULE : kDomHelperTraverse},
                isPrevByClass       : {MODULE : kDomHelperTraverse},
                isPrevWithAttribute : {MODULE : kDomHelperTraverse},
                isPrevWithClass     : {MODULE : kDomHelperTraverse},
                isPrevWithId        : {MODULE : kDomHelperTraverse},

                isSibling              : {MODULE : kDomHelperTraverse},
                isSiblingByAttribute   : {MODULE : kDomHelperTraverse},
                isSiblingByClass       : {MODULE : kDomHelperTraverse},
                isSiblingWithAttribute : {MODULE : kDomHelperTraverse},
                isSiblingWithClass     : {MODULE : kDomHelperTraverse},
                isSiblingWithId        : {MODULE : kDomHelperTraverse}
            }
        },
        EventHandler : {
            items : {
                keyCode : {MODULE : kEventHandlerConstants},

                addEventListener    : {MODULE : kEventHandlerCore},
                addEventListeners   : {MODULE : kEventHandlerCore},
                getEventObject      : {MODULE : kEventHandlerCore},
                getKeyCode          : {MODULE : kEventHandlerCore},
                getMouseCoordinates : {MODULE : kEventHandlerCore},
                getTarget           : {MODULE : kEventHandlerCore},
                preventDefault      : {MODULE : kEventHandlerCore},
                removeEventListener : {MODULE : kEventHandlerCore},
                stopPropagation     : {MODULE : kEventHandlerCore},

                isArrowKey               : {MODULE : kEventHandlerExtend},
                isBackspaceKey           : {MODULE : kEventHandlerExtend},
                isCharacterKeypressEvent : {MODULE : kEventHandlerExtend},
                isEnterKey               : {MODULE : kEventHandlerExtend},
                isEscapeKey              : {MODULE : kEventHandlerExtend},
                isRightClick             : {MODULE : kEventHandlerExtend},
                isTabKey                 : {MODULE : kEventHandlerExtend}
            }
        },
        FormHelper : {
            items : {
                preventMultipleSubmit : {MODULE : kFormHelperCore}
            }
        },
        Jsonp : {
            items : {
                get : {MODULE : kJsonpCore}
            }
        },
        JsonpController : {
            base  : 'AjaxController',
            items : {
                protecteds : {MODULE : kJsonpControllerCore}
            }
        },
        JsonpState : {
            base  : 'AjaxState',
            items : {
                protecteds : {MODULE : kJsonpStateCore},

                // Overrides:
                update     : {MODULE : kJsonpStateCore},
                unregister : {MODULE : kJsonpStateCore}
            }
        },
        MethodHelper : {
            items : {
                bind     : {MODULE : kMethodHelperCore},
                curry    : {MODULE : kMethodHelperCore},
                identity : {MODULE : kMethodHelperCore},
                memoize  : {MODULE : kMethodHelperCore},
                partial  : {MODULE : kMethodHelperCore},

                bindAsEventListener : {MODULE : kMethodHelperEvent},

                overload            : {MODULE : kMethodHelperInherit},
                requireAllArguments : {MODULE : kMethodHelperInherit},

                after : {MODULE : kMethodHelperRepeat},
                once  : {MODULE : kMethodHelperRepeat},
                times : {MODULE : kMethodHelperRepeat},

                debounce : {MODULE : kMethodHelperTimer},
                defer    : {MODULE : kMethodHelperTimer},
                delay    : {MODULE : kMethodHelperTimer},
                throttle : {MODULE : kMethodHelperTimer},

                compose : {MODULE : kMethodHelperTranspose},
                flip    : {MODULE : kMethodHelperTranspose},
                wrap    : {MODULE : kMethodHelperTranspose}
            }
        },
        ObjectHelper : {
            items : {
                copy          : {MODULE : kObjectHelperCore},
                copyMethods   : {MODULE : kObjectHelperCore},
                copyPrototype : {MODULE : kObjectHelperCore},
                extend        : {MODULE : kObjectHelperCore},
                stringify     : {MODULE : kObjectHelperCore},
                toArray       : {MODULE : kObjectHelperCore},
                toJsonString  : {MODULE : kObjectHelperCore}
            }
        },
        QueryParser : {
            items : {
                encode : {MODULE : kQueryParserCore},
                parse  : {MODULE : kQueryParserCore}
            }
        },
        SortDelegate : {
            items : {
                sort     : {MODULE : kSortDelegateCore},
                sortAsc  : {MODULE : kSortDelegateCore},
                sortDesc : {MODULE : kSortDelegateCore}
            }
        },
        StringHelper : {
            items : {
                compact        : {MODULE : kStringHelperCore},
                concat         : {MODULE : kStringHelperCore},
                format         : {MODULE : kStringHelperCore},
                generateGuid   : {MODULE : kStringHelperCore},
                generateRandom : {MODULE : kStringHelperCore},
                printf         : {MODULE : kStringHelperCore},
                remove         : {MODULE : kStringHelperCore},
                trim           : {MODULE : kStringHelperCore},

                decode         : {MODULE : kStringHelperEncode},
                encode         : {MODULE : kStringHelperEncode},
                encodeSafeHtml : {MODULE : kStringHelperEncode},
                escape         : {MODULE : kStringHelperEncode},
                htmlEncode     : {MODULE : kStringHelperEncode},
                safeHtmlEncode : {MODULE : kStringHelperEncode},
                unescape       : {MODULE : kStringHelperEncode},
                xssEncode      : {MODULE : kStringHelperEncode},

                stripNonAlpha        : {MODULE : kStringHelperStrip},
                stripNonAlphanumeric : {MODULE : kStringHelperStrip},
                stripTags            : {MODULE : kStringHelperStrip},
                stripNonNumeric      : {MODULE : kStringHelperStrip},
                stripNumeric         : {MODULE : kStringHelperStrip},

                br2nl                     : {MODULE : kStringHelperTransform},
                nl2br                     : {MODULE : kStringHelperTransform},
                removeTags                : {MODULE : kStringHelperTransform},
                toCamelCase               : {MODULE : kStringHelperTransform},
                toDashedFromCamelCase     : {MODULE : kStringHelperTransform},
                toJson                    : {MODULE : kStringHelperTransform},
                toUnderscoreFromCamelCase : {MODULE : kStringHelperTransform},
                truncate                  : {MODULE : kStringHelperTransform}
            }
        },
        Supports : {
            items : {
                ajax   : {MODULE : kSupportsCore},
                cookie : {MODULE : kSupportsCore},
                dom    : {MODULE : kSupportsCore}
            }
        },
        Template : {
            items : {
                parse : {MODULE : kTemplateCore}
            }
        },
        Timer : {
            items : {
                set   : {MODULE : kTimerCore},
                start : {MODULE : kTimerCore},
                stop  : {MODULE : kTimerCore}
            }
        },
        Try : {
            items : {
                all   : {MODULE : kTryCore},
                these : {MODULE : kTryCore}
            }
        },
        Unit : {
            items : {
                add                   : {MODULE : kUnitCore},
                assert                : {MODULE : kUnitCore},
                assertEqual           : {MODULE : kUnitCore},
                assertNotEqual        : {MODULE : kUnitCore},
                assertStrictEqual     : {MODULE : kUnitCore},
                assertStrictNotEqual  : {MODULE : kUnitCore},
                getGlobalFailureCount : {MODULE : kUnitCore},
                getGlobalSuccessCount : {MODULE : kUnitCore},
                isRunning             : {MODULE : kUnitCore},
                log                   : {MODULE : kUnitCore},
                run                   : {MODULE : kUnitCore}
            }
        },
        Validator : {
            items : {
                is          : {MODULE : kValidatorCore},
                isArguments : {MODULE : kValidatorCore},
                isArray     : {MODULE : kValidatorCore},
                isBoolean   : {MODULE : kValidatorCore},
                isDate      : {MODULE : kValidatorCore},
                isFunction  : {MODULE : kValidatorCore},
                isNaN       : {MODULE : kValidatorCore},
                isNull      : {MODULE : kValidatorCore},
                isNumber    : {MODULE : kValidatorCore},
                isNumeric   : {MODULE : kValidatorCore},
                isObject    : {MODULE : kValidatorCore},
                isRegExp    : {MODULE : kValidatorCore},
                isString    : {MODULE : kValidatorCore},
                isUndefined : {MODULE : kValidatorCore},
                isWindow    : {MODULE : kValidatorCore},

                isEmail      : {MODULE : kValidatorRegExp},
                isUrl        : {MODULE : kValidatorRegExp},
                isWhitespace : {MODULE : kValidatorRegExp}
            }
        }
    });

    //TODO: complete me.
    init(fp, 'modules', {
        'core.meta' : {
            depends : []
        },
        'core' : {
            depends : ['core.meta']
        },
        'template.core' : {
            depends : ['core']
        }
    });

    // The methods below are <em>internal</em> methods that are used
    // to ensure consistency within the framework.
    // They are not meant for external use.

    if (isProduction) {
        /*
         *
         */
        init(fp, 'alias', function(mixed, aliasName, existingName) {
            fp.define(mixed, aliasName, fp.getObject(mixed)[existingName]);
        });

        /*
         *
         */
        init(fp, 'create', function(name) {
            var cls = fp.classes[name];

            return [cls.items, namespace(framework, name)];
        });

        /*
         *
         */
        init(fp, 'construct', function(name, delegate) {
            var cls = fp.classes[name];

            framework[name] = delegate;

            return [cls.items, delegate];
        });

        /*
         *
         */
        init(fp, 'define', function(mixed, name, fn) {
            var me = mixed[1];

            me[name] = fn;
        });

        /*
         *
         */
        init(fp, 'getAttr', function(root, name) {
            var elem = root[name];

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
            var me = mixed[1];

            me.prototype[methodName] = fn;
        });

        /*
         *
         */
        init(fp, 'proto', function(mixed, methodName, fn) {
            var me = mixed[1];

            me.prototype[methodName] = fn;
        });

        /*
         *
         */
        init(fp, 'require', function(name, method) {
            var methodName = '';
            var objName = '';

            if (arguments.length === 1) {
                methodName = name;
                objName = kEmpty;
            } else {
                methodName = method;
                objName = name;
            }

            var meta = null;
            var classes = fp.classes;

            if (objName === kEmpty) {
                var result = null;

                if (classes.hasOwnProperty(methodName)) {
                    result = framework[methodName];

                    return result;
                }

                meta = classes.o2.items;

                result = framework[methodName];

                return result;
            }

            var obj = framework[objName];
            var theMethod = obj[methodName];

            return theMethod;
        });
    } else {

        /*
         *
         */
        init(fp, 'alias', function(mixed, aliasName, existingName) {
            fp.define(mixed, aliasName, fp.getObject(mixed)[existingName]);
        });

        /*
         *
         */
        init(fp, 'create', function(name) {
            var cls = fp.classes[name];

            if (!cls) {
                dbg();

                throw getClassNotDefinedInMetaWarning(name);
            }

            return [cls.items, namespace(framework, name)];
        });

        /*
         *
         */
        init(fp, 'construct', function(name, delegate) {
            var cls = fp.classes[name];

            if (!cls) {
                dbg();

                throw getClassNotDefinedInMetaWarning(name);
            }

            if (framework[name]) {
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
            var meta = mixed[0];
            var me = mixed[1];

            if (!me) {
                dbg();

                throw kObjectNotDefined;
            }

            if (!fn) {
                dbg();

                throw [kDelegateNotdefined, name].join(kEmpty);
            }

            if (!meta) {
                dbg();

                throw kNoMetaDefinition;
            }

            if (meta[name]) {
                if (me[name]) {
                    throw [kMethodAlreadyDefined, name].join(kEmpty);
                }

                me[name] = fn;
            }
        });

        /*
         *
         */
        init(fp, 'getAttr', function(root, name) {
            if (!root) {
                dbg();

                throw kRootNotFound;
            }

            if (!name) {
                dbg();

                throw kNameNotProvided;
            }

            var elem = root[name];

            if (!elem) {
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
            var meta = mixed[0];
            var me = mixed[1];

            if (!me) {
                dbg();

                throw 'Object not found in mixed collection';
            }

            if (!fn) {
                dbg();

                throw [kDelegateNotdefined, methodName].join(kEmpty);
            }

            if (!meta[methodName]) {
                dbg();

                throw getClassNotDefinedInMetaWarning(methodName);
            }

            if (!me.prototype[methodName]) {
                dbg();

                throw getNoMethodToOverrideWarning(methodName);
            }

            me.prototype[methodName] = fn;
        });

        /*
         *
         */
        init(fp, 'proto', function(mixed, methodName, fn) {
            var meta = mixed[0];
            var me = mixed[1];

            if (!me) {
                dbg();

                throw kObjectNotDefined;
            }

            if (!fn) {
                dbg();

                throw [kDelegateNotdefined, methodName].join(kEmpty);
            }

            if (!meta[methodName]) {
                dbg();

                throw getMethodOfClassNotDefinedInMetaWarning(kAny, methodName);
            }

            if (me.prototype[methodName]) {
                dbg();

                throw [kMethodAlreadyDefined, methodName].join(kEmpty);
            }

            me.prototype[methodName] = fn;
        });

        /*
         *
         */
        init(fp, 'require', function(name, method) {
            var methodName = '';
            var objName = '';

            if (arguments.length === 1) {
                methodName = name;
                objName = kEmpty;
            } else {
                methodName = method;
                objName = name;
            }

            if (typeof objName !== kString) {
                dbg();

                throw kObjNameNotString;
            }

            if (typeof methodName !== kString) {
                dbg();

                throw kMethodNameNotString;
            }

            var meta = null;
            var classes = fp.classes;

            if (objName === kEmpty) {
                var result = null;

                if (classes.hasOwnProperty(methodName)) {
                    result = framework[methodName];

                    if (!result) {
                        dbg();

                        throw getClassNotDefinedWarning(methodName);
                    }

                    return result;
                }

                meta = classes.o2.items;

                if (!meta[methodName]) {
                    dbg();

                    throw getMethodNotDefinedInMetaWarning(methodName);
                }

                result = framework[methodName];

                if (!result) {
                    dbg();

                    throw getMethodNotDefinedInFrameworkWarning(methodName);
                }

                return result;
            }

            var cls = classes[objName];

            if (!cls) {
                dbg();

                throw getClassNotDefinedInMetaWarning(objName);
            }

            var mtd = cls.items[methodName];

            if (!mtd) {
                dbg();

                throw getMethodOfClassNotDefinedInMetaWarning(objName,
                    methodName);
            }

            var obj = framework[objName];

            if (!obj) {
                dbg();

                throw getClassDoesNotExistWarning(objName);
            }

            var theMethod = obj[methodName];

            if (!theMethod) {
                dbg();

                throw getMethodOfClassDoesNotExistWarning(objName, methodName);
            }

            return theMethod;
        });
    }
}(this.o2));
