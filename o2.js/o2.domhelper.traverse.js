/**
 * @module   domhelper.traverse
 * @requires core
 * @requires stringhelper.core
 * @requires domhelper.core
 * @requires domhelper.class
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-07 09:00:50.982507
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
     * DomHelper (traverse)
     */
    var me = create('DomHelper');

    /*
     * Aliases
     */

    var $      = require('$');
    var myName = require('name');

    var kAll   = '*';
    var kEmpty = '';

    var nodeType  = require('DomHelper', 'nodeType');
    var kTextNode = attr(nodeType, 'TEXT');

    var getAttribute = require('DomHelper', 'getAttribute');

    var kStringHelper = 'StringHelper';
    var format        = require(kStringHelper, 'format');
    var generateGuid  = require(kStringHelper, 'generateGuid');

    /*
     * Selectors
     */
    var kImmediateClassSelector       = '#{0} > .{1}';
    var kImmediateClassAndTagSelector = '#{0} > {1}.{2}';

    /*
     *
     */
    var isNativeQuerySupported = !!document.querySelector;

    /*
     * Checks whether two nodes are equal to one another.
     */
    function isNodeEquals(node, until) {
        return node === until;
    }

    /*
     * Does the node hava that class?
     */
    function hasClassName(node, name) {
        return node && node.className.indexOf(name) > -1;
    }

    /*
     *
     */
    function isAttributeEquals(node, attribute, value) {
        return getAttribute(node, attribute) === value;
    }

    /*
     *
     */
    function hasAttribute(node, attribute) {
        return getAttribute(node, attribute) !== undefined;
    }

    /*
     *
     */
    function hasClassAttribute(node) {
        return node && !!node.className;
    }

    /*
     *
     */
    function hasIdAttribute(node) {
        return node && !!node.id;
    }

    /*
     * Filters a set of nodes into a smaller subset.
     */
    function filter(nodes, filterDelegate, filterArgs,
                breakDelegate, breakArgs, itemsCountCap, returnSingleItemAt) {
        var result = [];
        var i = 0;
        var node = null;
        var fArgs = filterArgs;
        var counter = 0;
        var len = 0;

        if (!nodes) {
            return [];
        }

        for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];

            if(breakDelegate) {
                if(breakDelegate.apply(node, breakArgs.unshift(node))) {
                    break;
                }
            }

            if (node.nodeType !== kTextNode) {
                if (filterDelegate) {
                    if(filterDelegate.apply(node, fArgs.unshift(node))) {
                        counter++;

                        if (returnSingleItemAt !== undefined &&
                                    returnSingleItemAt === counter) {
                            return node;
                        }

                        result.push(node);

                        if (itemsCountCap && itemsCountCap <= counter) {
                            break;
                        }
                    }
                } else {
                    counter++;

                    if (returnSingleItemAt !== undefined &&
                                returnSingleItemAt === counter) {
                        return node;
                    }

                    result.push(node);

                    if (itemsCountCap && itemsCountCap <= counter) {
                        break;
                    }
                }
            }
        }

        if (returnSingleItemAt !== undefined) {
            return null;
        }

        return result;
    }

    /*
     *
     */
    function getNextSiblings(elm,
                filterDelegate, filterArgs,
                breakDelegate, breakArgs,
                name, itemsCountCap, returnSingleItemAt,
                shouldStartAtFirstSibling) {
        if (!elm) {
            return [];
        }

        var next = null;
        var result = [];
        var counter = 0;

        while (true) {
            if (!next && !!shouldStartAtFirstSibling) {
                next = elm.parentNode.firstChild;
            } else {
                next = elm.getNextSibling;
            }


            if(breakDelegate) {
                if(breakDelegate.apply(next, breakArgs.unshift(next))) {
                    break;
                }
            }

            if (next.nodeType !== kTextNode) {
                if (name) {
                    if (next.nodeName === name) {
                        if (filterDelegate) {
                            if (filterDelegate.apply(next,
                                        filterArgs.unshift(next))) {
                                counter++;

                                if (returnSingleItemAt !== undefined &&
                                            returnSingleItemAt === counter) {
                                    return next;
                                }

                                result.push(next);


                                if (itemsCountCap && itemsCountCap <= counter) {
                                    break;
                                }
                            }
                        } else {
                            counter++;

                            if (returnSingleItemAt !== undefined &&
                                        returnSingleItemAt === counter) {
                                return next;
                            }

                            result.push(next);


                            if (itemsCountCap && itemsCountCap <= counter) {
                                break;
                            }
                        }
                    }
                } else {
                    if (filterDelegate) {
                        if (filterDelegate.apply(next,
                                    filterArgs.unshift(next))) {
                            counter++;

                            if (returnSingleItemAt !== undefined &&
                                        returnSingleItemAt === counter) {
                                return next;
                            }

                            result.push(next);

                            if (itemsCountCap && itemsCountCap <= counter) {
                                break;
                            }
                        }
                    } else {
                        counter++;

                        if (returnSingleItemAt !== undefined &&
                                    returnSingleItemAt === counter) {
                            return next;
                        }

                        result.push(next);


                        if (itemsCountCap && itemsCountCap <= counter) {
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
     *
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
     *
     */
    function execFilter(elm, getter, getterParams,
                checker, checkerParams, stopper, stopperParams, itemsCountCap,
                returnSingleItemAt) {
        var target = $(elm);

        if (!target) {
            return [];
        }

        return filter(
            getter.apply(target, getterParams.unshift(target)),
            checker, checkerParams, stopper, stopperParams, itemsCountCap,
            returnSingleItemAt
        );
    }

    /*
     *
     */
    function getLastItem(items) {
        var len = items.length;

        return len ? items[len - 1] : null;
    }

    /*
     *
     */
    function getLastItemExecFilter() {
       getLastItem(execFilter.apply(null, arguments));
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
        return execFilter(
            elm, getChildNodes, [name],
            null, [],
            null, []
        );

        /*return filter(target.childNodes, name || kEmpty,
            returnTrue, [], true);*/
    });

    /*
     *
     */
    var getChildren = require('DomHelper', 'getChildren');

    /**
     * function {static} o2.DomHelper.getChildren
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
        // IE7 and IE8 support attribute selectors only if a
        // !DOCTYPE is specified. To maintain compatibility we implement
        // attribute selector without using document.querySelector

        return execFilter(
            elm, getChildNodes, [name],
            isAttributeEquals, [attr, value],
            null, []
        );
    });

    /*
     *
     */
    var getChildrenByAttribute = require('DomHelper', 'getChildrenByAttribute');

    /**
     *
     */
    def(me, 'getChildrenByAttributeUntil', function(elm, attr, value, until,
                name) {
        return execFilter(
            elm, getChildNodes, [name],
            isAttributeEquals, [attr, value],
            isNodeEquals, [until]
        );
    });

    /*
     *
     */
    var getChildrenByAttributeUntil = require('DomHelper',
        'getChildrenByAttributeUntil');

    if (isNativeQuerySupported) {

        /**
         *
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
            return execFilter(
                elm, getChildNodes, [name],
                hasClassName, [className],
                null, []
            );
        });
    }

    /*
     *
     */
    var getChildrenByClass = require('DomHelper', 'getChildrenByClass');

    /**
     *
     */
    def(me, 'getChildrenByClassUntil', function(elm, className, until, name) {
        return execFilter(
            elm, getChildrenByClass, [className, name],
            null, [],
            isNodeEquals, [until]
        );
    });

    /*
     *
     */
    var getChildrenByClassUntil = require('DomHelper',
        'getChildrenByClassUntil');

    /**
     *
     */
    def(me, 'getChildrenUntil', function(elm, until, name) {
        return execFilter(
            elm, getChildNodes, [name],
            null, [],
            isNodeEquals, [until]
        );
    });

    /*
     *
     */
    var getChildrenUntil = require('DomHelper', 'getChildrenUntil');

    /**
     *
     */
    def(me, 'getChildrenWithAttribute', function(elm, attribute, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasAttribute, [attribute],
            null, []
        );
    });

    /*
     *
     */
    var getChildrenWithAttribute = require('DomHelper',
        'getChildrenWithAttribute');

    /**
     *
     */
    def(me, 'getChildrenWithAttributeUntil', function(elm, attribute, until,
                name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasAttribute, [attribute], true,
            isNodeEquals, [until], true
        );
    });

    /*
     *
     */
    var getChildrenWithAttributeUntil = require('DomHelper',
        'getChildrenWithAttributeUntil');

    /**
     *
     */
    def(me, 'getChildrenWithClass', function(elm, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasClassAttribute, [],
            null, []
        );
    });

    /*
     *
     */
    var getChildrenWithClass = require('DomHelper', 'getChildrenWithClass');

    /**
     *
     */
    def(me, 'getChildrenWithClassUntil', function(elm, until, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasClassAttribute, [],
            isNodeEquals, [until]
        );
    });

    /*
     *
     */
    var getChildrenWithClassUntil = require('DomHelper',
        'getChildrenWithClassUntil');

    /**
     *
     */
    def(me, 'getChildrenWithId', function(elm, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasIdAttribute, [],
            null, []
        );
    });

    /*
     *
     */
    var getChildrenWithId = require('DomHelper', 'getChildrenWithId');

    /**
     *
     */
    def(me, 'getChildrenWithIdUntil', function(elm, until, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasIdAttribute, [],
            isNodeEquals, [until]
        );
    });

    /*
     *
     */
    var getChildrenWithIdUntil = require('DomHelper', 'getChildrenWithIdUntil');

    /**
     *
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
    var getElements = require('DomHelper', 'getElements');

    /**
     *
     */
    def(me, 'getElementsByAttribute', function(elm, attribute, value, name) {
        return execFilter(
            elm, getElements, [name],
            isAttributeEquals, [attribute, value],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getElementsByAttributeUntil', function(elm, attribute, value,
                until, name) {
        return execFilter(
            elm, getElements, [name],
            isAttributeEquals, [attribute, value],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getElementsByClass', function(elm, className, name) {
        return execFilter(
            elm, getElements, [name],
            hasClassName, [className],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getElementsByClassUntil', function(elm, className, until, name) {
        return execFilter(
            elm, getElements, [name],
            hasClassName, [className],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getElementsUntil', function(elm, until, name) {
        return execFilter(
            elm, getElements, [name],
            null, [],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithAttribute', function(elm, attribute, name) {
        return execFilter(
            elm, getElements, [name],
            hasAttribute, [attribute],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithAttributeUntil', function(elm, attribute, until,
                name) {
        return execFilter(
            elm, getElements, [name],
            hasAttribute, [attribute],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithClass', function(elm, name) {
        return execFilter(
            elm, getElements, [name],
            hasClassAttribute, [],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithClassUntil', function(elm, until, name) {
        return execFilter(
            elm, getElements, [name],
            hasClassAttribute, [],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithId', function(elm, name) {
        return execFilter(
            elm, getElements, [name],
            hasIdAttribute, [],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithIdUntil', function(elm, until, name) {
        return execFilter(
            elm, getElements, [name],
            hasIdAttribute, [],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getSiblings', function(elm, name) {
        return !elm ? [] : getChildren(elm.parentNode, name);
    });

    /*
     *
     */
    var getSiblings = require('DomHelper', 'getSiblings');

    /**
     *
     */
    def(me, 'getSiblingsByAttribute', function(elm, attribute, value, name) {
        return !elm ? [] : getChildrenByAttribute(elm.parentNode,
            attribute, value, name);
    });

    /**
     *
     */
    def(me, 'getSiblingsByAttributeUntil', function(elm, attribute, value,
            until, name) {
        return !elm ? [] : getChildrenByAttributeUntil(elm.parentNode,
            attribute, value, until, name);
    });

    /**
     *
     */
    def(me, 'getSiblingsByClass', function(elm, name) {
        return !elm ? [] : getChildrenByClass(elm.parentNode, name);
    });

    /**
     *
     */
    def(me, 'getSiblingsByClassUntil', function(elm, until, name) {
        return !elm ? [] : getChildrenByClassUntil(elm.parentNode, until,
            name);
    });

    /**
     *
     */
    def(me, 'getSiblingsUntil',  function(elm, until, name) {
        return !elm ? [] : getChildrenUntil(elm.parentNode, until, name);
    });

    /**
     *
     */
    def(me, 'getSiblingsWithAttribute',  function(elm, attribute, name) {
        return !elm ? [] : getChildrenWithAttribute(elm.parentNode,
            attribute, name);
    });

    /**
     *
     */
    def(me, 'getSiblingsWithAttributeUntil',  function(elm, attribute, until,
                name) {
        return !elm ? [] : getChildrenWithAttributeUntil(elm.parentNode,
            attribute, until, name);
    });

    /**
     *
     */
    def(me, 'getSiblingsWithClass',  function(elm, name) {
        return !elm ? [] : getChildrenWithClass(elm.parentNode, name);
    });

    /**
     *
     */
    def(me, 'getSiblingsWithClassUntil',  function(elm, until, name) {
        return !elm ? [] : getChildrenWithClassUntil(elm.parentNode, until,
            name);
    });

    /**
     *
     */
    def(me, 'getSiblingsWithId',  function(elm, name) {
        return !elm ? [] : getChildrenWithId(elm.parentNode, name);
    });

    /**
     *
     */
    def(me, 'getSiblingsWithIdUntil',  function(elm, until, name) {
        return !elm ? [] : getChildrenWithIdUntil(elm.parentNode, until, name);
    });

    /**
     *
     */
    def(me, 'getFirst', function(elm, name) {
        return execFilter(
            elm, getSiblings, [name],
            null, [],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstByAttribute', function(elm, attribute, value, name) {
        return execFilter(
            elm, getSiblings, [name],
            isAttributeEquals, [attribute, value],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstByClass', function(elm, className, name) {
        return execFilter(
            elm, getSiblings, [name],
            hasClassName, [className],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstWithAttribute', function(elm, attribute, name) {
        return execFilter(
            elm, getSiblings, [name],
            hasAttribute, [attribute],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstWithClass', function(elm, name) {
        return execFilter(
            elm, getSiblings, [name],
            hasClassAttribute, [],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstWithId', function(elm, name) {
        return execFilter(
            elm, getSiblings, [name],
            hasIdAttribute, [],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstChild', function(elm, name) {
        return execFilter(
            elm, getChildren, [name],
            null, [],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstChildByAttribute', function(elm, attribute, value, name) {
        return execFilter(
            elm, getChildren, [name],
            isAttributeEquals, [attribute, value],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstChildByClass', function(elm, className, name) {
        return execFilter(
            elm, getChildren, [name],
            hasClassName, [className],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstChildWithAttribute', function(elm, attribute, name) {
        return execFilter(
            elm, getChildren, [name],
            hasAttribute, [attribute],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstChildWithClass', function(elm, name) {
        return execFilter(
            elm, getChildren, [name],
            hasClassAttribute, [],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstChildWithId', function(elm, name) {
        return execFilter(
            elm, getChildren, [name],
            hasIdAttribute, [],
            null, [], 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getLast', function(elm, name) {
        return getLastItemExecFilter(
            elm, getSiblings, [name],
            null, [],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getLastByAttribute', function(elm, attribute, value, name) {
        return getLastItemExecFilter(
            elm, getSiblings, [name],
            isAttributeEquals, [attribute, value],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getLastByClass', function(elm, className, name) {
        return getLastItemExecFilter(
            elm, getSiblings, [name],
            hasClassName, [className],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getLastWithId', function(elm, name) {
        return getLastItemExecFilter(
            elm, getSiblings, [name],
            hasIdAttribute, [],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getLastWithAttribute', function(elm, attribute, name) {
        return getLastItemExecFilter(
            elm, getSiblings, [name],
            hasAttribute, [attribute],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getLastWithClass', function(elm, className, name) {
        return getLastItemExecFilter(
            elm, getSiblings, [name],
            hasClassName, [className],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getLastChild', function(elm, name) {
        return getLastItemExecFilter(
            elm, getChildren, [name],
            null, [],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getLastChildByAttribute', function(elm, attribute, value, name) {
        return getLastItemExecFilter(
            elm, getChildren, [name],
            isAttributeEquals, [attribute, value],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getLastChildByClass', function(elm, className, name) {
        return getLastItemExecFilter(
            elm, getChildren, [name],
            hasClassName, [className],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getLastChildWithAttribute', function(elm, attribute, name) {
        return getLastItemExecFilter(
            elm, getChildren, [name],
            hasAttribute, [attribute],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getLastChildWithClass', function(elm, className, name) {
        return getLastItemExecFilter(
            elm, getChildren, [name],
            hasClassName, [className],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getLastChildWithId', function(elm, name) {
        return getLastItemExecFilter(
            elm, getChildren, [name],
            hasIdAttribute, [],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getNext', function(elm, name) {
        return getNextSiblings(
            elm,
            null, [],
            null, [],
            name, 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getNextByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(
            elm,
            isAttributeEquals, [attribute, value],
            null, [],
            name, 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getNextByClass', function(elm, className, name) {
        return getNextSiblings(
            elm,
            hasClassName, [className],
            null, [],
            name, 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getNextWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(
            elm,
            hasAttribute, [attribute],
            null, [],
        name, 1)[0] || null;
    });

    /**
     *
     */
    def(me, 'getNextWithClass', function(elm, name) {
        return getNextSiblings(
            elm,
            hasClassAttribute, [],
            null, [],
            name, 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getNextWithId', function(elm, name) {
        return getNextSiblings(
            elm,
            hasIdAttribute, [],
            null, [],
            name, 1
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getNextAll', function(elm, name) {
        return getNextSiblings(
            elm,
            null, [],
            null, [],
            name, null
        );
    });

    /**
     *
     */
    def(me, 'getNextAllByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(
            elm,
            isAttributeEquals, [attribute, value],
            null, [],
            name, null
        );
    });

    /**
     *
     */
    def(me, 'getNextAllByAttributeUntil', function(elm, attribute, value, until,
                name) {
        return getNextSiblings(
            elm,
            isAttributeEquals, [attribute, value],
            isNodeEquals, [until],
            name, null
        );
    });

    /**
     *
     */
    def(me, 'getNextAllByClass', function(elm, className, name) {
        return getNextSiblings(
            elm,
            hasClassName, [className],
            null, [],
            name, null
        );
    });

    /**
     *
     */
    def(me, 'getNextAllByClassUntil', function(elm, className, until, name) {
        return getNextSiblings(
            elm,
            hasClassName, [className],
            isNodeEquals, [until],
            name, null
        );
    });


    /**
     *
     */
    def(me, 'getNextAllUntil', function(elm, until, name) {
        return getNextSiblings(
            elm,
            null, [],
            isNodeEquals, [until],
            name, null
        );
    });

    /**
     *
     */
    def(me, 'getNextAllWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(
            elm,
            hasAttribute, [attribute],
            null, [],
            name, null
        );
    });

    /**
     *
     */
    def(me, 'getNextAllWithAttributeUntil', function(elm, attribute, until,
                name) {
        return getNextSiblings(
            elm,
            hasAttribute, [attribute],
            isNodeEquals, [until],
            name, null
        );
    });

    /**
     *
     */
    def(me, 'getNextAllWithClass', function(elm, name) {
        return getNextSiblings(
            elm,
            hasClassAttribute, [],
            null, [],
            name, null
        );
    });

    /**
     *
     */
    def(me, 'getNextAllWithClassUntil', function(elm, until, name) {
        return getNextSiblings(
            elm,
            hasClassAttribute, [],
            isNodeEquals, [until],
            name, null
        );
    });

    /**
     *
     */
    def(me, 'getNextAllWithId', function(elm, name) {
        return getNextSiblings(
            elm,
            hasIdAttribute, [],
            null, [],
            name, null
        );
    });

    /**
     *
     */
    def(me, 'getNextAllWithIdUntil', function(elm, until, name) {
        return getNextSiblings(
            elm,
            hasIdAttribute, [],
            isNodeEquals, [until],
            name, null
        );
    });


    /**
     *
     */
    def(me, 'getNth', function(elm, n, name) {
        return getNextSiblings(
            elm,
            null, [],
            null, [],
            name, null, n, true
        );
    });

    /**
     *
     */
    def(me, 'getNthByAttribute', function(elm, attribute, value, n, name) {
        return getNextSiblings(
            elm,
            isAttributeEquals, [attribute, value],
            null, [],
            name, null, n, true
        );
    });

    /**
     *
     */
    def(me, 'getNthByClass', function(elm, className, n, name) {
        return getNextSiblings(
            elm,
            hasClassName, [className],
            null, [],
            name, null, n, true
        );
    });

    /**
     *
     */
    def(me, 'getNthWithAttribute', function(elm, attribute, n, name) {
        return getNextSiblings(
            elm,
            hasAttribute, [attribute],
            null, [],
            name, null, n, true
        );
    });

    /**
     *
     */
    def(me, 'getNthWithClass', function(elm, n, name) {
        return getNextSiblings(
            elm,
            hasClassAttribute, [],
            null, [],
            name, null, n, true
        );
    });

    /**
     *
     */
    def(me, 'getNthWithId', function(elm, n, name) {
        return getNextSiblings(
            elm,
            hasIdAttribute, [],
            null, [],
            name, null, n, true
        );
    });

    /**
     *
     */
    def(me, 'getNthChild', function(elm, n, name) {
        return execFilter(
            elm, getChildNodes, [name],
            null, [],
            null, [],
            null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthChildByAttribute', function(elm, attribute, value, n, name) {
        return execFilter(
            elm, getChildNodes, [name],
            isAttributeEquals, [attribute, value],
            null, [],
            null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthChildByClass', function(elm, className, n, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasClassName, [className],
            null, [],
            null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthChildWithAttribute', function(elm, attribute, n, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasAttribute, [attribute],
            null, [],
            null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthChildWithClass', function(elm, n, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasClassAttribute, [],
            null, [],
            null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthChildWithId', function(elm, n, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasIdAttribute, [],
            null, [],
            null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthNext', function(elm, n, name) {
        return getNextSiblings(
            elm,
            null, [],
            null, [],
            name, null, n, false
        );
    });

    /**
     *
     */
    def(me, 'getNthNextByAttribute', function(elm, attribute, value, n, name) {
       return getNextSiblings(
            elm,
            isAttributeEquals, [attribute, value],
            null, [],
            name, null, n, false
        );
    });

    /**
     *
     */
    def(me, 'getNthNextByClass', function(elm, className, n, name) {
       return getNextSiblings(
            elm,
            hasClassName, [className],
            null, [],
            name, null, n, false
        );
    });

    /**
     *
     */
    def(me, 'getNthNextWithAttribute', function(elm, attribute, n, name) {
       return getNextSiblings(
            elm,
            hasAttribute, [attribute],
            null, [],
            name, null, n, false
        );
    });

    /**
     *
     */
    def(me, 'getNthNextWithClass', function(elm, n, name) {
       return getNextSiblings(
            elm,
            hasClassAttribute, [],
            null, [],
            name, null, n, false
        );
    });

    /**
     *
     */
    def(me, 'getNthNextWithId', function(elm, n, name) {
       return getNextSiblings(
            elm,
            hasIdAttribute, [],
            null, [],
            name, null, n, false
        );
    });

    /**
     *
     */
    def(me, 'getNthParent', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getNthParentByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getNthParentByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getNthParentWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getNthParentWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getNthParentWithId', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getNthPrev', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getNthPrevByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getNthPrevByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getNthPrevWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getNthPrevWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getNthPrevWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'getParent', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'getParentOrSelf', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentOrSelfByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentOrSelfByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentOrSelfWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentOrSelfWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentOrSelfWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'getParents', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsByAttributeUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsByClassUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsWithAttributeUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsWithClassUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsWithId', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsWithIdUntil', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'getParentsAndSelf', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfByAttributeUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfByClassUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithAttributeUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithClassUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithId', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithIdUntil', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'getPrev', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'getPrevAll', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllByClassUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithAttributeUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithClassUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithId', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithIdUntil', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'isChild', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isChildByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isChildByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isChildWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isChildWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isChildWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'isNext', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isNextByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isNextByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isNextWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isNextWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isNextWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'isParent', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'isParentOrSelf', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentOrSelfByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentOrSelfByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentOrSelfWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentOrSelfWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentOrSelfWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'isPrev', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isPrevByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isPrevByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isPrevWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isPrevWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isPrevWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'isSibling', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isSiblingByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isSiblingByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isSiblingWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isSiblingWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isSiblingWithId', function() {
        throw 'implement me!';
    });
}(this.o2, this.document));
