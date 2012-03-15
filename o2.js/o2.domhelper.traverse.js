/**
 * @module   domhelper.traverse
 * @requires collectionhelper.core
 * @requires core
 * @requires domhelper.class
 * @requires domhelper.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-16 01:05:13.172677
 * -->
 *
 * <p>A utility package for traversing the <code>DOM</code>.</p>
 */
(function(framework, document) {
    'use strict';

    //TODO: update documentation after completing this module.

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Class Name
     */
    var kModuleName = 'DomHelper';

    /*
     * DomHelper (traverse)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var $      = require('$');
    var myName = require('name');

    var kAll   = '*';
    var kEmpty = '';

    var nodeType  = require(kModuleName, 'nodeType');
    var kTextNode = attr(nodeType, 'TEXT');

    var getAttribute = require(kModuleName, 'getAttribute');

    var kStringHelper = 'StringHelper';
    var format        = require(kStringHelper, 'format');
    var generateGuid  = require(kStringHelper, 'generateGuid');

    var contains = require('CollectionHelper', 'contains');

    /*
     * Selectors
     */
    var kImmediateClassSelector       = '#{0} > .{1}';
    var kImmediateClassAndTagSelector = '#{0} > {1}.{2}';

    /*
     * Checks document.querySelector support.
     * Using document.documentMode for IE, since the compatMode property is
     * deprecated in IE8+ in favor of the documentMode property, and IE7-
     * does not suppory document.querySelector anyway.
     * ref: http://msdn.microsoft.com/en-us/library/cc196988(v=vs.85).aspx
     */
    var isNativeQuerySupported =
        (document.documentMode && document.documentMode >= 8) ||
        (!!document.querySelector);

    /*
     * Checks whether two nodes are equal to one another.
     */
    function isNodeEquals(node, until) {
        if (!node) {
            return false;
        }

        if (!until) {
            return false;
        }

        return $(node) === $(until);
    }

    /*
     * Does the node hava that class?
     */
    function hasClassName(node, name) {
        return node && node.className.indexOf(name) > -1;
    }

    /*
     * Does the node have a given `attribute = value` pair?
     */
    function isAttributeEquals(node, attribute, value) {
        return getAttribute(node, attribute) === value;
    }

    /*
     * Does the node have a given attribute.
     */
    function hasAttribute(node, attribute) {
        return getAttribute(node, attribute) !== undefined;
    }

    /*
     * Does the node have a class?
     */
    function hasClassAttribute(node) {
        return node && !!node.className;
    }

    /*
     * Does the node have an id?
     */
    function hasIdAttribute(node) {
        return node && !!node.id;
    }

    /*
     * Filters a set of nodes into a smaller subset.
     */
    function filter(nodes, filterDelegate, filterArgs,
                breakDelegate, breakArgs, itemsCountCap, returnSingleItemAt,
                isReverse) {
        var result = [];
        var i = 0;
        var node = null;
        var fArgs = filterArgs;
        var counter = 0;
        var len = 0;

        if (!nodes) {
            return [];
        }

       var cache = [];

        if (!!isReverse) {
            for (i = nodes.length - 1; i >= 0; i--) {
                cache.push(nodes[i]);
            }
        } else {
            cache = nodes;
        }

        for (i = 0, len = cache.length; i < len; i++) {
            node = cache[i];

            if(breakDelegate) {
                breakArgs.unshift(node);

                if(breakDelegate.apply(node, breakArgs)) {
                    break;
                }
            }

            if (node.nodeType !== kTextNode) {
                if (filterDelegate) {
                    fArgs.unshift(node);

                    if(filterDelegate.apply(node, fArgs)) {
                        counter++;

                        if (!isNaN(returnSingleItemAt) &&
                                    returnSingleItemAt === counter) {
                            return node;
                        }

                        result.push(node);

                        if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                            break;
                        }
                    }
                } else {
                    counter++;

                    if (!isNaN(returnSingleItemAt) &&
                                returnSingleItemAt === counter) {
                        return node;
                    }

                    result.push(node);

                    if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                        break;
                    }
                }
            }
        }

        if (!isNaN(returnSingleItemAt)) {
            return null;
        }

        return result;
    }

    /*
     * A multipurpose method to get next/previous sibling(s).
     */
    //TODO: this name is misleading, rename
    function getNextSiblings(elm,
                filterDelegate, filterArgs,
                breakDelegate, breakArgs,
                name, itemsCountCap, returnSingleItemAt,
                shouldStartAtFirstSibling, isReverse) {
        if (!elm) {
            return [];
        }

        var next = null;
        var result = [];
        var counter = 0;

        while (true) {
            if (!next && !!shouldStartAtFirstSibling) {
                next = !!isReverse ?
                    elm.parentNode.lastChild :
                    elm.parentNode.firstChild;
            } else {
                next = !!isReverse ?
                    elm.getPreviousSibling :
                    elm.getNextSibling;
            }

            if(breakDelegate) {
                breakArgs.unshift(next);

                if(breakDelegate.apply(next, breakArgs)) {
                    break;
                }
            }

            if (next.nodeType !== kTextNode) {
                if (name) {
                    if (next.nodeName === name) {
                        if (filterDelegate) {
                            filterArgs.unshift(next);

                            if (filterDelegate.apply(next, filterArgs)) {
                                counter++;

                                if (!isNaN(returnSingleItemAt) &&
                                            returnSingleItemAt === counter) {
                                    return next;
                                }

                                result.push(next);


                                if (!isNaN(itemsCountCap) &&
                                            itemsCountCap <= counter) {
                                    break;
                                }
                            }
                        } else {
                            counter++;

                            if (!isNaN(returnSingleItemAt)&&
                                        returnSingleItemAt === counter) {
                                return next;
                            }

                            result.push(next);


                            if (!isNaN(itemsCountCap) &&
                                        itemsCountCap <= counter) {
                                break;
                            }
                        }
                    }
                } else {
                    if (filterDelegate) {
                        filterArgs.unshift(next);

                        if (filterDelegate.apply(next, filterArgs)) {
                            counter++;

                            if (!isNaN(returnSingleItemAt) &&
                                        returnSingleItemAt === counter) {
                                return next;
                            }

                            result.push(next);

                            if (!isNaN(itemsCountCap) &&
                                        itemsCountCap <= counter) {
                                break;
                            }
                        }
                    } else {
                        counter++;

                        if (!isNaN(returnSingleItemAt) &&
                                    returnSingleItemAt === counter) {
                            return next;
                        }

                        result.push(next);

                        if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                            break;
                        }
                    }
                }
            }

            if (!next) {
                break;
            }
        }

        if (returnSingleItemAt !== undefined) {
            return null;
        }

        return result;
    }

    /*
     * A multifunctional method to get next/previous parent(s).
     */
    //TODO: this name is misleading, rename.
    function getParents(elm,
                filterDelegate, filterArgs,
                breakDelegate, breakArgs,
                name, itemsCountCap, returnSingleItemAt
    ) {
        if (!elm) {
            return [];
        }

        var result = [];
        var target = $(elm);
        var counter = 0;

        target = target.parentNode;

        while (target) {
            if(breakDelegate) {
                breakArgs.unshift(target);

                if(breakDelegate.apply(target, breakArgs)) {
                    break;
                }
            }

            if (name) {
                if (target.nodeName.toLowerCase() === name.toLowerCase()) {
                    if (filterDelegate) {
                        filterArgs.unshift(target);

                        if (filterDelegate.apply(target, filterArgs)) {
                            counter++;

                            if (!isNaN(returnSingleItemAt) &&
                                        returnSingleItemAt === counter) {
                                return target;
                            }

                            result.push(target);

                            if (!isNaN(itemsCountCap) &&
                                        itemsCountCap <= counter) {
                                break;
                            }
                        }
                    } else {
                        counter++;

                        if (!isNaN(returnSingleItemAt) &&
                                    returnSingleItemAt === counter) {
                            return target;
                        }

                        result.push(target);

                        if (!isNaN(itemsCountCap) &&
                                    itemsCountCap <= counter) {
                            break;
                        }
                    }
                }
            } else {
                if (filterDelegate) {
                    filterArgs.unshift(target);

                    if (filterDelegate.apply(target, filterArgs)) {
                        counter++;

                        if (!isNaN(returnSingleItemAt) &&
                                    returnSingleItemAt === counter) {
                            return target;
                        }

                        result.push(target);

                        if (!isNaN(itemsCountCap) &&
                                    itemsCountCap <= counter) {
                            break;
                        }
                    }
                } else {
                    counter++;

                    if (!isNaN(returnSingleItemAt) &&
                                returnSingleItemAt === counter) {
                        return target;
                    }

                    result.push(target);

                    if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                        break;
                    }
                }
            }

            target = target.parentNode;
        }

        return result;
    }

    /*
     * Gets child nodes of the elm.
     */
    function getChildNodes(elm, name) {
        var items = elm ? elm.childNodes : [];
        var item = null;
        var i = 0;
        var len = 0;
        var result = [];

        if (!elm) {
            return [];
        }

        if (name) {
            for(i = 0, len = items.length; i < len; i++) {
                item = items[i];

                if (item.nodeName.toLowerCase() === name.toLowerCase()) {
                    result.push(item);
                }
            }
        } else {
            result = items;
        }

        return result;
    }

    /*
     * Executes the filter.
     */
    function execFilter(elm, getter, getterParams,
                checker, checkerParams, stopper, stopperParams, itemsCountCap,
                returnSingleItemAt, isReverse) {
        var target = $(elm);

        if (!target) {
            return [];
        }

        getterParams.unshift(target);

        return filter(
            getter.apply(target, getterParams),
            checker, checkerParams, stopper, stopperParams, itemsCountCap,
            returnSingleItemAt, isReverse
        );
    }

    /**
     * function {static} o2.DomHelper.getChildren
     *
     * <p>Gets the immediate children (that are not text nodes) of the
     * element.</p>
     *
     * @param {Object} elm - the <strong>DOM</strong> node, or the
     * <strong>id</strong> of that node.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    def(me, 'getChildren', function(elm, name) {
        return execFilter(elm, getChildNodes, [name]);
    });

    /*
     *
     */
    var getChildren = require(kModuleName, 'getChildren');

    /**
     * function {static} o2.DomHelper.getChildrenByAttribute
     *
     * <p>Gets the immediate children (that are not text nodes) of the
     * element, if they have a matching <strong>attribute</strong> with
     * a given <strong>value</strong>.</p>
     *
     * @param {Object} elm - the <strong>DOM</strong> njode, or the
     * <strong>id</strong> of that node.
     * @param {String} attr - the name of the attribute.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (optional, defaults to <code>undefined</code>)
     * if given, the result is filtered by the given node name as well.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    def(me, 'getChildrenByAttribute', function(elm, attr, value, name) {
        // TODO: this comment will be irrelevant after fixing
        // https://github.com/v0lkan/o2.js/issues/58
        //
        // IE7 and IE8 support attribute selectors only if a
        // !DOCTYPE is specified. To maintain compatibility we implement
        // attribute selector without using document.querySelector

        return execFilter(elm, getChildNodes, [name],
            isAttributeEquals, [attr, value]);
    });

    /*
     *
     */
    var getChildrenByAttribute = require(kModuleName, 'getChildrenByAttribute');

    /**
     * @function {static} o2.DomHelper.getChildrenByAttributeUntil
     *
     * <p>Gets the children of the element until a given node (exclusive).</p>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attr - attribute name.
     * @param {String} value - attribute value.
     * @param {Object} until - The node to seek until, or its
     * <code>String</code> id.
     * @param {String} name - (Optional, defaults to <code>undefined</code>) If
     * given only items with that node name (i.e. tag name) are selected.
     *
     * @return and <code>Array</code> of selected nodes.
     */
    def(me, 'getChildrenByAttributeUntil', function(elm, attr, value, until,
                name) {
        return execFilter(elm, getChildNodes, [name],
            isAttributeEquals, [attr, value], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenByAttributeUntil = require(kModuleName,
        'getChildrenByAttributeUntil');

    if (isNativeQuerySupported) {

        /**
         * @function {static} o2.DomHelper.getChildrenByClass
         *
         * <p>Gets the children of the element having a specific class.</p>
         *
         * @param {Object} elm -
         * @param {String} className -
         * @param {String} name -
         */
        def(me, 'getChildrenByClass', function(elm, className, name) {
            var el = $(elm);

            // NOTE: IE7+ supports child selector ( > ),
            // IE8+ supports querySelectorAll
            // So it's safe to use the child selector with querySelectorAll:
            // It'll work as expected in IE8+ and it'll degrade gracefully
            // in IE7-

            if (!el.id) {
                el.id = [myName, generateGuid()].join(kEmpty);
            }

            if (name) {
                return el.querySelectorAll(
                    format(kImmediateClassAndTagSelector, el.id, name,
                        className)
                );
            }

            return el.querySelectorAll(
                format(kImmediateClassSelector, el.id, className)
            );
        });
    } else {

        /**
         *
         */
        def(me, 'getChildrenByClass', function(elm, className, name) {
            return execFilter(elm, getChildNodes, [name],
                hasClassName, [className]);
        });
    }

    /*
     *
     */
    var getChildrenByClass = require(kModuleName, 'getChildrenByClass');

    /**
     * @function {static} o2.DomHelper.getChildrenByClassUntil
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getChildrenByClassUntil', function(elm, className, until, name) {
        return execFilter(elm, getChildNodes, [name],
            hasClassName, [className], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenByClassUntil = require(kModuleName,
        'getChildrenByClassUntil');

    /**
     * @function {static} o2.DomHelper.getChildrenUntil
     *
     * @param {Object} elm -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getChildrenUntil', function(elm, until, name) {
        return execFilter(elm, getChildNodes, [name],
            null, [], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenUntil = require(kModuleName, 'getChildrenUntil');

    /**
     * @function {static} o2.DomHelper.getChildrenWithAttribute
     *
     * @parma {Object} elm -
     * @param {String} attribute -
     * @parma {String} name -
     *
     * @return
     */
    def(me, 'getChildrenWithAttribute', function(elm, attribute, name) {
        return execFilter(elm, getChildNodes, [name],
            hasAttribute, [attribute]);
    });

    /*
     *
     */
    var getChildrenWithAttribute = require(kModuleName,
        'getChildrenWithAttribute');

    /**
     * @function {static} o2.DomHelper.getChildrenWithAttributeUntil
     *
     * @parma {Object} elm -
     * @param {String} attribute -
     * @param {Object} until -
     * @parma {String} name -
     *
     * @return
     */
    def(me, 'getChildrenWithAttributeUntil', function(elm, attribute, until,
                name) {
        return execFilter(elm, getChildNodes, [name],
            hasAttribute, [attribute], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenWithAttributeUntil = require(kModuleName,
        'getChildrenWithAttributeUntil');

    /**
     * @function {static} o2.DomHelper.getChildrenWithClass
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getChildrenWithClass', function(elm, name) {
        return execFilter(elm, getChildNodes, [name], hasClassAttribute, []);
    });

    /*
     *
     */
    var getChildrenWithClass = require(kModuleName, 'getChildrenWithClass');

    /**
     * @function {static} o2.DomHelper.getChildrenWithClassUntil
     *
     * @param {Object} elm -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getChildrenWithClassUntil', function(elm, until, name) {
        return execFilter(elm, getChildNodes, [name],
            hasClassAttribute, [], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenWithClassUntil = require(kModuleName,
        'getChildrenWithClassUntil');

    /**
     * @function {static} o2.DomHelper.getChildrenWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getChildrenWithId', function(elm, name) {
        return execFilter(elm, getChildNodes, [name], hasIdAttribute, []);
    });

    /*
     *
     */
    var getChildrenWithId = require(kModuleName, 'getChildrenWithId');

    /**
     * @function {static} o2.DomHelper.getChildrenWithIdUntil
     *
     * @param {Object} elm -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getChildrenWithIdUntil', function(elm, until, name) {
        return execFilter(elm, getChildNodes, [name],
            hasIdAttribute, [], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenWithIdUntil = require(kModuleName, 'getChildrenWithIdUntil');

    /**
     * @function {static} o2.DomHelper.getElements
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
     def(me, 'getElements', function(elm, name) {
        var target = $(elm);

        if (!target) {
            return [];
        }

        return target.getElementsByTagName(name || kAll);
     });

    /*
     *
     */
    var getElements = require(kModuleName, 'getElements');

    /**
     * @function {static} o2.DomHelper.getElementsByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getElementsByAttribute', function(elm, attribute, value, name) {
        return execFilter(elm, getElements, [name],
            isAttributeEquals, [attribute, value]);
    });

    /**
     * @function {static} o2.DomHelper.getElementsByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getElementsByClass', function(elm, className, name) {
        return execFilter(elm, getElements, [name], hasClassName, [className]);
    });

    /**
     * @function {static} o2.DomHelper.getElementsWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getElementsWithAttribute', function(elm, attribute, name) {
        return execFilter(elm, getElements, [name],
            hasAttribute, [attribute], null, []);
    });

    /**
     * @function {static} o2.DomHelper.getElementsWithClass
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getElementsWithClass', function(elm, name) {
        return execFilter(elm, getElements, [name],
            hasClassAttribute, [], null, []);
    });

    /**
     * @function {static} o2.DomHelper.getElementsWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getElementsWithId', function(elm, name) {
        return execFilter(elm, getElements, [name], hasIdAttribute, []);
    });

    /**
     * @function {static} o2.DomHelper.getSiblings
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblings', function(elm, name) {
        return !elm ? [] : getChildren(elm.parentNode, name);
    });

    /*
     *
     */
    var getSiblings = require(kModuleName, 'getSiblings');

    /**
     * @function {static} o2.DomHelper.getSiblingsByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblingsByAttribute', function(elm, attribute, value, name) {
        return !elm ? [] : getChildrenByAttribute(elm.parentNode,
            attribute, value, name);
    });

    /**
     * @function {static} o2.DomHelper.getSiblingsByAttributeUntil
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblingsByAttributeUntil', function(elm, attribute, value,
            until, name) {
        return !elm ? [] : getChildrenByAttributeUntil(elm.parentNode,
            attribute, value, until, name);
    });

    /**
     * @function {static} o2.DomHelper.getSiblingsByClass
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblingsByClass', function(elm, name) {
        return !elm ? [] : getChildrenByClass(elm.parentNode, name);
    });

    /**
     * @function {static} o2.DomHelper.getSiblingsByClassUntil
     *
     * @param {Object} elm -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblingsByClassUntil', function(elm, until, name) {
        return !elm ? [] : getChildrenByClassUntil(elm.parentNode, until,
            name);
    });

    /**
     * @function {static} o2.DomHelper.getSiblingsUntil
     *
     * @param {Object} elm -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblingsUntil',  function(elm, until, name) {
        return !elm ? [] : getChildrenUntil(elm.parentNode, until, name);
    });

    /**
     * @function {static} o2.DomHelper.getSiblingsWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblingsWithAttribute',  function(elm, attribute, name) {
        return !elm ? [] : getChildrenWithAttribute(elm.parentNode,
            attribute, name);
    });

    /**
     * @function {static} o2.DomHelper.getSiblingsWithAttributeUntil
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblingsWithAttributeUntil',  function(elm, attribute, until,
                name) {
        return !elm ? [] : getChildrenWithAttributeUntil(elm.parentNode,
            attribute, until, name);
    });

    /**
     * @function {static} o2.DomHelper.getSiblingsWithClass
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblingsWithClass',  function(elm, name) {
        return !elm ? [] : getChildrenWithClass(elm.parentNode, name);
    });

    /**
     * @function {static} o2.DomHelper.getSiblingsWithClassUntil
     *
     * @param {Object} elm -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblingsWithClassUntil',  function(elm, until, name) {
        return !elm ? [] : getChildrenWithClassUntil(elm.parentNode, until,
            name);
    });

    /**
     * @function {static} o2.DomHelper.getSiblingsWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblingsWithId',  function(elm, name) {
        return !elm ? [] : getChildrenWithId(elm.parentNode, name);
    });

    /**
     * @function {static} o2.DomHelper.getSiblingsWithIdUntil
     *
     * @param {Object} elm -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getSiblingsWithIdUntil',  function(elm, until, name) {
        return !elm ? [] : getChildrenWithIdUntil(elm.parentNode, until, name);
    });

    /**
     * @function {static} o2.DomHelper.getFirst
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirst', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirst = require(kModuleName, 'getFirst');

    /**
     * @function {static} o2.DomHelper.getFirstByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirstByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirstByAttribute = require(kModuleName, 'getFirstByAttribute');

    /**
     * @function {static} o2.DomHelper.getFirstByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirstByClass', function(elm, className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirstByClass = require(kModuleName, 'getFirstByClass');

    /**
     * @function {static} o2.DomHelper.getFirstWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirstWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirstWithAttribute = require(kModuleName, 'getFirstWithAttribute');

    /**
     * @function {static} o2.DomHelper.getFirstWithClass
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirstWithClass', function(elm, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirstWithClass = require(kModuleName, 'getFirstWithClass');

    /**
     * @function {static} o2.DomHelper.getFirstWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirstWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirstWithId = require(kModuleName, 'getFirstWithId');

    /**
     * @function {static} o2.DomHelper.getFirstChild
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirstChild', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getFirst(elm.firstChild, name);
    });

    /**
     * @function {static} o2.DomHelper.getFirstChildByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirstChildByAttribute', function(elm, attribute, value, name) {
        if (!elm) {
            return null;
        }

        return getFirstByAttribute(elm.firstChild, attribute, value, name);
    });

    /**
     * @function {static} o2.DomHelper.getFirstChildByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirstChildByClass', function(elm, className, name) {
        if (!elm) {
            return null;
        }

        return getFirstByClass(elm.firstChild, className, name);
    });

    /**
     * @function {static} o2.DomHelper.getFirstChildWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirstChildWithAttribute', function(elm, attribute, name) {
        if (!elm) {
            return null;
        }

        return getFirstWithAttribute(elm.firstChild, attribute, name);
    });

    /**
     * @function {static} o2.DomHelper.getFirstChildWithClass
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirstChildWithClass', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getFirstWithClass(elm.firstChild, name);
    });

    /**
     * @function {static} o2.DomHelper.getFirstChildWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getFirstChildWithId', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getFirstWithId(elm.firstChild, name);
    });

    /**
     * @function {static} o2.DomHelper.getLast
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLast', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name,
            null, 0, true, true);
    });

    /*
     *
     */
    var getLast = require(kModuleName, 'getLast');

    /**
     * @function {static} o2.DomHelper.getLastByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLastByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    var getLastByAttribute = require(kModuleName, 'getLastByAttribute');

    /**
     * @function {static} o2.DomHelper.getLastByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLastByClass', function(elm, className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    var getLastByClass = require(kModuleName, 'getLastByClass');

    /**
     * @function {static} o2.DomHelper.getLastWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLastWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    var getLastWithId = require(kModuleName, 'getLastWithId');

    /**
     * @function {static} o2.DomHelper.getLastWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLastWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    var getLastWithAttribute = require(kModuleName, 'getLastWithAttribute');

    /**
     * @function {static} o2.DomHelper.getLastWithClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLastWithClass', function(elm, className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    var getLastWithClass = require(kModuleName, 'getLastWithClass');

    /**
     * @function {static} o2.DomHelper.getLastChild
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLastChild', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getLast(elm.lastChild, name);
    });

    /**
     * @function {static} o2.DomHelper.getLastChildByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLastChildByAttribute', function(elm, attribute, value, name) {
        if (!elm) {
            return null;
        }

        return getLastByAttribute(elm.lastChild, attribute, value, name);
    });

    /**
     * @function {static} o2.DomHelper.getLastChildByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLastChildByClass', function(elm, className, name) {
        if (!elm) {
            return null;
        }

        return getLastByClass(elm.lastChild, className, name);
    });

    /**
     * @function {static} o2.DomHelper.getLastChildWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLastChildWithAttribute', function(elm, attribute, name) {
        if (!elm) {
            return null;
        }

        return getLastWithAttribute(elm.lastChild, attribute, name);
    });

    /**
     * @function {static} o2.DomHelper.getLastChildWithClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLastChildWithClass', function(elm, className, name) {
        if (!elm) {
            return null;
        }

        return getLastWithClass(elm.lastChild, className, name);
    });

    /**
     * @function {static} o2.DomHelper.getLastChildWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getLastChildWithId', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getLastWithId(elm.lastChild, name);
    });

    /**
     * @function {static} o2.DomHelper.getNext
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNext', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getNextByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getNextByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextByClass', function(elm, className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getNextWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getNextWithClass
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextWithClass', function(elm, name) {
        return getNextSiblings(elm,hasClassAttribute, [],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getNextWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getNextAll
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextAll', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name);
    });

    /*
     *
     */
    var getNextAll = require(kModuleName, 'getNextAll');

    /**
     * @function {static} o2.DomHelper.getNextAllByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextAllByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name);
    });

    /**
     * @function {static} o2.DomHelper.getNextAllByAttributeUntil
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextAllByAttributeUntil', function(elm, attribute, value, until,
                name) {
        return getNextSiblings(elm,
            isAttributeEquals, [attribute, value], isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.DomHelper.getNextAllByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextAllByClass', function(elm, className, name) {
        return getNextSiblings(elm, hasClassName, [className], null, [], name);
    });

    /**
     * @function {static} o2.DomHelper.getNextAllByClassUntil
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextAllByClassUntil', function(elm, className, until, name) {
        return getNextSiblings(elm, hasClassName, [className],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.DomHelper.getNextAllUntil
     *
     * @param {Object} elm -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextAllUntil', function(elm, until, name) {
        return getNextSiblings(elm, null, [], isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.DomHelper.getNextAllWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextAllWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute], null, [], name);
    });

    /**
     * @function {static} o2.DomHelper.getNextAllWithAttributeUntil
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextAllWithAttributeUntil', function(elm, attribute, until,
                name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.DomHelper.getNextAllWithClass
     *
     * @param {Object} elm -
     * @param {String} name =
     *
     * @return
     */
    def(me, 'getNextAllWithClass', function(elm, name) {
        return getNextSiblings(elm, hasClassAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.DomHelper.getNextAllWithClassUntil
     *
     * @param {Object} elm -
     * @param {Oject} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextAllWithClassUntil', function(elm, until, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.DomHelper.getNextAllWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextAllWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.DomHelper.getNextAllWithIdUntil
     *
     * @param {Object} elm -
     * @param {Object} until -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNextAllWithIdUntil', function(elm, until, name) {
        return getNextSiblings(elm, hasIdAttribute, [], isNodeEquals, [until],
            name);
    });

    /**
     * @function {static} o2.DomHelper.getNth
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNth', function(elm, n, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, n, true);
    });

    var getNth = require(kModuleName, 'getNth');

    /**
     * @function {static} o2.DomHelper.getNthByAttribute
     *
     * @param {Object} elm -
     * @laram {String} attribute -
     * @param {String} value -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthByAttribute', function(elm, attribute, value, n, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, n, true);
    });

    /*
     *
     */
    var getNthByAttribute = require(kModuleName, 'getNthByAttribute');

    /**
     * @function {static} o2.DomHelper.getNthByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthByClass', function(elm, className, n, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, n, true);
    });

    /*
     *
     */
    var getNthByClass = require(kModuleName, 'getNthByClass');

    /**
     * @function {static} o2.DomHelper.getNthWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthWithAttribute', function(elm, attribute, n, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, n, true);
    });

    /*
     *
     */
    var getNthWithAttribute = require(kModuleName, 'getNthWithAttribute');

    /**
     * @function {static} o2.DomHelper.getNthWithClass
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthWithClass', function(elm, n, name) {
        return getNextSiblings(elm, hasClassAttribute, [], null, [],
            name, null, n, true);
    });

    /*
     *
     */
    var getNthWithClass = require(kModuleName, 'getNthWithClass');

    /**
     * @function {static} o2.DomHelper.getNthWithId
     *
     * @parma {Object} elm -
     * @param {Integer} n -
     * @param {Stringg} name -
     *
     * @return
     */
    def(me, 'getNthWithId', function(elm, n, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, n, true);
    });

    /*
     *
     */
    var getNthWithId = require(kModuleName, 'getNthWithId');

    /**
     * @function {static} o2.DomHelper.getNthChild
     *
     * @parma {Object} elm -
     * @param {Integer} n -
     * @param {Stringg} name -
     *
     * @return
     */
    def(me, 'getNthChild', function(elm, n, name) {
        if (!elm) {
            return null;
        }

        return getNth(elm.firstChild, n, name);
    });

    /**
     * @function {static} o2.DomHelper.getNthChildByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthChildByAttribute', function(elm, attribute, value, n, name) {
        if (!elm) {
            return null;
        }

        return getNthByAttribute(elm.firstChild, attribute, value, n, name);
    });

    /**
     * @function {static} o2.DomHelper.getNthChildByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthChildByClass', function(elm, className, n, name) {
        if (!elm) {
            return null;
        }

        return getNthByClass(elm.firstChild, className, n, name);
    });

    /**
     * @function {static} o2.DomHelper.getNthChildWithAttribute
     *
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthChildWithAttribute', function(elm, attribute, n, name) {
        if (!elm) {
            return null;
        }

        return getNthWithAttribute(elm.firstChild, attribute, n, name);
    });

    /**
     * @function {static} o2.DomHelper.getNthChildWithClass
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthChildWithClass', function(elm, n, name) {
        if (!elm) {
            return null;
        }

        return getNthWithClass(elm.firstChild, n, name);
    });

    /**
     * @function {static} o2.DomHelper.getNthChildWithId
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthChildWithId', function(elm, n, name) {
        if (!elm) {
            return null;
        }

        return getNthWithId(elm.firstChild, n, name);
    });

    /**
     * @function {static} o2.DomHelper.getNthNext
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthNext', function(elm, n, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthNextByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthNextByAttribute', function(elm, attribute, value, n, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthNextByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthNextByClass', function(elm, className, n, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthNextWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthNextWithAttribute', function(elm, attribute, n, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthNextWithClass
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthNextWithClass', function(elm, n, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthNextWithId
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthNextWithId', function(elm, n, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthParent
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthParent', function(elm, n, name) {
        return getParents(elm, null, [], null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthParentByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthParentByAttribute', function(elm, attribute, value, n,
                name) {
        return getParents(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthParentByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthParentByClass', function(elm, className, n, name) {
        return getParents(elm, hasClassName, [className],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthParentWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthParentWithAttribute', function(elm, attribute, n, name) {
        return getParents(elm, hasAttribute, [attribute],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthParentWithClass
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthParentWithClass', function(elm, n, name) {
        return getParents(elm, hasClassAttribute, [],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthParentWithId
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthParentWithId', function(elm, n, name) {
       return getParents(elm, hasIdAttribute, [],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.DomHelper.getNthPrev
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthPrev', function(elm, n, name) {
        return getNextSiblings(elm, null, [], null, [],
            name, null, n, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getNthPrevByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthPrevByAttribute', function(elm, attribute, value, n, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, n, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getNthPrevByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthPrevByClass', function(elm, className, n, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, n, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getNthPrevWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthPrevWithAttribute', function(elm, attribute, n, name) {
       return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, n, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getNthPrevWithClass
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthPrevWithClass', function(elm, n, name) {
       return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, n, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getNthPrevWithId
     *
     * @param {Object} elm -
     * @param {Integer} n -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getNthPrevWithId', function(elm, n, name) {
       return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, n, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getParent
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParent', function(elm, name) {
        return getParents(elm, null, [], null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getParentByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentByAttribute', function(elm, attribute, value, name) {
        return getParents(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getParentByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentByClass', function(elm, className, name) {
        return getParents(elm, hasClassName, [className],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getParentWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentWithAttribute', function(elm, attribute, name) {
        return getParents(elm, hasAttribute, [attribute],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getParentWithClass
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentWithClass', function(elm, name) {
        return getParents(elm, hasClassAttribute, [],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getParentWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentWithId', function(elm, name) {
        return getParents(elm, hasIdAttribute, [], null, [], name, null, 0);
    });

    /**
     * @function {static} o2.DomHelper.getParents
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParents', function(elm, name) {
        return getParents(elm, null, [], null, [], name);
    });

    /**
     * @function {static} o2.DomHelper.getParentsByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentsByAttribute', function(elm, attribute, value, name) {
        return getParents(elm, isAttributeEquals, [attribute, value],
            null, [], name);
    });

    /**
     * @function {static} o2.DomHelper.getParentsByAttributeUntil
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentsByAttributeUntil', function(elm, attribute, value,
                until, name) {
        return getParents(elm, isAttributeEquals, [attribute, value],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.DomHelper.getParentsByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentsByClass', function(elm, className, name) {
        return getParents(elm, hasClassName, [className], null, [], name);
    });

    /**
     * @function {static} o2.DomHelper.getParentsByClassUntil
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentsByClassUntil', function(elm, className, until, name) {
        return getParents(elm, hasClassName, [className],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.DomHelper.getParentsUntil
     *
     * @param {Object} elm -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentsUntil', function(elm, until, name) {
        return getParents(elm, null, [], isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.DomHelper.getParentsWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentsWithAttribute', function(elm, attribute, name) {
        return getParents(elm, hasAttribute, [attribute], null, [], name);
    });

    /**
     * @function {static} o2.DomHelper.getParentsWithAttributeUntil
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentsWithAttributeUntil', function(elm, attribute, until,
                name) {
        return getParents(elm, hasAttribute, [attribute],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.DomHelper.getParentsWithClass
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentsWithClass', function(elm, name) {
        return getParents(elm, hasClassAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.DomHelper.getParentsWithClassUntil
     *
     * @param {Object} elm -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentsWithClassUntil', function(elm, until, name) {
        return getParents(elm, hasClassAttribute, [],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.DomHelper.getParentsWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentsWithId', function(elm, name) {
        return getParents(elm, hasIdAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.DomHelper.getParentsWithIdUntil
     *
     * @param {Object} elm -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getParentsWithIdUntil', function(elm, until, name) {
        return getParents(elm, hasIdAttribute, [],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.DomHelper.getPrev
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */

    def(me, 'getPrev', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [],
            name, null, 0, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevByClass', function(elm, className, name) {
       return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevWithClass
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevWithClass', function(elm, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevAll
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAll', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [],
            name, null, null, false, true);
    });

    /*
     *
     */
    var getPrevAll = require(kModuleName, 'getPrevAll');

    /**
     * @function {static} o2.DomHelper.getPrevAllByAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAllByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevAllByAttributeUntil
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} value -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAllByAttributeUntil', function(elm, attribute, value,
                until, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevAllByClass
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAllByClass', function(elm, className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevAllByClassUntil
     *
     * @param {Object} elm -
     * @param {String} className -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAllByClassUntil', function(elm, className, until, name) {
        return getNextSiblings(elm, hasClassName, [className],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevAllUntil
     *
     * @param {Object} elm -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAllUntil', function(elm, until, name) {
        return getNextSiblings(elm, null, [], isNodeEquals, [until],
            name, null, null, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevAllWithAttribute
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAllWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute], null, [],
            name, null, null, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevAllWithAttributeUntil
     *
     * @param {Object} elm -
     * @param {String} attribute -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAllWithAttributeUntil', function(elm, attribute, until,
                name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevAllWithClass
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAllWithClass', function(elm, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevAllWithClassUntil
     *
     * @param {Object} elm -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAllWithClassUntil', function(elm, until, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevAllWithId
     *
     * @param {Object} elm -
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAllWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.DomHelper.getPrevAllWithIdUntil
     *
     * @param {Object} elm -
     * @param {Object} until-
     * @param {String} name -
     *
     * @return
     */
    def(me, 'getPrevAllWithIdUntil', function(elm, until, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.DomHelper.isChild
     *
     * @param {Object} elm -
     * @param {Object} ref -
     *
     * @return
     */
    def(me, 'isChild', function(elm, ref) {
        if (!ref) {
            return false;
        }

        return contains(getChildren(ref), elm);
    });

    /**
     * @function {static} o2.DomHelper.isNext
     *
     * @param {Object} elm -
     * @param {Object} ref -
     *
     * @return
     */
    def(me, 'isNext', function(elm, ref) {
        if (!ref) {
            return false;
        }

        return contains(getNextAll(ref), elm);
    });

    /**
     * @function {static} o2.DomHelper.isParent
     *
     * @param {Object} elm -
     * @param {Object} ref -
     *
     * @return
     */
    def(me, 'isParent', function(elm, ref) {
        if (!ref) {
            return false;
        }

        return contains(getParents(ref), elm);
    });

    /*
     *
     */
    var isParent = require(kModuleName, 'isParent');

    /**
     * @function {static} o2.DomHelper.isParentOrSelf
     *
     * @param {Object} elm -
     * @param {Object} ref -
     *
     * @return
     */
    def(me, 'isParentOrSelf', function(elm, ref) {
        if (!ref) {
            return false;
        }

        if (ref === elm) {
            return true;
        }

        return isParent(elm, ref);
    });

    /**
     * @function {static} o2.DomHelper.isPrev
     *
     * @param {Object} elm -
     * @param {Object} ref -
     *
     * @return
     */
    def(me, 'isPrev', function(elm, ref) {
        if (!ref) {
            return false;
        }

        return contains(getPrevAll(ref), elm);
    });

    /**
     * @function {static} o2.DomHelper.isSibling
     *
     * @param {Object} elm -
     * @param {Object} ref -
     *
     * @return
     */
    def(me, 'isSibling', function(elm, ref) {
        if (!ref) {
            return false;
        }

        return contains(getSiblings(ref), elm);
    });
}(this.o2, this.document));
