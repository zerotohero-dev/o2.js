/**
 * Root namespace &ndash; magic goes here ;)
 * @namespace o2
 */
this.o2 = this.o2 || {
    isProduction : false
};

//TODO: cleanup.
//TODO: check all "TODO"s

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
    var kObject = 'object';
//    var kRequirementNotSatisfied = ' : Requirement not satisfied.';
    var kMethodAlreadyDefined = 'Method name is undefined : ';
    var kDelegateNotdefined = 'Delegate is undefined: ';
    var kEmpty = '';

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
     *
     */
    function namespace(root, key) {
        if (!root || typeof root !== kObject) {
            return null;
        }

        return init(root, key, {});
    }

    var fp = init(framework, 'protecteds', {});

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
                getChildrenById               : {MODULE : kDomHelperTraverse},
                getChildrenByIdUntil          : {MODULE : kDomHelperTraverse},
                getChildrenUntil              : {MODULE : kDomHelperTraverse},
                getChildrenWithAttribute      : {MODULE : kDomHelperTraverse},
                getChildrenWithAttributeUntil : {MODULE : kDomHelperTraverse},
                getChildrenWithClass          : {MODULE : kDomHelperTraverse},
                getChildrenWithClassUntil     : {MODULE : kDomHelperTraverse},
                getChildrenWithId             : {MODULE : kDomHelperTraverse},
                getChildrenWithIdUntil        : {MODULE : kDomHelperTraverse},

                getElements              : {MODULE : kDomHelperTraverse},
                getElementsByAttribute   : {MODULE : kDomHelperTraverse},
                getElementsByClass       : {MODULE : kDomHelperTraverse},
                getElementsWithAttribute : {MODULE : kDomHelperTraverse},
                getElementsWithClass     : {MODULE : kDomHelperTraverse},
                getElementsWithId        : {MODULE : kDomHelperTraverse},

                getFirst              : {MODULE : kDomHelperTraverse},
                getFirstByAttribute   : {MODULE : kDomHelperTraverse},
                getFirstByClass       : {MODULE : kDomHelperTraverse},
                getFirstById          : {MODULE : kDomHelperTraverse},
                getFirstWithAttribute : {MODULE : kDomHelperTraverse},
                getFirstWithClass     : {MODULE : kDomHelperTraverse},
                getFirstWithId        : {MODULE : kDomHelperTraverse},

                getFirstChild              : {MODULE : kDomHelperTraverse},
                getFirstChildByAttribute   : {MODULE : kDomHelperTraverse},
                getFirstChildByClass       : {MODULE : kDomHelperTraverse},
                getFirstChildById          : {MODULE : kDomHelperTraverse},
                getFirstChildWithAttribute : {MODULE : kDomHelperTraverse},
                getFirstChildWithClass     : {MODULE : kDomHelperTraverse},
                getFirstChildWithId        : {MODULE : kDomHelperTraverse},

                getLast              : {MODULE : kDomHelperTraverse},
                getLastByAttribute   : {MODULE : kDomHelperTraverse},
                getLastByClass       : {MODULE : kDomHelperTraverse},
                getLastById          : {MODULE : kDomHelperTraverse},
                getLastWithId        : {MODULE : kDomHelperTraverse},
                getLastWithAttribute : {MODULE : kDomHelperTraverse},
                getLastWithClass     : {MODULE : kDomHelperTraverse},

                getLastChild              : {MODULE : kDomHelperTraverse},
                getLastChildByAttribute   : {MODULE : kDomHelperTraverse},
                getLastChildByClass       : {MODULE : kDomHelperTraverse},
                getLastChildById          : {MODULE : kDomHelperTraverse},
                getLastChildWithAttribute : {MODULE : kDomHelperTraverse},
                getLastChildWithClass     : {MODULE : kDomHelperTraverse},
                getLastChildWithId        : {MODULE : kDomHelperTraverse},

                getNext              : {MODULE : kDomHelperTraverse},
                getNextByAttribute   : {MODULE : kDomHelperTraverse},
                getNextByClass       : {MODULE : kDomHelperTraverse},
                getNextById          : {MODULE : kDomHelperTraverse},
                getNextWithAttribute : {MODULE : kDomHelperTraverse},
                getNextWithClass     : {MODULE : kDomHelperTraverse},
                getNextWithId        : {MODULE : kDomHelperTraverse},

                getNextAll                   : {MODULE : kDomHelperTraverse},
                getNextAllByAttribute        : {MODULE : kDomHelperTraverse},
                getNextAllByAttributeUntil   : {MODULE : kDomHelperTraverse},
                getNextAllByClass            : {MODULE : kDomHelperTraverse},
                getNextAllByClassUntil       : {MODULE : kDomHelperTraverse},
                getNextAllById               : {MODULE : kDomHelperTraverse},
                getNextAllByIdUntil          : {MODULE : kDomHelperTraverse},
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
                getParentById          : {MODULE : kDomHelperTraverse},
                getParentWithAttribute : {MODULE : kDomHelperTraverse},
                getParentWithClass     : {MODULE : kDomHelperTraverse},
                getParentWithId        : {MODULE : kDomHelperTraverse},

                getParentOrSelf              : {MODULE : kDomHelperTraverse},
                getParentOrSelfByAttribute   : {MODULE : kDomHelperTraverse},
                getParentOrSelfByClass       : {MODULE : kDomHelperTraverse},
                getParentOrSelfById          : {MODULE : kDomHelperTraverse},
                getParentOrSelfWithAttribute : {MODULE : kDomHelperTraverse},
                getParentOrSelfWithClass     : {MODULE : kDomHelperTraverse},
                getParentOrSelfWithId        : {MODULE : kDomHelperTraverse},

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
                getPrevById          : {MODULE : kDomHelperTraverse},
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
                isChildById          : {MODULE : kDomHelperTraverse},
                isChildWithAttribute : {MODULE : kDomHelperTraverse},
                isChildWithClass     : {MODULE : kDomHelperTraverse},
                isChildWithId        : {MODULE : kDomHelperTraverse},

                isNext              : {MODULE : kDomHelperTraverse},
                isNextByAttribute   : {MODULE : kDomHelperTraverse},
                isNextByClass       : {MODULE : kDomHelperTraverse},
                isNextById          : {MODULE : kDomHelperTraverse},
                isNextWithAttribute : {MODULE : kDomHelperTraverse},
                isNextWithClass     : {MODULE : kDomHelperTraverse},
                isNextWithId        : {MODULE : kDomHelperTraverse},

                isParent              : {MODULE : kDomHelperTraverse},
                isParentByAttribute   : {MODULE : kDomHelperTraverse},
                isParentByClass       : {MODULE : kDomHelperTraverse},
                isParentById          : {MODULE : kDomHelperTraverse},
                isParentWithAttribute : {MODULE : kDomHelperTraverse},
                isParentWithClass     : {MODULE : kDomHelperTraverse},
                isParentWithId        : {MODULE : kDomHelperTraverse},

                isParentOrSelf              : {MODULE : kDomHelperTraverse},
                isParentOrSelfByAttribute   : {MODULE : kDomHelperTraverse},
                isParentOrSelfByClass       : {MODULE : kDomHelperTraverse},
                isParentOrSelfById          : {MODULE : kDomHelperTraverse},
                isParentOrSelfWithAttribute : {MODULE : kDomHelperTraverse},
                isParentOrSelfWithClass     : {MODULE : kDomHelperTraverse},
                isParentOrSelfWithId        : {MODULE : kDomHelperTraverse},

                isPrev              : {MODULE : kDomHelperTraverse},
                isPrevByAttribute   : {MODULE : kDomHelperTraverse},
                isPrevByClass       : {MODULE : kDomHelperTraverse},
                isPrevById          : {MODULE : kDomHelperTraverse},
                isPrevWithAttribute : {MODULE : kDomHelperTraverse},
                isPrevWithClass     : {MODULE : kDomHelperTraverse},
                isPrevWithId        : {MODULE : kDomHelperTraverse},

                isSibling              : {MODULE : kDomHelperTraverse},
                isSiblingByAttribute   : {MODULE : kDomHelperTraverse},
                isSiblingByClass       : {MODULE : kDomHelperTraverse},
                isSiblingById          : {MODULE : kDomHelperTraverse},
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

                // overrides:
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

    var isProduction = framework.isProduction;

    if (isProduction) {
        // TODO: rewrite

        init();
    } else {
        init(fp, 'require', function(objName, methodName) {
            //var mixed = null;

//            var objName = null;
//            var methodName = null;

            if (arguments.length === 1) {
                methodName = objName;
                objName = '';
            }
//            } else {
                //objName = name;
                //methodName = method;
//            }

            if (typeof objName !== 'string') {
                dbg();
                throw 'fwRequire: objName should be  a String.';
            }

            if (typeof methodName !== 'string') {
                dbg();
                throw 'fwRequire: methodName should be  a String.';
            }

            var meta = null;

            if (objName === '') {
                var classes = fp.classes;
                var result = null;
                //var key = null;

                if (classes.hasOwnProperty(methodName)) {
                    result = framework[methodName];

                    if (!result) {
                        dbg();
                        throw 'Class ' + methodName + ' not defined yet.';
                    }


                    return result;
                }

                meta = fp.classes.o2.items;

                if (!meta[methodName]) {
                    dbg();
                    throw 'Method or attribute ' + methodName + ' not found in framework meta definition';
                }

                result = framework[methodName];

                if (!result) {
                    dbg();
                    throw 'fwRequire: method or attribute "'+ methodName + ' does not exist in framework.';
                }

                return result;
            }

            var cls = fp.classes[objName];

            if (!cls) {
                dbg();
                throw 'fwRequire: Class "'+ objName + '" is not defined in meta definition.';
            }

            var method = cls.items[methodName];

            if (!method) {
                dbg();
                throw 'fwRequire: Class '+objName+
                    ' does not have a method '+methodName+ ' defined in meta definition.';
            }

            var obj = framework[objName];

            if (!obj) {
                dbg();
                throw 'fwRequire: Class "'+ objName + '" does not currently exist.';
            }

            var theMethod = obj[methodName];

            if (!theMethod) {
                dbg();
                throw 'fwRequire: method '+methodName+' of object '+objName+
                    ' does not exist at this time.';
            }

            return theMethod;
        });

        init(fp, 'getAttr', function(root, name) {
            if (!root) {
                dbg();
                throw 'getAttr: root not found';
            }

            if (!name) {
                dbg();
                throw 'getAttr: name not provided';
            }

            var elem = root[name];

            if (!elem) {
                dbg();
                throw 'getAttr: root does not have an attribute '+ name;
            }

            return elem;
        });

        /**
         * @function {protected static} o2.protecteds.create
         *
         * <p>Returns a <strong>mixed</strong> <code>Object</code>, if
         * <strong>name</strong> is defined in
         * <code>o2.protecteds.classes</code>.</p>
         *
         * <p>Creates the object if it does not exist.</p>
         *
         * @param {String} name - the name of the <strong>class</strong>.
         *
         * @return an <code>Array</code>, where the first index is the
         * class-realated <strong>meta</strong> information, and the second index
         * is the <strong>static</strong> classs instance.
         *
         * @throws Exception - if  <code>o2.protecteds.classes</code> does not
         * have a member of name `<strong>name</strong>`.
         */
        init(fp, 'create', function(name) {
            var cls = fp.classes[name];

            if (!cls) {
                dbg();
                throw 'Meta definition not found for class ' + name;
            }

            return [cls.items, namespace(framework, name)];
        });

        init(fp, 'construct', function(name, delegate) {
            var cls = fp.classes[name];

            if (!cls) {
                dbg();
                throw 'Meta definition not found for class ' + name;
            }

            if (framework[name]) {
                dbg();
                throw 'Constructor "' + name + '" is already defined';
            }

            framework[name] = delegate;

            return [cls.items, delegate];
        });

        init(fp, 'proto', function(mixed, methodName, fn) {
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
                throw 'Method or attribute ' + methodName + ' not found in meta definition.';
            }

            if (me.prototype[methodName]) {
                dbg();
                throw [kMethodAlreadyDefined, methodName].join(kEmpty);
            }

            me.prototype[methodName] = fn;
        });


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
                throw 'Method or attribute ' + methodName + ' not found in meta definition.';
            }

            if (!me.prototype[methodName]) {
                dbg();
                throw 'No method' + methodName + ' to override';
            }

            me.prototype[methodName] = fn;
        });

        init(fp, 'getRoot', function() {
            return [fp.classes.o2.items, framework];
        });

        init(fp, 'define', function(mixed, name, fn) {
            var meta = mixed[0];
            var me= mixed[1];

            if (!me) {
                dbg();
                throw 'Object not found in mixed collection';
            }

            if (!fn) {
                dbg();
                throw [kDelegateNotdefined, name].join(kEmpty);
            }

            if (!meta) {
                dbg();
                throw 'no meta definition';
            }

            if (meta[name]) {
                if (me[name]) {
                    throw [kMethodAlreadyDefined, name].join(kEmpty);
                }

                me[name] = fn;
            }
        });

        /*
         * Takes the *mixed* reference and returns the object component of it.
         */
        init(fp, 'getObject', function(mixed) {
            return mixed[1];
        });

    //TODO: add documentation to this all and up
        init(fp, 'alias', function(mixed, aliasName, existingName) {
            fp.define(mixed, aliasName, fp.getObject(mixed)[existingName]);
        });
    }
}(this.o2));

    // init(fp, 'fwEval', function(root, name, attr) {
    //     if (!root) {
    //         throw 'fwEval: root not found';
    //     }

    //     if (!name) {
    //         throw 'fwEval: name not provided';
    //     }

    //     if (!attr) {
    //         throw 'fwEval: attr not provided';
    //     }

    //     var elem = root[name];

    //     if (!elem) {
    //         throw 'fwEval: root does not have an attribute '+ name;
    //     }

    //     var val = elem[attr];

    //     if (!val) {
    //         throw 'fwEval: root does not have an object with name '+  name +
    //             'and value '+ attr;
    //     }

    //     return val;
    // });

    // /*
    //  * Requirement check.
    //  * Throws exception if <strong>obj</strong> is falsy.
    //  */
    // init(fp, 'require', function(obj) {
    //     if (!obj) {
    //         //dbg();

    //         throw [
    //             framework.name,
    //             kRequirementNotSatisfied
    //         ].join(kEmpty);
    //     }

    //     return obj;
    // });